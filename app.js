// setup the application

var express = require('express');
var app = express();			// function handler used to supply an HTTP server
var http = require('http').Server(app); // HTTP server
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// routes
app.get('/', function(req, res){
	// res.sendFile(__dirname + '/public/chat.html');
	res.sendFile(__dirname + '/public/login.html');
});

io.on('connection', function(socket){
	
	socket.on('create', function(room) {
		
		socket.join(room);
		io.in(room).emit('admin message', '');
		console.log('New User Connected in ' + room);
	});

	// listen on new message
	socket.on('chat message', function(message, room){
		// broadcast new message
		io.in(room).emit('chat message', message);
	});	
});

// listen on local host port 5000
http.listen(5000, function(){
	console.log('listening on: 5000');
});
