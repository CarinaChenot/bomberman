class Bomb {
  constructor(player, range, pos) {
    this.player    = player
    this.range     = 2
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

    // const coords = {
    //   up: map.map[this.pos.y + Math.abs(i) * -1][this.pos.x],
    //   down: map.map[this.pos.y + Math.abs(i)][this.pos.x],
    //   left: map.map[this.pos.y][this.pos.x + Math.abs(i) * -1],
    //   right: map.map[this.pos.y][this.pos.x + Math.abs(i)]
    // }

    // Get up firing
    for (var i = 1; i <= this.range; i++) {
      let up = map.map[this.pos.y + Math.abs(i) * -1][this.pos.x]
      if (up.solid) {
        break
      }
      fire.push({
        coords: up,
        direction: 'up',
        border: up.destructible || i === this.range ? true : false
      })
      if (up.destructible) {
        break
      }
    }
    // Get down firing
    for (var i = 1; i <= this.range; i++) {
      let down = map.map[this.pos.y + Math.abs(i)][this.pos.x]
      if (down.solid) {
        break
      }
      fire.push({
        coords: down,
        direction: 'down',
        border: down.destructible || i === this.range ? true : false
      })
      if (down.destructible) {
        break
      }
    }
    // Get left firing
    for (var i = 1; i <= this.range; i++) {
      let left = map.map[this.pos.y][this.pos.x + Math.abs(i) * -1]
      if (left.solid) {
        break
      }
      fire.push({
        coords: left,
        direction: 'left',
        border: left.destructible || i === this.range ? true : false
      })
      if (left.destructible) {
        break
      }
    }
    // Get right firing
    for (var i = 1; i <= this.range; i++) {
      let right = map.map[this.pos.y][this.pos.x + Math.abs(i)]
      if (right.solid) {
        break
      }
      fire.push({
        coords: right,
        direction: 'right',
        border: right.destructible || i === this.range ? true : false
      })
      if (right.destructible) {
        break
      }
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
        break
      case 'down':
        elem.coords.content.style.transform = 'rotate(-90deg) scaleX(-1)'
        break
      case 'left':
        elem.coords.content.style.transform = 'rotate(181deg) scaleY(-1)'
        break
      case 'right':
        break
      case 'center':
        elem.coords.content.style.backgroundPositionY = 0 + 'px'
        break
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

// TODO: Solve pb frame 1 center + détruit après les murs
