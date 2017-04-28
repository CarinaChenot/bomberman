class Bomb {
  constructor(player, range, pos) {
    this.player = player
    this.range = range
    this.pos = pos
    this.exploded = false
    this.delay = setTimeout(() => {
      this.explode()
    }, 3000)
    this.domEl = document.createElement('div')
    this.render()
  }
  render() {
    this.domEl.classList.add('bomb')
    this.domEl.style.transform = 'translateX(' + this.pos.x + '0px) translateY(' + this.pos.y + '0px)'
    document.getElementById('app').appendChild(this.domEl)
  }
  explode() {
    this.exploded = true
    this.domEl.remove()
    this.updateList()
  }
  updateList() {
    // Remove exploded bombs from list
    bombList = bombList.filter(function (elem) {
      return !elem.exploded
    })
  }
}

// List of unexploded bombs on the map
let bombList = []

// Test function
function newBomb() {
  let pos = {
    x: Math.floor(Math.random() * 50),
    y: Math.floor(Math.random() * 50)
  }
  return bombList.push(new Bomb(1, 2, pos))

  // To create bomb on the Player class
  // return bombList.push(new Bomb(this.player, this.range, this.pos))
}

newBomb()
newBomb()
newBomb()
newBomb()
newBomb()
