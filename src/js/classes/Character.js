class Character {
  constructor(player, pos, keys) {
    this.player = player
    this.keys = keys
    this.pos = pos

    this.div = null
    this.bombs = []
    this.capacity = 1
    this.anim = {}
    this.range = 1
    this.speed = 1
    this.dying = false
    this.immortal = false
    this.anim.step = 0
    this.direction = 'none'
    this.create()
    this.controls()
  }

  create() {
    this.div = document.createElement('div')
    this.div.setAttribute('class', 'character ' + this.player)
    this.div.style.top = this.pos.y * map.cell_size + 'px'
    this.div.style.left = this.pos.x * map.cell_size + 'px'
    this.div.style.height = map.cell_size + 'px'
    this.div.style.width = map.cell_size + 'px'
    this.div.style.backgroundSize = map.cell_size * 384 / 32 + 'px'
    document.querySelector('.game-container').appendChild(this.div)
  }

  controls() {
    let moving // Interval that triggers move()
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 32) {
        e.preventDefault()
      }
      if (!this.dying && e.keyCode === this.keys.bomb) { // bombs
        this.dropBomb()
      } else { // directions
        Object.keys(this.keys).forEach((key) => {
          if (e.keyCode === this.keys[key]) {
            if (this.direction !== key) {
              this.direction = key
              this.move()
              clearInterval(moving)
              moving = setInterval(() => {
                this.move()
              }, 200 / this.speed)
            }
          }
        })
      }
    }, false)

    window.addEventListener('keyup', () => {
      this.direction = 'none'
      clearInterval(moving)
    }, false)
    // document.querySelector('.top').addEventListener('click', (e) => {
    //   this.move('up')
    // }, false)
    // document.querySelector('.bottom').addEventListener('click', (e) => {
    //   this.move('down')
    // }, false)
    // document.querySelector('.left').addEventListener('click', (e) => {
    //   this.move('left')
    // }, false)
    // document.querySelector('.right').addEventListener('click', (e) => {
    //   this.move('right')
    // }, false)
  }

  move() {
    const nextPos = {}
    nextPos.x = this.pos.x
    nextPos.y = this.pos.y
    if (this.direction === 'up')     nextPos.y -= 1
    if (this.direction === 'down')   nextPos.y += 1
    if (this.direction === 'left')   nextPos.x -= 1
    if (this.direction === 'right')  nextPos.x += 1

    if (!map.map[nextPos.y][nextPos.x].solid && !map.map[nextPos.y][nextPos.x].destructible && !map.map[nextPos.y][nextPos.x].bomb) {
      this.pos = nextPos
      this.div.style.top = this.pos.y * map.cell_size + 'px'
      this.div.style.left = this.pos.x * map.cell_size + 'px'
    }
    this.animate()

    if (map.map[this.pos.y][this.pos.x].bonus) {
      this.getBonus()
    }
  }
  getBonus() {
    let bonus = map.map[this.pos.y][this.pos.x].bonus
    switch (bonus) {
      case 'range':
        this.range++
        break;
      case 'speed':
        this.speed+= 0.1
        break;
      case 'number':
        this.capacity++
        break;
    }
    map.map[this.pos.y][this.pos.x].destroyBonus()
  }

  animate() {
    this.anim.step = this.anim.step >= 2 ? 0 : this.anim.step++
    clearInterval(this.anim.timeout)
    let dirOffset
    switch (this.direction) {
      case 'left':
        dirOffset = 0
        break
      case 'down':
        dirOffset = 3
        break
      case 'up':
        dirOffset = 6
        break
      default:
        dirOffset = 9
        break
    }
    this.anim.timeout = setTimeout(() => { // stand without walking
      this.div.style.backgroundPosition = '-' + (dirOffset + 1) * map.cell_size + 'px 0'
    }, 100)
    this.div.style.backgroundPosition = '-' +  (dirOffset + this.anim.step) * map.cell_size  + 'px 0'
  }

  dropBomb() {
    if (this.bombs.length < this.capacity) {
      let bomb = new Bomb(this.player, this.range, this.pos)
    }
  }

  die() {
    if (!this.dying && !this.immortal) { // prevent multiple calls
      this.dying = true
      // Dying animation:
      let i = 0
      let dieAnim = setInterval(() => {
        this.div.style.backgroundPosition = '-' +  i * map.cell_size  + 'px ' + map.cell_size + 'px'
        i++
      }, 100)
      setTimeout(() => {
        this.div.parentElement.removeChild(this.div)
        characters.splice(characters.indexOf(this), 1) // remove from characters
        clearInterval(dieAnim)
        if(characters.length === 1){
          console.log('DIEIIIIER')
          console.log(characters.length)
          document.querySelector('.game-over-frame').classList.add('active')
          document.querySelector('.game-over-player').innerHTML = characters[0].player+1
        }
      }, 7 * 100)
    }
  }

}

const characters = []
