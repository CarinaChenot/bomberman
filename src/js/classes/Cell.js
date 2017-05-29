class Cell {
  constructor(x, y, solid, spawn) {
    this.pos   = { x, y }
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

      let random = Math.ceil(Math.random() * 10)
      if (random === 1) {
        this.bonus = 'speed'
      } else if (random === 2) {
        this.bonus = 'range'
      } else if (random === 3) {
        this.bonus = 'number'
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

    this.el_cell.style.transform = 'translate(' + this.pos.x * map.cell_size + 'px,' + this.pos.y * map.cell_size + 'px)'
    map.el.appendChild(this.el_cell)


  }
  destroy() {
    this.destructible = false
    this.content.classList.remove('destructible')
  }
  showBonus(){
    if (this.bonus !== undefined) {
      this.content.classList.add('bonus')
      this.content.classList.add(this.bonus)
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
