var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

var port = 3000

app.use('/public', express.static(__dirname + '/public'))
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('*', function (req, res) {
  // retornar 404
})

io.on('connection', function(socket) {
	console.log('user connected')

	socket.on('disconnect', function() {
		console.log('user disconnect')
	})
})

io.on('connection', function(socket) {
	console.log('user connected')

	socket.on('chat message', function(msg) {
		io.emit('chat message', msg)
	})
})

http.listen(port, function (err) {
  if (err) return console.log(err)
  console.log('Servidor escuchando en:', port)
})
