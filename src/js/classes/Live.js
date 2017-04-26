class Live {
    constructor() {
        this.socket = io()
        this.pos = {
            x : 0,
            y : 0
        }
    }

    start() {
        let that = this
        
        document.addEventListener('keypress', e => {
            switch (e.keyCode) {
                case 122:
                    that.pos.y++;
                    break;    
                case 113:
                    that.pos.x--;
                    break;    
                case 115:
                    that.pos.y--;
                    break;
                case 100:
                    that.pos.x++;
                    break; 
            }
            that.socket.emit('controls', that.pos)
        })

        that.socket.on('new_pos', pos => {
            console.log(pos)
        })
    }
}