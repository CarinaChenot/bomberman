class Character {
  constructor(player, pos, keys) {
    this.player = player
    this.keys = keys
    this.pos = pos
    this.range = 1
    this.speed = 1
    this.dying = false

    this.div
    this.anim = {}
    this.anim.step = 0
    this.direction = 'none'
    this.create()
    this.controls()
  }

  create() {
    this.div = document.createElement('div')
    this.div.setAttribute('class', 'character '+this.player)
    this.div.style.top = this.pos.y * map.cell_size + 'px'
    this.div.style.left = this.pos.x * map.cell_size + 'px'
    this.div.style.height = map.cell_size + 'px'
    this.div.style.width = map.cell_size + 'px'
    this.div.style.backgroundSize = map.cell_size*384/32 + 'px'
    document.querySelector('.game-container').appendChild(this.div)
  }

  controls() {
    let moving; // Interval that triggers move()
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === this.keys.bomb) { // bombs
        this.dropBomb()
      }      else { // directions
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
    if (this.direction === 'right')   nextPos.x += 1

    if (
      !map.map[nextPos.y][nextPos.x].solid &&
      !map.map[nextPos.y][nextPos.x].destructible
    ) { // if cell is free:
      this.pos = nextPos
      this.div.style.top   = this.pos.y * map.cell_size + 'px'
      this.div.style.left = this.pos.x * map.cell_size + 'px'
    }
    this.animate()

    let bonus = map.map[this.pos.y][this.pos.x].bonus
    if (bonus === 'range') {
      map.map[this.pos.y][this.pos.x].bonus = undefined
      this.range++
      setTimeout(() => {
        this.range--
      }, 5000)
      console.log('New range: ' + this.range)
    }
    if (bonus === 'speed') {
      map.map[this.pos.y][this.pos.x].bonus
      this.speed += 0.1
      this.div.style.transitionDuration = 0.2 / this.speed + 's'
      setTimeout(() => {
        this.speed -= 0.1
      }, 5000)
      console.log('New speed: ' + this.speed)
    }
  }

  animate() {
    this.anim.step >= 2 ? this.anim.step = 0 : this.anim.step++
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
    let bomb = new Bomb(this.player, this.range, this.pos)
  }

  die(){
    if(!this.dying) { // prevent multiple calls
      this.dying = true
      // Dying animation:
      let i = 0
      let dieAnim = setInterval( () => {
        this.div.style.backgroundPosition = '-' +  i * map.cell_size  + 'px ' + map.cell_size + 'px'
        i++
      }, 100)
      setTimeout( () => {
        this.div.parentElement.removeChild(this.div)
        characters.splice( characters.indexOf(this), 1 ) //remove from characters
        clearInterval(dieAnim)
        for (let key in this) delete this[key]
      }, 7 * 100)
    }
  }

}



let characters = [
  // //                   pos  |    z          s         q         d       space
  new Character(1, {x: 1, y: 1}, {up: 90,  down: 83, left: 81, right: 68, bomb: 32}),
  // //                   pos  |         a r r o w    k e y s              enter
  new Character(2, {x: 5, y: 1}, {up: 38,  down: 40, left: 37, right: 39, bomb: 13})
]
