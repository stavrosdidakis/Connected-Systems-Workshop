let x, y, xMove, yMove, radius;
let rd, grn, bl, a;
let circleObject;

function setup() {
  createCanvas(800, 600);
  background(255);
  smooth(8);
  noStroke();

  circleObject = new Circle (width/2, height/2, random(-5,5), random(-5,5), random(10,100), random(255), random(255), random(255));
}

function draw() {
  background(255);

  circleObject.drawCircle();
  circleObject.motion();
}

class Circle {
  constructor (_x, _y, _speedX, _speedY, _radius, _r, _g, _b){
    this.x = _x;
    this.y = _y;
    this.xMove = _speedX;
    this.yMove = _speedY;
    this.radius= _radius;

    this.rd = _r;
    this.grn = _g;
    this.bl = _b;
    this.a = 255;
  }

  drawCircle(){
    let fillcol = color(this.rd, this.grn, this.bl, this.a)
    fill(fillcol);
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
}
