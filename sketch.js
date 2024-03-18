function setup() {
  createCanvas(1600, 900);
  //frameRate(2)
  noLoop()
  pixelDensity(4);
}

function draw() {
  background(200);
  // set the dimension of the pixels
  let scaleFactor = 4;
  scale(scaleFactor);
  // central line variables
  let centralPosition = width / scaleFactor / 2; // where the lines start
  let widthVariation = 4; // how much the lines width can vary
  let centralVariation = 4; // how much the lines are aligned to the center
  let fuzziness = 4; // how crazy the lines are
  let minWidth = 8; // minimum line width
  let maxWidth = 64; // maximum line width
  let lineWidth = int(random(minWidth, maxWidth + 1)); // first line width
  // lateral ines variables
  let lateralLinesGutter = 4; // how much the lateral lines are far from the central line
  let lateralLinesMaxWidth = 8; // maximum width of the lateral lines
  // draw the lines
  for (let i = 1; i <= height / scaleFactor; i ++) {
    // draw the central line
    let startPosition = centralPosition - int(lineWidth / 2) + plusMinus() * int(random(fuzziness));
    let endPosition = startPosition + lineWidth;
    drawLine(startPosition, endPosition, i);
    // draw the left line
    let endLeftPosition = startPosition - int(random(lateralLinesGutter));
    let startLeftPosition = endLeftPosition - int(random(lateralLinesMaxWidth));
    drawLine(startLeftPosition, endLeftPosition, i);
    //draw the right line
    let startRightPosition = endPosition + int(random(lateralLinesGutter));
    let endRightPosition = startRightPosition + int(random(lateralLinesMaxWidth));
    drawLine(startRightPosition, endRightPosition, i);
    // update the width of the next line
    lineWidth = constrain(lineWidth + plusMinus() * int(random(widthVariation)), minWidth, maxWidth);
    // update the central position of the next line
    centralPosition = centralPosition + plusMinus() * int(random(centralVariation));
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