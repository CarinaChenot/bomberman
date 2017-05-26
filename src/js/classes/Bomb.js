class Bomb {
  constructor(player, range, pos) {
    this.player    = player
    this.range     = range
    this.pos       = pos
    this.isAlive   = true
    this.cell      = map.map[this.pos.y][this.pos.x]
    this.delay     = 2000
    this.fire      = []
    this.init()
  }
  init() {
    this.cell.bomb = this
    if (characters[this.player] !== undefined) {
      characters[this.player].bombs.push(this)
    }
    this.cell.content.classList.add('bomb')
    this.prepare()
    setTimeout(() => { if (this.isAlive) this.explode() }, this.delay)
  }
  prepare() {
    const directions = ['up', 'down', 'left', 'right']

    this.fire.push({
      cell: this.cell,
      direction: 'center'
    })

    directions.forEach(direction => {
      for (let i = 1; i <= this.range; i++) {
        let cell = getExplosionCell(direction, i, this)
        if (cell.solid) {
          break
        }
        this.fire.push({
          cell,
          direction,
          border: cell.destructible || i === this.range ? true : false
        })
        if (cell.destructible) {
          break
        }
      }
    })
  }
  explode() {
    this.isAlive = false
    this.fire.forEach(elem => {
      if (elem.cell.bomb !== null && elem.cell.bomb.isAlive) {
        elem.cell.bomb.explode()
      }
      // Kill the characters
      characters.forEach(char => {
        if (char.pos.x === elem.cell.x && char.pos.y === elem.cell.y) {
          char.die()
        }
      })
      // Break the blocks
      elem.cell.destroy()
    })

    // Spread fire
    this.fire.forEach(elem => { elem.cell.content.classList = 'content fire' })

    var position = 0
    let fireAnim = setInterval(() => {
      position = this.renderFire(position)
    }, 100)

    // Reset
    setTimeout(() => { this.reset(fireAnim) }, 500)
  }
  renderFire(position) {
    this.fire.forEach(elem => {
      if (elem.border) {
        elem.cell.content.style.backgroundPositionY = '100%'
      } else {
        elem.cell.content.style.backgroundPositionY = '-100%'
      }
      switch (elem.direction) {
        case 'up':
          elem.cell.content.style.transform = 'rotate(-90deg)'
          break
        case 'down':
          elem.cell.content.style.transform = 'rotate(-90deg) scaleX(-1)'
          break
        case 'left':
          elem.cell.content.style.transform = 'rotate(181deg) scaleY(-1)'
          break
        case 'right':
          break
        case 'center':
          elem.cell.content.style.backgroundPositionY = '0%'
          break
      }
      elem.cell.content.style.backgroundPositionX = Math.abs(position) * -1 + '%'
    })
    return position += 100
  }
  reset(fireAnim) {
    clearInterval(fireAnim)
    this.fire.forEach(elem => {
      elem.cell.content.classList.remove('fire')
      elem.cell.content.style.transform = ''
      elem.cell.showBonus()
    })
    this.cell.bomb = null
    if (characters[this.player]) {
      let index = characters[this.player].bombs.indexOf(this)
      if (index > -1) {
        characters[this.player].bombs.splice(index, 1)
      }
    }
  }
}

function getExplosionCell(direction, i, that) {
  switch (direction) {
    case 'up':
      return map.map[that.pos.y + Math.abs(i) * -1][that.pos.x]
    case 'down':
      return map.map[that.pos.y + Math.abs(i)][that.pos.x]
    case 'left':
      return map.map[that.pos.y][that.pos.x + Math.abs(i) * -1]
    case 'right':
      return map.map[that.pos.y][that.pos.x + Math.abs(i)]
  }
}
