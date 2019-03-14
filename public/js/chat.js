$(function () {
    var socket = io();

    $('form').submit(function(){
        socket.emit('chat message', $('#username').val() + ': ' + $('#message').val());
        $('#message').val('');
        return false;
    });
        
    socket.on('chat message', function(msg){
          
    $('#messages').append($('<li class="list-group-item">').text(msg));
          
    $(".card-body").scrollTop($(".card-body")[0].scrollHeight);
    //window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('admin message', function(msg){
    
    msg = 'Admin: Welcome ' + $('#username').val() + ' !';
    $('#messages').append($('<li class="list-group-item">').text(msg));
          
    $(".card-body").scrollTop($(".card-body")[0].scrollHeight);
    //window.scrollTo(0, document.body.scrollHeight);
    });
});

function check_username() {
	user_name = $('#username').val();
	if(user_name == "") {
		alert('please enter username...');
		document.getElementById('send_message').disabled = true;
		return false;
	}
	else {
		document.getElementById('send_message').disabled = false;
		return false;
	}
};
