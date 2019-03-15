$(function () {
    var socket = io().connect();
    
    var url_string = window.location.href;
	var url = new URL(url_string);
	var room_no = url.searchParams.get("room_no");
    var user_name = url.searchParams.get("user_name");
	// console.log(c);
    
    if(room_no == '') {
    	alert('room number required...');
    	window.history.back();
    	return false;
    }    
    socket.emit('create', room_no);
    // alert(url_string);

    $('#username').val(user_name);
    $('form').submit(function(){
        socket.emit('chat message', $('#username').val() + ': ' + $('#message').val(), room_no);
        $('#message').val('');
        return false;
    });
        
    socket.on('chat message', function(msg){
          
    $('#messages').append($('<li class="list-group-item">').text(msg));
          
    $(".card-body").scrollTop($(".card-body")[0].scrollHeight);
    //window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('admin message', function(msg){
    
    msg = 'Admin: Welcome ' + user_name + ' !';
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
