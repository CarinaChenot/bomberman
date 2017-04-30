class Bomb {
  constructor(player, range, pos) {
    this.player    = player
    this.range     = range
    this.pos       = pos
    this.isAlive   = true
    this.exploding = false
    this.cell      = map.map[this.pos.y][this.pos.x]
    this.el        = document.createElement('div')
    this.delay     = 0
    this.init()
  }
  init() {
    this.render()
    setTimeout(() => { this.explode() }, this.delay)
  }
  render() {
    this.el.classList.add('bomb')
    this.el.style.transform = 'translateX(' + this.pos.x + '0px) translateY(' + this.pos.y + '0px)'
    document.getElementById('app').appendChild(this.el)
  }
  explode() {
    this.exploding = true

    for (var i = 0; i <= this.range; i++) {

      // Retrieve cells
      let up    = map.map[this.pos.y + Math.abs(i) * -1][this.pos.x]
      let down  = map.map[this.pos.y + Math.abs(i)][this.pos.x]
      let left  = map.map[this.pos.y][this.pos.x + Math.abs(i) * -1]
      let right = map.map[this.pos.y][this.pos.x + Math.abs(i)]
      const toCheck = [up, down, left, right]

      toCheck.forEach((elem) => {
        elem.content.classList.add('fire')
      })

      let position = 0
      let spriteRow = 62
      let frame = setInterval(() => { requestAnimationFrame(explodeRendering.bind(this))}, 100)

      function explodeRendering() {
        // Stop condition
        if (position > 224) {
          toCheck.forEach((elem) => { elem.content.classList.remove('fire') })
          this.reset(frame)
          return
        }

        if (i === this.range) {
          toCheck.forEach((elem) => { elem.content.style.backgroundPositionY = '62px' })
        }

        if (i === 0) {
          spriteRow = 0
        }
        left.content.style.backgroundPosition = Math.abs(position) * -1 + 'px ' + spriteRow + 'px'
        right.content.style.backgroundPosition = Math.abs(position) * -1 + 'px ' + spriteRow + 'px'
        up.content.style.backgroundPosition = Math.abs(position) * -1 + 'px ' + spriteRow + 'px'
        up.content.style.transform = 'rotate(90deg)'
        down.content.style.transform = 'rotate(90deg)'
        down.content.style.backgroundPosition = Math.abs(position) * -1 + 'px ' + spriteRow + 'px'
        position += 32 // Increment to next frame
      }
    }
  }
  reset(frame) {
    clearInterval(frame)
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
newBomb()



/*** Notes

return bombList.push(new Bomb(1, 2, pos))

// To create bomb on the Player class
return bombList.push(new Bomb(this.player, this.range, this.pos))

// List of unexploded bombs on the map
let bombList = []

updateList() {
  // Remove exploded bombs from list
  bombList = bombList.filter(function(elem) {
    return elem.isAlive
  })
}

resetLethality(cell) {
  cell.lethal = false
}

// Call reset after 0.5s of exlosion
setTimeout(() => { this.reset() }, 500)

***/
