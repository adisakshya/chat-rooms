// setup the application

var express = require('express');
var app = express();			// function handler used to supply an HTTP server
const port = process.env.PORT || 5000;
var http = require('http').Server(app); // HTTP server
var io = require('socket.io')(http);

const { Users } = require('./utilities/users');
var users = new Users();

app.use(express.static(__dirname + '/public'));

// routes
app.get('/', function(req, res){
	// res.sendFile(__dirname + '/public/chat.html');
	res.sendFile(__dirname + '/public/login.html');
});

io.on('connection', function(socket){
	
	socket.on('create', function(room, username) {
		
		socket.join(room);
		////
		users.removeUser(socket.id);
        users.addUser(socket.id, username, room);
        io.to(room).emit('set room name', room);
        io.to(room).emit('update user list', users.getUserList(room));
        ////
		io.in(room).emit('admin message', 'Admin: Welcome to ' + room + ' ' + username + ' !');
		console.log('New User Connected in ' + room);
	});

	// listen on new message
	socket.on('chat message', function(username, message, room){
		// broadcast new message
		io.in(room).emit('chat message', username, message);
	});

	socket.on('change username', function(old_name, new_name, room) {
		var user = users.removeUser(socket.id);
		user = users.addUser(socket.id, new_name, room);
		io.to(user.room).emit('update user list', users.getUserList(room));
		io.in(user.room).emit('admin message', 'Admin: ' + old_name + ' changed username to ' + new_name + ' !');
	});

	socket.on('disconnect' ,function(){
		var user = users.removeUser(socket.id);
		if(user) {
			io.to(user.room).emit('update user list', users.getUserList(user.room));
            io.to(user.room).emit('admin message', 'Admin: ' + `${user.name} left !`);
		}
	});

});

// listen on local host port 5000
http.listen(5000, function(){
	console.log('listening on: 5000');
});
