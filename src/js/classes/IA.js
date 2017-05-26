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

  // Return an array of available paths
  getAvailablePaths() {
    let paths = [
      map.map[this.pos.y - 1][this.pos.x], // up
      map.map[this.pos.y + 1][this.pos.x], // down
      map.map[this.pos.y][this.pos.x - 1], // left
      map.map[this.pos.y][this.pos.x + 1] // right
    ]
    paths = paths.filter((el) => {
      return !el.solid && !el.destructible && !el.bomb
      // && !this.danger(el.pos)
    })
    return paths
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
      while (this.danger(this.pos)) {
        this.iGoFarAway()
      }
    }, 300)
  }

  die() {
    clearInterval(this.interval)
    super.die()
  }

  // Chose a path randomly in the array of available paths and go
  iGoFarAway() {
    let paths = this.getAvailablePaths()
    let index = Math.floor((Math.random() * paths.length))
    switch (paths[index]) {
      case map.map[this.pos.y - 1][this.pos.x]:
        this.direction = 'up'
        break
      case map.map[this.pos.y + 1][this.pos.x]:
        this.direction = 'down'
        break
      case map.map[this.pos.y][this.pos.x - 1]:
        this.direction = 'left'
        break
      case map.map[this.pos.y][this.pos.x + 1]:
        this.direction = 'right'
        break
    }
    super.move()
  }

  // Check if this position is dangerous, return true or false
  danger(position) {
    let danger = false
    characters.forEach(char => {
      char.bombs.forEach(bomb => {
        bomb.fire.forEach(elem => {
          if (JSON.stringify(position) == JSON.stringify(elem.cell.pos)) {
            danger = true
          }
        })
      })
    })
    return danger
  }
}

var ia = new IA(2, {x: 1, y: 21}, {up: 38,  down: 40, left: 37, right: 39, bomb: 14})
characters.push(ia)
ia.goToTarget()
// ia.danger()
