class Bomb {
  constructor(player, range, pos) {
    this.player    = player
    this.range     = range
    this.pos       = pos
    this.isAlive   = true
    this.exploding = false
    this.cell      = map.map[this.pos.y][this.pos.x]
    this.delay     = 2000
    this.init()
  }
  init() {
    this.cell.content.classList.add('bomb')
    setTimeout(() => { this.explode() }, this.delay)
  }
  explode() {
    this.exploding = true

    let fire = []
    fire.push({
      coords: this.cell,
      direction: 'center'
    })

    // Retrieve cells where to add fire
    for (var i = 1; i <= this.range; i++) {
      let axis = [
        {
          coords: map.map[this.pos.y + Math.abs(i) * -1][this.pos.x],
          direction: 'up',
          border: i === this.range ? true : false
        },
        {
          coords: map.map[this.pos.y + Math.abs(i)][this.pos.x],
          direction: 'down',
          border: i === this.range ? true : false
        },
        {
          coords: map.map[this.pos.y][this.pos.x + Math.abs(i) * -1],
          direction: 'left',
          border: i === this.range ? true : false
        },
        {
          coords: map.map[this.pos.y][this.pos.x + Math.abs(i)],
          direction: 'right',
          border: i === this.range ? true : false
        }
      ]

      axis.forEach((elem) => {
        if (!elem.coords.solid) { fire.push(elem) }
      })
    }

    fire.forEach(cell => {
      // Kill the characters
      characters.forEach(char => {
        if( char.pos.x === cell.coords.x && char.pos.y === cell.coords.y ||
            char.pos.x === this.pos.x    && char.pos.y === this.pos.y ){
          char.die();
        }
      })
      // Break the blocks
      cell.coords.destroy()
    })

    // Spread fire
    fire.forEach((elem) => { elem.coords.content.classList = 'content fire' })

    var position = 0
    let fireAnim = setInterval(() => {
      position = this.renderFire(fire, position)
    }, 100)

    // Reset
    setTimeout(() => { this.reset(fire, fireAnim) }, 500)
  }
  renderFire(fire, position) {
    fire.forEach((elem) => {
      if (elem.border) {
          elem.coords.content.style.backgroundPositionY = 32 + 'px'
      } else {
        elem.coords.content.style.backgroundPositionY = -32 + 'px'
      }
      switch (elem.direction) {
        case 'up':
          elem.coords.content.style.transform = 'rotate(-90deg)'
          break;
        case 'down':
          elem.coords.content.style.transform = 'rotate(-90deg) scaleX(-1)'
          break;
        case 'left':
          elem.coords.content.style.transform = 'rotate(181deg) scaleY(-1)'
          break;
        case 'right':
          break;
        case 'center':
          elem.coords.content.style.backgroundPositionY = 0 + 'px'
          break;
      }
      elem.coords.content.style.backgroundPositionX = Math.abs(position) * -1 + 'px'
    })
    return position += 32
  }
  reset(fire, fireAnim) {
    clearInterval(fireAnim)
    fire.forEach((elem) => {
      elem.coords.content.classList.remove('fire')
      elem.coords.content.style.transform = ''

    })
    this.isAlive = false
    this.cell.bomb = null
  }
}
