$(document).ready(function(e) {
    var base_url = window.location.origin;
    var socket = io.connect(base_url);
	var status ;
	var answer = '';
	var question = 0;
	var timer;
	$('#left span').text(sessionStorage.user);
	socket.emit('add user',{user:sessionStorage.user,level:sessionStorage.level});
	socket.on('user left',function(data){
		var user = data.user;
		$('.user p[title='+user+']').removeClass('online').addClass('offline');
	});
	socket.on('level',function(data){
		sessionStorage.level = data.level;
	});
	socket.on('reload',function(){
		location.reload();
	});
	socket.on('status',function(data){
		status = data.status;
		if(status == 'wait'){
			if(sessionStorage.level == 'giamkhao'){
				$('.startgame').show();
			}else if(sessionStorage.level == 'nguoixem'){
				$('.join').show();
			}else if(sessionStorage.level == 'nguoichoi'){
				$('.join').hide();
			}
		}else if(status == 'load game'){
			$('.join').hide();
			$('.startgame').hide();
			$('.start').hide();
			loadsound('sound/startgame.mp3');
			$('.thongbao').show();
		}else if(status == 'chon user'){
			
		}
	});
	socket.on('list user',function(data){
		var users = data.users;
		for(var i=0;i<users.length;i++){
			var user = users[i].user;
			var level = users[i].level;
			$('.user p[title='+user+'] span').text(level);
			$('.user p[title='+user+']').removeClass('offline').addClass('online');
		}
	});
	
	socket.on('no player',function(){
		alert('Chưa có player nào join game');
	});
	socket.on('add user',function(data){
		var user = data.user;
		var level = data.level;
		$('.user p[title='+user+'] span').text(level);
		$('.user p[title='+user+']').removeClass('offline').addClass('online');
	});
	socket.on('timer',function(data){
		$('#time p').text(data.timer);
	});
	socket.on('begin',function(){
		socket.emit('chon user');
	});
	socket.on('nguoichoi',function(){
		$('.dapan').removeAttr('disabled');
		$('.select').removeClass('select');
	});
	socket.on('help nguoichoi',function(){
		$('.help').removeAttr('disabled');
	});
	socket.on('help',function(data){
		$('.help').hide();
		for(var x in data.help){
			if(data.help[x] == "trogiup50"){
				$('#trogiup50').show();
			}else if(data.help[x] == "khangia"){
				$('#khangia').show();
			}else if(data.help[x] == "goidt"){
				$('#goidt').show();
			}
		}
	});
	socket.on('question',function(data){
		$('#cauhoi').text("Câu "+data.sttquestion+" . "+data.question);
		$('#dapan_a').text("A. "+data.A);
		$('#dapan_b').text("B. "+data.B);
		$('#dapan_c').text("C. "+data.C);
		$('#dapan_d').text("D. "+data.D);
		$('#ds div').removeClass('sorce');
		$('#ds #' + data.sttquestion).addClass('sorce');
		loadsound('sound/wait.mp3');
	});
	socket.on('user select',function(data){
		var aselect = data.answer;
		if(aselect == 'A'){
			$('#dapan_a').addClass('select-user');
		}else if(aselect == 'B'){
			$('#dapan_b').addClass('select-user');
		}else if(aselect == 'C'){
			$('#dapan_c').addClass('select-user');
		}else if(aselect == 'D'){
			$('#dapan_d').addClass('select-user');
		}
	});
	socket.on('reset answer',function(){
		$('.select').removeClass('select');
		$('.select-user').removeClass('select-user');
	});
	socket.on('correct',function(data){
		var correct = data.correct_answer;
		if(correct == 'A'){
			$('#dapan_a').addClass('select');
		}else if(correct == 'B'){
			$('#dapan_b').addClass('select');
		}else if(correct == 'C'){
			$('#dapan_c').addClass('select');
		}else if(correct == 'D'){
			$('#dapan_d').addClass('select');
		}
	});
	socket.on('success',function(data){
		var correct = data.correct_answer;
		loadsound('sound/right.mp3');
		if(correct == 'A'){
			timer = setInterval(function(){
				if($('#dapan_a').hasClass('select-user')){
					
					$('#dapan_a').removeClass('select-user').addClass('select');
				}else{
					$('#dapan_a').removeClass('select').addClass('select-user');
				}
			},100);
			
		}else if(correct == 'B'){
			timer = setInterval(function(){
				if($('#dapan_b').hasClass('select-user')){
					$('#dapan_b').removeClass('select-user').addClass('select');
				}else{
					$('#dapan_b').removeClass('select').addClass('select-user');
				}
			},100);
		}else if(correct == 'C'){
			timer = setInterval(function(){
				if($('#dapan_c').hasClass('select-user')){
					$('#dapan_c').removeClass('select-user').addClass('select');
				}else{
					$('#dapan_c').removeClass('select').addClass('select-user');
				}
			},100);
		}else if(correct == 'D'){
			timer = setInterval(function(){
				if($('#dapan_d').hasClass('select-user')){
					$('#dapan_d').removeClass('select-user').addClass('select');
				}else{
					$('#dapan_d').removeClass('select').addClass('select-user');
				}
			},100);
		}
	});
	socket.on('clear timer',function(){
		clearInterval(timer);
	});
	socket.on('fail',function(data){
		answer = '';
		var correct = data.correct_answer;
		if(correct == 'A'){
			$('#dapan_a').addClass('success');
		}else if(correct == 'B'){
			$('#dapan_b').addClass('success');
		}else if(correct == 'C'){
			$('#dapan_c').addClass('success');
		}else if(correct == 'D'){
			$('#dapan_d').addClass('success');
		}
		loadsound('sound/wrong.mp3');
	});
	socket.on('player sorce',function(data){
		var players = data.players;
		for(var i=0;i<players.length;i++){
			var timer = players[i].timer;
			var user = players[i].user;
			var answer = players[i].answer;
			$('.player').append('<p title="'+ user +'">'+ user +' - '+ answer +' - '+ timer +'</p>');
		}
	});
	socket.on('player select',function(data){
		var player = data.player;
		loadsound('sound/startgame.mp3');
		if(sessionStorage.level == 'giamkhao'){
			socket.emit('start');
		}else if(sessionStorage.level == 'nguoichoi'){
			if(player.user == sessionStorage.user){
				
			}else{
				sessionStorage.level ='nguoixem';
				socket.emit('leave nguoichoi',{user:sessionStorage.user,level:sessionStorage.level});
			}
		}
		alert('Chúc mừng '+ player.user +' đã trở thành người chơi chính!');
		$('.player p[title='+player.user+']').addClass('playerselect');
		$('.player').append('Chúc mừng player '+ player.user + ' đã trở thành người chơi chính');
	});
	socket.on('next question',function(){
		socket.emit('next question');
	});
	socket.on('correct answer',function(data){
		if(answer == data.correct_answer){
			socket.emit('next question');
		}else{
			socket.emit('fail');
		}
	});
	socket.on('trogiup50',function(data){
		loadsound('sound/wait3s.mp3');
		setTimeout(function(){
			for(var i=0;i<data.array_random.length;i++){
				if(data.array_random[i] == 'A'){
					$('#dapan_a').text('');
				}else if(data.array_random[i] == 'B'){
					$('#dapan_b').text('');
				}else if(data.array_random[i] == 'C'){
					$('#dapan_c').text('');
				}else if(data.array_random[i] == 'D'){
					$('#dapan_d').text('');
				}
			}
		},3000);
	});
	socket.on('end',function(data){
		alert("Người chơi đã dừng lại với "+data.sorce+" VND");
		loadsound('sound/end.mp3');
		setTimeout(function(){
			location.reload();
		},2000);
	});
	socket.on('winner',function(data){
		alert("Người chơi đã chiến thắng với "+data.sorce+" VND");
		loadsound('sound/end.mp3');
		setTimeout(function(){
			location.reload();
		},2000);
	});
	socket.on('end game',function(){
		status = 'wait';
		alert("Trò chơi kết thúc");
		loadsound('sound/end.mp3');
		setTimeout(function(){
			location.reload();
		},2000);
		
	});
	$('.thontin').text(sessionStorage.user);
	$('#dapan_a').click(function(e){
		if(status != 'chon user'){
			answer = 'A';
			$(this).addClass('select');
			socket.emit('answer',{answer:answer,user:sessionStorage.user});
		}else{
			answer += 'A';
			$(this).attr('disabled','true');
			if(answer.length == 4){
				socket.emit('answer',{answer:answer,user:sessionStorage.user});
			}
		}
	});
	$('#dapan_b').click(function(e){
		if(status !='chon user'){
			answer = 'B';
			$(this).addClass('select');
			socket.emit('answer',{answer:answer,user:sessionStorage.user});
		}else{
			answer +='B';
			$(this).attr('disabled','true');
			if(answer.length == 4){
				socket.emit('answer',{answer:answer,user:sessionStorage.user});
			}
		}
	});
	$('#dapan_c').click(function(e){
		if(status != 'chon user'){
			answer = 'C';
			$(this).addClass('select');
			socket.emit('answer',{answer:answer,user:sessionStorage.user});
		}else{
			answer +='C';
			$(this).attr('disabled','true');
			if(answer.length == 4){
				socket.emit('answer',{answer:answer,user:sessionStorage.user});
			}
		}
	});
	$('#dapan_d').click(function(e){
		if(status != 'chon user'){
			answer = 'D';
			$(this).addClass('select');
			socket.emit('answer',{answer:answer,user:sessionStorage.user});
		}else{
			answer +='D';
			$(this).attr('disabled','true');
			if(answer.length == 4){
				socket.emit('answer',{answer:answer,user:sessionStorage.user});
			}
		}
	});
	$(document).on('click','#trogiup50',function(e){
		socket.emit('trogiup50');
	});
	$(document).on('click','#khangia',function(e){
		socket.emit('khangia');
	});
	$(document).on('click','#goidt',function(e){
		socket.emit('goidt');
	});
	$(document).on('click','.startgame',function(e){
		alert("start game");
		socket.emit('start game');
	});
	$(document).on('click','.join',function(e){
		socket.emit('join game',{user:sessionStorage.user});
	});
	$('#left a').click(function(e){
		if(status == 'in game' && sessionStorage.level == 'nguoichoi'){
			socket.emit('stop game');
		}else{
			window.location.href = '/';
		}
		return false;
	});
});
function loadsound(linking){
	var sound = $('.sound').get(0);
	sound.src = linking;
	sound.play();
}