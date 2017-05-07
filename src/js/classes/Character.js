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
		this.direction = "none"
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

	controls(){
		let moving
		window.addEventListener('keydown', (e) => {
			if(e.keyCode==this.keys.bomb){ // bombs
				this.dropBomb();
			}
			else { // directions
				Object.keys(this.keys).forEach( (key) => {
					if(e.keyCode==this.keys[key]){
						if(this.direction != key) {
							this.direction = key
							this.move();
							moving = setInterval( () => {
								this.move();
							}, 200 / this.speed)
						}
					}
				} );
			}
		}, false)
		window.addEventListener('keyup', (e) => {
			this.direction = "none"
			clearInterval(moving)
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

	move() {
		const nextPos = {}
		nextPos.x = this.pos.x
		nextPos.y = this.pos.y
		if(this.direction == "up") 		nextPos.y -= 1
		if(this.direction == "down") 	nextPos.y += 1
		if(this.direction == "left") 	nextPos.x -= 1
		if(this.direction == "right") 	nextPos.x += 1

		if( !map.map[nextPos.y][nextPos.x].solid ){ // if cell is free:
			this.pos = nextPos
			this.div.style.top 	= this.pos.y*map.cell_size + "px"
			this.div.style.left = this.pos.x*map.cell_size + "px"
		}
		this.animate()

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
			this.speed *= 1.1;
			this.div.style.transitionDuration = 0.2 / this.speed +"s"
			setTimeout( () => {
				this.speed /= 1.1
			}, 5000)
			console.log("New speed: "+this.speed)
		}
	}

	animate(){
		this.anim.step >= 2 ? this.anim.step=0 : this.anim.step++
		clearInterval(this.anim.timeout)
		let dirOffset;
		switch (this.direction) {
			case "left"	: dirOffset = 0; break
			case "down"	: dirOffset = 3; break
			case "up"	: dirOffset = 6; break
			default		: dirOffset = 9; break
		}
		this.anim.timeout = setTimeout( () => { // stand without walking
			this.div.style.backgroundPosition = "-"+ (dirOffset + 1) * 20 +"px 0"
		}, 100)
		this.div.style.backgroundPosition = "-"+  (dirOffset + this.anim.step) * 20  +"px 0"
	}

	dropBomb(){
		let bomb = new Bomb(1, this.range, {x: this.pos.x, y: this.pos.y})
	}
}

//                                            pos  |    z          s         q         d       space
var character1 = new Character("Character 1", 1, 1, {up: 90,  down: 83, left: 81, right: 68, bomb: 32})

//                                            pos  |         a r r o w    k e y s              enter
var character2 = new Character("Character 2", 5, 1, {up: 38,  down: 40, left: 37, right: 39, bomb: 13})
