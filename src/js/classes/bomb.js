class Bomb {
  constructor(player, range, pos) {
    this.player = player
    this.range = range
    this.pos = pos
    this.exploded = false
    this.bombImg
    this.
  }
  create() {
    document.getElementById('app').append(this.test)
  }
  explode() {
    this.exploded = true

    // for (var i = 0; i < range.length; i++) {
    //   //Up
    //   case[this.pos.y - i] = exploded
    //   //Down
    //   case[this.pos.y + i] = exploded
    //   //Left
    //   case[this.pos.x - i] = exploded
    //   //Right
    //   case[this.pos.x + i] = exploded
    //
    // }


  }
  render(){

  }
  remove(){
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

console.log(bomb);
