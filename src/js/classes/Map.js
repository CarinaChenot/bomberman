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

class Cell {
  constructor(x, y, solid, spawn) {
    this.x     = x
    this.y     = y
    this.solid = solid
    this.bomb = null
    if ((this.checkPoint([x, y], map.spawn_point) && !this.solid)) {
      this.spawn = true
    } else if (this.checkPoint([(x), (y + 1)], map.spawn_point) && !this.solid) {
      this.spawn = true
    } else if (this.checkPoint([(x), (y - 1)], map.spawn_point) && !this.solid) {
      this.spawn = true
    } else if (this.checkPoint([(x + 1), (y)], map.spawn_point) && !this.solid) {
      this.spawn = true
    } else if (this.checkPoint([(x - 1), (y)], map.spawn_point) && !this.solid) {
      this.spawn = true
    } else if (!this.solid) {
      this.destructible = true

      let random = Math.ceil(Math.random() * 12)
      if (random === 1) {
        this.bonus = 'speed'
      } else if (random === 2) {
        this.bonus = 'range'
      } else if (random === 3) {
        this.bonus = 'number'
      } else if (random === 4) {
        this.bonus = 'control'
      }
    }
  }
  draw() {
    this.el_cell = document.createElement('div')
    this.el_cell.className = 'cell'
    this.el_cell.style.width = map.cell_size + 'px'
    this.el_cell.style.height = map.cell_size + 'px'

    if (this.solid) {
      this.el_cell.className = 'cell solid'
      this.el_cell.style.backgroundPosition = 100 * Math.floor(Math.random() * 4) + '% 0%'
    }
    else {
      this.content = this.el_cell.appendChild(document.createElement('div'))
      this.content.className = 'content'
      this.el_cell.style.backgroundPosition = 100 * Math.floor(Math.random() * 7) + '% 0%'

      if(this.destructible) {
        this.content.className += ' destructible'
      }
    }

    this.el_cell.style.transform = 'translate(' + this.x * map.cell_size + 'px,' + this.y * map.cell_size + 'px)'
    map.el.appendChild(this.el_cell)


  }
  destroy() {
    this.destructible = false
    this.content.classList.remove('destructible')
  }
  showBonus(){
    if (this.bonus !== undefined) {
      this.content.className += ' bonus ' + this.bonus
    }
  }
  destroyBonus(){
    this.bonus = undefined
    this.content.className = 'content'
  }
  checkPoint(neddle, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][0] === neddle[0] && array[i][1] === neddle[1]) {
        return true
      }
    }
    return false
  }
}

const map = new Map([37, 23], document.querySelector('.game-container'))
map.generate()
