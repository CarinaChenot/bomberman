class Map {
  constructor(size, el) {
    this.size = size
    this.el   = el
    this.cell_size = 32
    if (this.size[0] * this.cell_size > window.innerWidth) {
      this.cell_size = Math.round((window.innerWidth) / this.size[0])
    }
    this.el.style.width = this.size[0] * this.cell_size + 'px'
    this.el.style.height = this.size[1] * this.cell_size + 'px'
    this.spawn_point = [
            [1, 1],
            [this.size[0] - 2, 1],
            [1, this.size[1] - 2],
            [this.size[0] - 2, this.size[1] - 2]
    ]
  }
  generate() {
    this.map = new Array(this.size[1])
    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = new Array(this.size[0])
      for (let j = 0; j < this.map[i].length; j++) {
        if ((i === 0 || i === this.size[1] - 1 || j === 0 || j === this.size[0] - 1) || (j % 2 === 0 && i % 2 === 0)) {
          this.map[i][j] = new Cell(j, i, true, false)
          this.map[i][j].draw()
        }        else {
          this.map[i][j] = new Cell(j, i, false, false)
          this.map[i][j].draw()
        }
      }
    }
  }
}

const map = new Map([37, 23], document.querySelector('.game-container'))
map.generate()
