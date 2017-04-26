const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log('a user connected')

  socket.on( 'controls', pos => io.emit('new_pos', pos) )

})

http.listen( 3000, _ => console.log('listening on localhost:3000') )