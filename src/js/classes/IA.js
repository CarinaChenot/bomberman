class IA extends Character {
  constructor(player, pos, keys) {
    super(player, pos, keys)
    this.target = undefined
  }

  create() {
    this.div = document.createElement('div')
    this.div.setAttribute('class', 'character ia')
    this.div.style.top = this.pos.y * map.cell_size + 'px'
    this.div.style.left = this.pos.x * map.cell_size + 'px'
    this.div.style.height = map.cell_size + 'px'
    this.div.style.width = map.cell_size + 'px'
    this.div.style.backgroundSize = map.cell_size * 384 / 32 + 'px'
    document.querySelector('.game-container').appendChild(this.div)
  }

  getTarget(tabCharacter) {
    if (tabCharacter.length) {
      return Math.floor(Math.random() * ((tabCharacter.length - 1)))
    } else {
      return false
    }
  }

  goToTarget() {
    this.target = this.getTarget(characters)
    this.interval = setInterval(() => {
      if (characters[this.target] && !characters[this.target].dying) {
        if (characters[this.target].pos.x - this.pos.x < 2) {
          this.direction = 'left'
          if (!map.map[this.pos.y][this.pos.x - 1].solid && map.map[this.pos.y][this.pos.x - 1].destructible) {
            super.dropBomb()
          }
          super.move()
        } else {
          this.direction = 'right'
          if (!map.map[this.pos.y][this.pos.x + 1].solid && map.map[this.pos.y][this.pos.x + 1].destructible) {
            super.dropBomb()
          }
          super.move()
        }
        if (characters[this.target].pos.y - this.pos.y < 2) {
          this.direction = 'up'
          if (!map.map[this.pos.y - 1][this.pos.x].solid && map.map[this.pos.y - 1][this.pos.x].destructible) {
            super.dropBomb()
          }
          super.move()
        } else {
          this.direction = 'down'
          if (!map.map[this.pos.y + 1][this.pos.x].solid && map.map[this.pos.y + 1][this.pos.x].destructible) {
            super.dropBomb()
          }
          super.move()
        }
      } else {
        this.goToTarget()
      }
    }, 300)
  }


  die() {
    clearInterval(this.interval)
    super.die()
  }
}

var ia = new IA(3, {x: 1, y: 21}, {up: 38,  down: 40, left: 37, right: 39, bomb: 14})
characters.push(ia)
ia.goToTarget()
