let express = require('express');
let socket = require('socket.io');

//Express becomes accessible through app
let app = express();
//Create a server on localhost:5000
let server = app.listen(5000);
//Host content as static on public
app.use(express.static('public'));

console.log("Node is running on port 5000...");

//Allow server to use the socket
let io = socket(server);
//Dealing with server events / connection
//...when a new connection is on, run the newConnection function
io.sockets.on('connection', newConnection); //callback

//Function that serves the new connection
function newConnection(socket){
	console.log('New connection: ' + socket.id);

	//When a message arrives from the client, run the eventMessage function
	socket.on('eventFromClient', eventMessage);

	function eventMessage(data){
		socket.broadcast.emit('eventFromServer', data);
		//Following line refers to sending data to all clients
		//io.sockets.emit('mouse', data);
		console.log(data);
	}
}
