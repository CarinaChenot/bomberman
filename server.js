const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const room_max_length = 3
let rooms = {
  '0': ['fzefz', 'fzfzefez', 'zeffz']
}

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('a user connected')

  if (rooms[Object.keys(rooms).length - 1].length - 1 >= room_max_length) {
    rooms[Object.keys(rooms).length] = []
  }
  rooms[Object.keys(rooms).length - 1 ].push('new_user')


  socket.on('controls', pos => io.emit('new_pos', pos))
})

http.listen(3000, () => console.log('listening on localhost:3000'))