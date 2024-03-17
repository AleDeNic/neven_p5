function setup() {
  createCanvas(1200, 640);
  //frameRate(1)
  noLoop()
  pixelDensity(4);
}

function draw() {
  background(220);
  let pixelSize = 4; // how thick the lines are
  let lineWidthVariation = 16; // how much the lines width can vary
  let centralVariation = 4; // how much the lines are aligned to the center
  let lineMinWidth = 8; // minimum line width
  let lineMaxWidth = 64; // maximum line width
  let centralPos = width / 2; // where the lines start
  let lineWidth = int(random(lineMinWidth, lineMaxWidth + 1)) * pixelSize;

  for (let i = 2; i <= height; i += pixelSize) {
    let lineStart = centralPos - (lineWidth / 2) + centralOffset(centralVariation, pixelSize);
    let lineEnd = lineStart + lineWidth;
    drawLine(lineStart, lineEnd, i, pixelSize);
    lineWidth = lineWidth + (getRandomPlusOrMinusOne() * int(random(0, lineWidthVariation)) * pixelSize);
    centralPos = centralPos + getRandomPlusOrMinusOne() * centralVariation;
  }
}

function drawLine (lineStart, lineEnd, i, pixelSize) {
  stroke(50,95,209);
  strokeWeight(pixelSize);
  strokeCap(SQUARE);
  line(lineStart, i, lineEnd, i);
}

function getRandomPlusOrMinusOne() {
  let randomValue = random();
  return randomValue < 0.5 ? -1 : 1;
}

function centralOffset(centralVariation, pixelSize) {
  let offset = int(random(1, centralVariation));
  return offset * getRandomPlusOrMinusOne() * pixelSize;
}