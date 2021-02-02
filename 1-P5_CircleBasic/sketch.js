let x, y, xMove, yMove, radius;
let rd, grn, bl, a;

function setup() {
  createCanvas(800, 600);
  background(255);
  smooth(8);
  strokeWeight(1);

  //Setup variable - position, and speed
  x = width/2;
  y = height/2;
  xMove = random (-5, 5);
  yMove = random (-5, 5);
  radius = random (10, 100);

  //Setup color variables
  rd = random (255);
  grn = random (255);
  bl = random (255);
  a = random (255);
}

function draw() {
  background(255);

  //Moving process
  x += xMove;
  y += yMove;
  if (x > (width+radius)) x = 0-radius;
  if (x < (0-radius)) x = width+radius;
  if (y > (height+radius)) y = 0-radius;
  if (y < (0-radius)) y = height+radius;

  //Draw content
  noStroke();
  fillcol = color(rd, grn, bl, a)
  fill(fillcol);
  ellipse(x, y, radius*2, radius*2);
}
