$(document).ready(function(e) {
	var base_url = window.location.origin;
    var socket = io.connect(base_url);
	socket.on('success login',function(data){
		sessionStorage.user = data.user;
		sessionStorage.level = data.level;
		socket.disconnect();
		window.location.href = '/user';
	});
	socket.on('fail login',function(){
		alert("Tài khoản hoặc mật khẩu không đúng");
	});
	socket.on('user using',function(){
		alert("Tài khoản đang được sử dụng");
	});
	socket.on('fail register',function(){
		alert("Tài khoản bị trùng, Hãy đặt Username khác");
	});
	socket.on('success register',function(){
		alert("Tạo tài khoản thành công, Hãy đăng nhập vào trò chơi");
	});
	$('.button').click(function(e){
		var user = $('#user').val();
		var pass = $('#pass').val();
		socket.emit('login',{user:user,pass:pass});
	});
	$('.register').click(function(e){
		var user = $('#user').val();
		var pass = $('#pass').val();
		if(user =='' || pass==''){
			alert("Nhập user và pass");
		}else{
			socket.emit('register',{user:user,pass:pass});
		}
		
	});
});