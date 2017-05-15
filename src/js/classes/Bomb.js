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
    // this.renderFire()
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

    var position = 0
    let fireAnim = setInterval(() => {
      position = this.renderFire(fire, position)
    }, 100)

    // Reset
    setTimeout(() => { this.reset(fire, fireAnim) }, 500)
  }
  renderFire(fire, position) {
    fire.forEach((elem) => {
      elem.content.style.backgroundPositionX = Math.abs(position) * -1 + 'px'
    })
    return position += 32
  }
  reset(fire, fireAnim) {
    clearInterval(fireAnim)
    fire.forEach((elem) => { elem.content.classList.remove('fire') })
    this.isAlive = false
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
