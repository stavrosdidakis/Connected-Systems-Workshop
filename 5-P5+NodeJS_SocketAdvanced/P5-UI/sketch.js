//Global variables
let size;
let gui;
let param;
let databaseObject;
let mainRadius = 100;
let mainCol = [ 0, 128, 255 ];
let mainAlpha = 255;
let mainDesc;
let textJSON = {};

let socket;

//Create the parameters using the user interface
let guiParams = function() {
  this.Radius = 100;
  this.Color = [ 0, 128, 255 ]; // RGB array
  this.Alpha = 255;
  this.Initials = '';
  this.Submit = false;

  //On Save, construct the JSON object (using the variables set above),
  //and use socket.io to send the message to the server.
  this.Save = function(){
    textJSON = {
      radius: param.Radius,
      color: param.Color,
      alpha: param.Alpha,
      initials: param.Initials
    };
    console.log(textJSON);
    socket.emit('eventFromClient', textJSON);
  };
  size = this.Radius;
};

function setup() {
  createCanvas(500, 500);
  background(0);

  noStroke();
  textAlign(CENTER);
  textSize(32);

  //Construct the objects that utilize the DAT.GUI interface
  //Link the interface control with the appropriate functions
  param = new guiParams();
  gui = new dat.GUI();
  gui.add(param, 'Radius', 0, 200).onChange(radiusFunction);
  gui.add(param, 'Alpha', 0, 255).onChange(alphaFunction);
  gui.addColor(param, 'Color').onChange(colorFunction);
  gui.add(param, 'Initials').onChange(initialsFunction);
  gui.add(param, 'Save');

  socket = io.connect('http://localhost:5000');
}

function draw(){
  background(200);
  stroke(mainCol[0], mainCol[1], mainCol[2]);
  strokeWeight(8);
  fill(255);

  //Use the interface to control the appearance of the shape that appears on screen
  if (isNaN(mainAlpha)){
    fill(mainCol[0], mainCol[1], mainCol[2], 126);
  } else {
    fill(mainCol[0], mainCol[1], mainCol[2], mainAlpha);
  }
  ellipse(width/2, height/2, mainRadius, mainRadius);
}

//Assign the return values of the interface to our global variables
function radiusFunction(){ mainRadius = param.Radius; }
function colorFunction(){ mainCol = param.Color; }
function alphaFunction(){ mainAlpha = param.Alpha; }
function initialsFunction(){ mainDesc = param.Initials; }
