
console.log("cHARACTER");

class  Character {
	constructor(name, posX, posY, cross){
		this.name = name
		this.cross = cross
		this.pos = {
			x : posX,
			y : posY
		}
		this.div
		this.anim = {}
		this.anim.step = 0;
		//init:
		this.create()
		this.detect()
	}

	create(){
		this.div = document.createElement("div")
		this.div.setAttribute("class", "character")
			this.div.style.top 	= this.pos.y + "px"
		this.div.style.left = this.pos.x + "px"
		document.querySelector("body").appendChild(this.div)
	}

	move(dir){
		if(dir =="up"){
			this.pos.y -= 16;
		}
		if(dir =="down"){
			this.pos.y += 16;
		}
		if(dir =="left"){
			this.pos.x -= 16;
		}
		if(dir =="right"){
			this.pos.x += 16;
		}
		this.div.style.top 	= this.pos.y + "px"
		this.div.style.left 	= this.pos.x + "px"
		this.animate(dir)
	}
	detect(){
		window.addEventListener('keypress', (e) => {
			if(e.keyCode==this.cross[0]){
				this.move("up")
			}
			if(e.keyCode==this.cross[1]){
				this.move("down")
			}
			if(e.keyCode==this.cross[2]){
				this.move("left")
			}
			if(e.keyCode==this.cross[3]){
				this.move("right")
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
		}, 300)
		this.div.style.backgroundPosition = "-"+  (dirOffset + this.anim.step) * 20  +"px 0"
	}
}

var character1 = new Character("Pierre", 320, 64, [122, 115, 113, 100], true)
