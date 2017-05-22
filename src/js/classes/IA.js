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
      return Math.floor(Math.random() * ((tabCharacter.length - 1) + 1))
    } else {
      return false
    }
  }

  goToTarget() {
    this.target = this.getTarget(characters)
    setInterval(() => {
      if (characters[this.target] && !characters[this.target].dying) {
        this.pos.x = characters[this.target].pos.x - this.pos.x < 0 ? this.pos.x -- : this.pos.x ++
        this.pos.y = characters[this.target].pos.y - this.pos.y < 0 ? this.pos.y -- : this.pos.y ++
        super.move()
      }
    }, 300)
  }
}

var ia = new IA(3, {x: 1, y: 21}, {up: 38,  down: 40, left: 37, right: 39, bomb: 14})
ia.goToTarget()
