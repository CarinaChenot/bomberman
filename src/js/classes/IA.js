class IA extends Character {
  constructor(name, pos, keys) {
    super(name, pos, keys)
  }

  create() {
    this.div = document.createElement('div')
    this.div.setAttribute('class', 'character ia')
    this.div.style.top = this.pos.y * map.cell_size + 'px'
    this.div.style.left = this.pos.x * map.cell_size + 'px'
    this.div.style.height = map.cell_size + 'px'
    this.div.style.width = map.cell_size + 'px'
    this.div.style.backgroundSize = map.cell_size*384/32 + 'px'
    document.querySelector('.game-container').appendChild(this.div)
  }

  goToTarget() {
    setInterval(() => {
      if (characters[0]) {
        characters[0].pos.x - this.pos.x < 0 ? this.pos.x -- : this.pos.x ++
        characters[0].pos.y - this.pos.y < 0 ? this.pos.y -- : this.pos.y ++
        super.move()
      }
    }, 300)
  }
}

var ia = new IA(3, {x: 5, y: 5}, {up: 38,  down: 40, left: 37, right: 39, bomb: 14})
ia.goToTarget()
