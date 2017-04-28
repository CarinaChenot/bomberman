class Bomb {
  constructor(player, range, pos) {
    this.player = player
    this.range = range
    this.pos = pos
    this.delay = 3000
    this.exploded = false
  }
  create() {
    let bombDiv = document.createElement("div")
    let bomb = document.createTextNode("BOMB")
    bombDiv.appendChild(bomb)
    document.getElementById('app').appendChild(bombDiv)
  }
  explode() {
    this.exploded = true

  }
  remove() {
    document.getElementById('app').removeChild(this.bombImg)
  }
}

// player
// new Bomb = (this.player, this.range, this.pos )

var pos = {
  x: 3,
  y: 5
}

var bomb = new Bomb(1, 2, pos);
bomb.create()

console.log(bomb);
