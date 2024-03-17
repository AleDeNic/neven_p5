function setup() {
  createCanvas(1200, 900);
  //frameRate(1)
  noLoop()
  pixelDensity(4);
}

function draw() {
  background(220);
  let pixelSize = 4; // how thick the lines are
  let centralPos = width / 2; // where the lines start
  let lineWidthVariation = 32; // how much the lines width can vary
  let centralVariation = 32; // how much the lines are aligned to the center
  let fuzziness = 0; // how crazy the lines are
  let minWidth = 16; // minimum line width
  let maxWidth = 128; // maximum line width
  let lineWidth = int(random(minWidth, maxWidth + 1)); // first line width

  for (let i = 2; i <= height; i += pixelSize) {
    // calculate the start and end position of the line
    let startPosition = centralPos - (lineWidth * pixelSize / 2) + getRandomPlusOrMinusOne() * random(0, fuzziness + 1) * pixelSize;
    let endPosition = startPosition + lineWidth * pixelSize;
    // draw the line
    drawLine(startPosition, endPosition, i, pixelSize);
    // update the line width and central position for the next line
    lineWidth = lineWidth + getRandomPlusOrMinusOne() * int(random(lineWidthVariation + 1));
    lineWidth = constrain(lineWidth, minWidth, maxWidth);
    centralPos = centralPos + getRandomPlusOrMinusOne() * int(random(centralVariation)) * pixelSize;
  }
}

function drawLine (startPosition, endPosition, i, pixelSize) {
  stroke(30, 30, 210);
  strokeWeight(pixelSize);
  strokeCap(SQUARE);
  line(startPosition, i, endPosition, i);
}

function getRandomPlusOrMinusOne() {
  let randomValue = random();
  return randomValue < 0.5 ? -1 : 1;
}