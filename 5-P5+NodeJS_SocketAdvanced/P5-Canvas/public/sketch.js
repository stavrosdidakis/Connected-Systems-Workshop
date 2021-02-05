let circleObject = [];
let socket;

function setup() {
  createCanvas(1200, 800);
  background(255);
  smooth(8);
  strokeWeight(1);
  socket = io.connect('http://localhost:5000');
  socket.on('eventFromServer', newDrawing);
}

function newDrawing(data){
  //console.log("Received: " + data);
  //let getData = JSON.parse(data)
  console.log("Received: " + data.alpha);
  circleObject.push(new Circle(width/2, height/2, random(10.) - 5., random(10.) - 5., data.radius, data.color[0],data.color[1],data.color[2], data.alpha, random(1000,5000)));
}

function draw() {
  background(255);
  for (let i=0; i<circleObject.length; i++) {
    circleObject[i].drawCircle();
    circleObject[i].motion();
    circleObject[i].destroy();
    //console.log(circleObject.length);
    if (circleObject[i].destroy() <= 0) {
      circleObject.splice(i,1);
    }
  }
}

class Circle{
  constructor(_x, _y, _speedX, _speedY, _radius, _r, _g, _b, _alpha, _timer){
    this.x = _x;
    this.y = _y;
    this.xMove = _speedX;
    this.yMove = _speedY;
    this.radius= _radius;
    this.rd = _r;
    this.grn = _g;
    this.bl = _b;
    this.inAlpha = _alpha
    this.alphaDecrease = 255;
    this.timer = _timer;
    this.initTime = _timer;
  }

  drawCircle(){
    strokeWeight(8);
    stroke(this.rd, this.grn, this.bl, 255 - this.alphaDecrease);
    //fillcol = color(this.rd, this.grn, this.bl, this.a)

    //let alphaMap = constrain (this.alphaDecrease, 0, 255);
    //console.log(alphaMap);
    fill(this.rd, this.grn, this.bl, this.inAlpha - this.alphaDecrease);
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }

  motion(){
    this.x += this.xMove;
    this.y += this.yMove;
    if (this.x > (width+this.radius)) this.x = 0 - this.radius;
    if (this.x < (0-this.radius)) this.x = width+this.radius;
    if (this.y > (height+this.radius)) this.y = 0 - this.radius;
    if (this.y < (0-this.radius)) this.y = height+this.radius;
  }

  destroy(){
    let getTimer = 0;
    this.timer--;
    getTimer = this.timer;
    this.alphaDecrease = map(this.timer, 0, this.initTime, 255, 0);
    return getTimer;
  }
}
