var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	var greetMsg = 'A user has connected'; 
	io.emit('chat message', greetMsg);
	console.log('a user connected');
	socket.on('chat message', function(msg){
		if(msg.length == 0){
			console.log("msg too short");
		}else{
			io.emit('chat message', msg);
		}
	});
	socket.on('disconnect', function(){
		console.log("a user has left");
	});
});

http.listen(3000, function(){
	console.log("listening on *:3000");
});