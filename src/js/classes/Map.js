class Map {
    constructor(size, el){
        this.size = size
        this.el   = el
        this.cell_size = 32
        if(this.size[0] * this.cell_size > window.innerWidth*0.8){
            this.cell_size = (window.innerWidth*0.8)/this.size[0]
        }
        this.el.style.width = this.size[0] * this.cell_size + 'px'
        this.el.style.height = this.size[1] * this.cell_size + 'px'
        this.spawn_point = [
            [1              , 1],
            [this.size[0]-2 , 1],
            [1              , this.size[1]-2],
            [this.size[0]-2 , this.size[1]-2]
        ]
    }
    generate(){
        this.map = new Array(this.size[1])
        for (let i = 0; i < this.map.length; i++) {
            this.map[i] = new Array(this.size[0])
            for (let j = 0; j < this.map[i].length; j++) {
                if((i == 0 || i == this.size[1]-1 || j == 0 || j == this.size[0]-1) || (j%2 == 0 && i%2 == 0)){
                    this.map[i][j] = new Cell(j, i, true, false)
                    this.map[i][j].draw();
                }
                else{
                    this.map[i][j] = new Cell(j, i, false, false)
                    this.map[i][j].draw();
                }
            }
        }
    }
    draw(){
        this.map.forEach(function(element) {
            element.forEach(function(cell) {

            }, this)
        }, this)
    }
}

class Cell {
    constructor(x,y,solid, spawn){
        this.x     = x
        this.y     = y
        this.solid = solid
        this.bomb = null
        if((checkPoint([x,y], map.spawn_point) && !this.solid)){
            this.spawn = true
        }
        else if(checkPoint([(x),(y+1)], map.spawn_point) && !this.solid){
            this.spawn = true
        }
        else if(checkPoint([(x),(y-1)], map.spawn_point) && !this.solid){
            this.spawn = true
        }
        else if(checkPoint([(x+1),(y)], map.spawn_point) && !this.solid){
            this.spawn = true
        }
        else if(checkPoint([(x-1),(y)], map.spawn_point) && !this.solid){
            this.spawn = true
        }
        else if(!this.solid){
            this.destructible = true
            this.el_destructible = document.createElement('div')
            this.el_destructible.className= 'cell destructible'
            this.el_destructible.style.transform = 'translate('+ this.x*map.cell_size +'px,'+ this.y*map.cell_size +'px)'

            let random = Math.ceil(Math.random()*12)
            if(random == 1){
                this.bonus = 'speed'
            }
            else if(random == 2){
                this.bonus = 'range'
            }
            else if(random == 3){
                this.bonus = 'number'
            }
            else if(random == 4){
                this.bonus = 'control'
            }
        }
    }
    draw(){
        this.el_cell = document.createElement('div')
        this.el_cell.className = 'cell'
        this.el_cell.style.width = map.cell_size + 'px'
        this.el_cell.style.height = map.cell_size + 'px'

        this.content = this.el_cell.appendChild(document.createElement('div'))
        this.content.className = 'content'

        if(this.solid){
            this.el_cell.className = 'cell solid'
            this.el_cell.style.backgroundPosition = 100*Math.floor(Math.random()*4) + '% 0%'
        }
        else{
            this.el_cell.style.backgroundPosition = 100*Math.floor(Math.random()*7) + '% 0%'
        }

        if(this.spawn){
            this.el_cell.className = 'cell spawn'
        }

        this.el_cell.style.transform = 'translate('+ this.x*map.cell_size +'px,'+ this.y*map.cell_size +'px)'
        map.el.appendChild(this.el_cell)

        if(this.bonus != undefined){
            this.el_bonus = document.createElement('div')
            this.el_bonus.className = 'cell bonus ' + this.bonus
            this.el_bonus.style.width = map.cell_size + 'px'
            this.el_bonus.style.height = map.cell_size + 'px'
            this.el_bonus.style.transform = 'translate('+ this.x*map.cell_size +'px,'+ this.y*map.cell_size +'px)'
            map.el.appendChild(this.el_bonus)
        }

        if(this.destructible){
            this.el_destructible.style.backgroundPosition = 100*Math.floor(Math.random()*7) + '% 0%'
            this.el_destructible.style.width = map.cell_size + 'px'
            this.el_destructible.style.height = map.cell_size + 'px'
            map.el.appendChild(this.el_destructible)
        }
    }
    destroy(){
        this.el_destructible.remove();
    }
}

const map = new Map([37,23], document.querySelector('.game-container'))
map.generate()
map.draw()

function checkPoint(neddle,array){
    for (var i = 0; i < array.length; i++) {
        if(array[i][0] == neddle[0] && array[i][1] == neddle[1]){
            return true
        }
    }
    return false
}

/*
____ TO DO: ___
- methode removeBonus que le character puisse appeler quand il est passé sur un bonus, elle enlève le bonus de la map et du DOM


*/
