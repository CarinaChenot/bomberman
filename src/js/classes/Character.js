class  Character {
	constructor(name, posX, posY, keys){
		this.name = name
		this.keys = keys
		this.pos = {
			x : posX,
			y : posY
		}
		this.range = 1;
		this.speed = 1;

		this.div
		this.anim = {}
		this.anim.step = 0;
		//init:
		this.create()
		this.controls()
	}

	create(){
		this.div = document.createElement("div")
		this.div.setAttribute("class", "character")
		this.div.style.top 	= this.pos.y*map.cell_size + "px"
		this.div.style.left = this.pos.x*map.cell_size + "px"
		document.querySelector(".game-container").appendChild(this.div)
	}

	move(dir){
		const nextPos = {}
		nextPos.x = this.pos.x
		nextPos.y = this.pos.y
		if(dir =="up"){
			nextPos.y -= 1;
		}
		if(dir =="down"){
			nextPos.y += 1;
		}
		if(dir =="left"){
			nextPos.x -= 1;
		}
		if(dir =="right"){
			nextPos.x += 1;
		}
		if( !map.map[nextPos.y][nextPos.x].solid ){ // if cell is free:
			this.pos = nextPos
			this.div.style.top 	= this.pos.y*map.cell_size + "px"
			this.div.style.left = this.pos.x*map.cell_size + "px"
		}
		this.animate(dir)

		let bonus = map.map[this.pos.y][this.pos.x].bonus
		if(  bonus == "range" ){
			map.map[this.pos.y][this.pos.x].bonus = undefined;
			this.range++
			setTimeout( () => {
				this.range--
			}, 5000)
			console.log("New range: "+this.range)
		}
		if( bonus == "speed" ){
			map.map[this.pos.y][this.pos.x].bonus
			this.speed *= 1.2;
			setTimeout( () => {
				this.speed /= 1.2
			}, 5000)
			console.log("New speed: "+this.speed)
		}
	}

	controls(){
		window.addEventListener('keypress', (e) => {
			if(e.keyCode==this.keys[0]){
				this.move("up")
			}
			if(e.keyCode==this.keys[1]){
				this.move("down")
			}
			if(e.keyCode==this.keys[2]){
				this.move("left")
			}
			if(e.keyCode==this.keys[3]){
				this.move("right")
			}
			if(e.keyCode==this.keys[4]){
				this.dropBomb();
			}
		}, false)
		// document.querySelector(".top").addEventListener('click', (e) => {
		// 	this.move("up")
		// }, false)
		// document.querySelector(".bottom").addEventListener('click', (e) => {
		// 	this.move("down")
		// }, false)
		// document.querySelector(".left").addEventListener('click', (e) => {
		// 	this.move("left")
		// }, false)
		// document.querySelector(".right").addEventListener('click', (e) => {
		// 	this.move("right")
		// }, false)
	}

	animate(dir){
		this.anim.step >= 2 ? this.anim.step=0 : this.anim.step++
		clearInterval(this.anim.timeout)
		let dirOffset;
		switch (dir) {
			case "left": dirOffset = 0; break
			case "down": dirOffset = 3; break
			case "up": dirOffset = 6; break
			default: dirOffset = 9; break
		}
		this.anim.timeout = setTimeout( () => { // stand without walking
			this.anim.step = 1;
			this.div.style.backgroundPosition = "-"+ (dirOffset + this.anim.step) * 20 +"px 0"
		}, 100)
		this.div.style.backgroundPosition = "-"+  (dirOffset + this.anim.step) * 20  +"px 0"
	}

	dropBomb(){
		let bomb = new Bomb(1, this.range, {x: this.pos.x, y: this.pos.y})
	}
}

//                                            pos  |  z    s    q    d    b
//                                            x  y | up  down left right bomb
var character1 = new Character("Character 1", 1, 1, [122, 115, 113, 100, 98], true)
