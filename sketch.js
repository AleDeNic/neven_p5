function setup() {
  createCanvas(1200, 900);
  //frameRate(1)
  noLoop()
  pixelDensity(4);
}

function draw() {
  background(200);
  // set the dimension of the pixels
  let scaleFactor = 4;
  scale(scaleFactor);
  // variables
  let centralPos = width / scaleFactor / 2; // where the lines start
  let lineWidthVariation = 4; // how much the lines width can vary
  let centralVariation = 4; // how much the lines are aligned to the center
  let fuzziness = 2; // how crazy the lines are
  let minWidth = 4; // minimum line width
  let maxWidth = 32; // maximum line width
  let lineWidth = int(random(minWidth, maxWidth + 1)); // first line width
  // draw the lines
  for (let i = 1; i <= height / scaleFactor; i ++) {
    // calculate the start and end position of the line
    let startPosition = centralPos - int(lineWidth / 2) + plusMinus() * int(random(fuzziness + 1));
    let endPosition = startPosition + lineWidth;
    console.log(startPosition);
    // draw the line
    drawLine(startPosition, endPosition, i);
    // update the line width and central position for the next line
    lineWidth = lineWidth + plusMinus() * int(random(lineWidthVariation + 1));
    lineWidth = constrain(lineWidth, minWidth, maxWidth);
    centralPos = centralPos + plusMinus() * int(random(centralVariation));
  }
}

function drawLine (startPosition, endPosition, i) {
  stroke(30, 30, 210);
  strokeCap(SQUARE);
  line(startPosition, i, endPosition, i);
}

function plusMinus() {
  let randomValue = random();
  return randomValue < 0.5 ? -1 : 1;
}