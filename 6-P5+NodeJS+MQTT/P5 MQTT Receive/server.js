const express = require('express');
const socket = require('socket.io');
const mqtt = require('mqtt')

//Setup the server ---------------------------------------------
const app = express();
const http = require('http');
const hostname = '127.0.0.1'; //localhost
const port = 5000;
const server = http.createServer(app);

app.use( express.static('public') );
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/", (request, response) => {
  response.sendFile(directory_name + "index.html");
});
//--------------------------------------------------------------

//Allow server to use the socket
const io = socket(server);
//Dealing with server events / connection
//...when a new connection is on, run the newConnection function
io.sockets.on('connection', newConnection); //callback

//Function that serves the new connection
function newConnection(socket){
	console.log('New connection: ' + socket.id);
}

let options = {
  port: 1883,
	clientId: 'client-Canvas',
	username: "nyu-ima",
  password: "123456"
};
const client = mqtt.connect('mqtt://broker.mqttdashboard.com:8000', options);

//MQTT Message
client.on('connect', function() { // When connected
  //Subscribe to a topic
  client.subscribe('/nyu-ima-topic1/', function() {
    //When a message arrives, get topic, message, packet
    client.on('message', function(topic, message, packet) {
      //console.log("Message: " + getMessage);
      //Get the message (as buffer), convert it to a String, and then to a JSON
      let getMessage = JSON.parse(message.toString());
      //Use the sockets to send the message to the client
      io.sockets.emit('newMessage', getMessage);
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });
});
