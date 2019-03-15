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
		console.log('New User Connected in ' + room);
	});

	io.emit('admin message', '');
	
	// listen on new message
	socket.on('chat message', function(message){
		// broadcast new message
		io.emit('chat message', message);
	});	
});

// listen on local host port 5000
http.listen(5000, function(){
	console.log('listening on: 5000');
});

/*
function alert_user() {
	window.alert('room number is required...');
}*/
