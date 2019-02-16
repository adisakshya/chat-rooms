$(function(){

	// make connection
	var socket = io.connect('http://localhost:3000');

	// inputs
	var message = $("#message");
	var template = $("#message-template").html();
	var send_message = $("#send_message");
	var chatroom = $("#chatroom");
	//var feedback = $("#feedback")

	// emit message
	send_message.click(function(){
		socket.emit('chat message', {message : message.val()});
	});

	// listen on chat message
	socket.on('chat message', function(data){
		//feedback.html('');
		message.val('');
		chatroom.append(html);
	});
};