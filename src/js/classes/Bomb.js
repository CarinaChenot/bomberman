class Bomb {
  constructor(player, range, pos) {
    this.player    = player
    this.range     = range
    this.pos       = pos
    this.isAlive   = true
    this.exploding = false
    this.cell      = map.map[this.pos.y][this.pos.x]
    this.el        = document.createElement('div')
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
    fire.push(map.map[this.pos.y][this.pos.x])

    // Retrieve cells where to add fire
    for (var i = 1; i <= this.range; i++) {
      let axis = [
        map.map[this.pos.y + Math.abs(i) * -1][this.pos.x],
        map.map[this.pos.y + Math.abs(i)][this.pos.x],
        map.map[this.pos.y][this.pos.x + Math.abs(i) * -1],
        map.map[this.pos.y][this.pos.x + Math.abs(i)]
      ]
      axis.forEach((elem) => {
        if (!elem.solid) { fire.push(elem) }
      })
    }

    // Spread fire
    fire.forEach((elem) => { elem.content.classList = 'content fire' })

    // Reset
    setTimeout(() => { this.reset(fire) }, 500)
  }
  reset(fire) {
    fire.forEach((elem) => { elem.content.classList.remove('fire') })
    this.isAlive = false
    this.el.remove()
    this.cell.bomb = null
  }
}

// Test function
function newBomb() {
  let pos = {
    x: Math.floor(Math.random() * 37),
    y: Math.floor(Math.random() * 23)
  }
  map.map[pos.y][pos.x].bomb = new Bomb(1, 1, pos)
}
// newBomb()
