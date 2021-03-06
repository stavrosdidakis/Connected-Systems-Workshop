const express = require('express');
const socket = require('socket.io');
const mqtt = require('mqtt')

//Express becomes accessible through app
const app = express();
//Create a server on localhost:5000
const server = app.listen(process.env.PORT || 5000);
//Host content as static on public
app.use(express.static('public'));

console.log("Node is running on port 5000...");

//Allow server to use the socket
const io = socket(server);
//Dealing with server events / connection
//...when a new connection is on, run the newConnection function
io.sockets.on('connection', newConnection); //callback

io.set('transports', ['websocket',
        'flashsocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling',
        'polling']);

//Function that serves the new connection
function newConnection(socket){
  console.log('New connection: ' + socket.id);
}

//Setup MQTT settings
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
