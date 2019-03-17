var socket = io().connect();

var url_string = window.location.href;
var url = new URL(url_string);
var room_no = url.searchParams.get("room_no");
var user_name = url.searchParams.get("user_name");
// var about = url.searchParams.get("description");

// var clients = socket.sockets.clients(room_no);

$(function () {
    
    if(room_no == '') {
    	alert('room number required...');
    	window.history.back();
    	return false;
    }    

    socket.emit('create', room_no, user_name);
    // alert('added user ' + user_name + ' ' + about);

    $('#username').val(user_name);
    $('form').submit(function(){
        socket.emit('chat message', $('#username').val(), $('#message').val(), room_no);
        $('#message').val('');
        return false;
    });

    socket.on('set room name', function(roomname){
        var template = jQuery('#room-template').html();
        var html = Mustache.render(template, {
            room_name: roomname
        });

        jQuery('#room-name').html(html);    
    });

    socket.on('chat message', function(username, msg){
          
    // $('#messages').append($('<li class="list-group-item" style="margin-bottom:6px;">').text(msg));
    // $(".card-body").scrollTop($(".card-body")[0].scrollHeight);
    
    //window.scrollTo(0, document.body.scrollHeight);
    var template = jQuery('#message-template').html();
    
    var date = new Date();
    var date_of_creation = date.toLocaleDateString();// date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
    var created_at = date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    });//date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();

    var html = Mustache.render(template, {
        from: username,
        text: msg,
        time: created_at,
        date: date_of_creation
    });

    jQuery('#messages').append(html);
    $(".card-body").scrollTop($(".card-body")[0].scrollHeight);
    });

    socket.on('admin message', function(msg){
    
    // msg = 'Admin: Welcome ' + $('#username').val() + ' !';
    $('#messages').append($('<li class="list-group-item" style="margin-bottom:6px;">').text(msg));
          
    $(".card-body").scrollTop($(".card-body")[0].scrollHeight);
    //window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('update user list', function(users) {
        // var template = jQuery('#online-user-template').html();
        // alert(users);
        var ol = jQuery('<ol class="ul card-4"></ol>');
        users.forEach(function(user) {
            // alert(user, about);
            var li = jQuery('<li class="w3-bar"></li>');
            var avt = jQuery('<img src="img/avatar_2x.png" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">');
            var div = jQuery('<div class="w3-bar-item"></div>');
            var span_name = jQuery('<span class="w3-large"></span></br>').html(user);
            // var span_description = jQuery('<span class="w3-large"></span>').html(description);

            div.append(span_name);
            // div.append(span_description);
            li.append(avt);
            li.append(div);            
            ol.append(li);
           
        });

        jQuery('#users').html(ol);        
        
        /*
        var ol = jQuery('<ol class="list-group"></ol>');
        users.forEach(function (user) {
            ol.append(jQuery('<li class="list-group-item" style="margin-bottom:6px;"></li>').html(user));
        });

        jQuery('#users').html(ol);
        //alert(users);*/
    });
});

function set_username() {
	user_name_new = $('#username').val();
	if(user_name_new == "") {
		alert('username cannot be empty string...');
		document.getElementById('send_message').disabled = true;
		return false;
	}
	else {    
        socket.emit('change username', user_name, user_name_new, room_no);
        document.getElementById('send_message').disabled = false;
		return false;
	}
};

function send_att() {

};

function send_vid_rec() {

};

function send_aud_rec() {

};

function see_active_users() {
    // document.getElementByClass('chat__sidebar').show();
};
