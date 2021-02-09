const express = require('express');
const socket = require('socket.io');
const mqtt = require('mqtt')
let payload;

//Setup the server ---------------------------------------------
const app = express();
const http = require('http');
const hostname = '127.0.0.1'; //localhost
const port = 5001;
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

//Setup MQTT settings
let options = {
  port: 1883,
	clientId: 'client-UI',
  username: "nyu-ima",
  password: "123456"
};
const client = mqtt.connect('mqtt://broker.mqttdashboard.com:8000', options);

//Function that serves the new connection
function newConnection(socket){
	console.log('New connection: ' + socket.id);

  //When a message arrives from the client, run the sendFunction
	socket.on('saveEvent', sendFunction);

  //This function will prepare the payload, and send the MQTT message
	function sendFunction(data){
    console.log("Message from socket: " + data);

    payload = data;
    client.publish('/nyu-ima-topic1/', String(payload), function() {
      console.log("Pushed to MQTT: " + payload);
      //client.end(); // Close the connection when published
    });
	}
}

//Function that runs when a message is received from MQTT (here, not used)
client.on('connect', function() { // When connected
  //Subscribe to a topic
  client.subscribe('/nyu-ima-topic1/', function() {
    //When a message arrives, do something with it
    //client.on('message', function(topic, message, packet) {
      //console.log("Received '" + message + "' on '" + topic + "'");
    //});
  });
});
