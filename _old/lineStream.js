function setup() {
  createCanvas(1400, 800);
  noLoop();
  pixelDensity(4);
}

function draw() {
  background(256);
  const pixelScaleFactor = 6;
  scale(pixelScaleFactor); // set the dimension of the pixels

  let fuzzIncreaseFactor = 0; // You can adjust these factors if needed

  let flowColor = [0, 0, 0],
    centralPosition = width / pixelScaleFactor / 2,
    minWidth = 8,
    maxWidth = 64,
    centralVariation = 8,
    widthVariation = 32,
    fuzziness = 2,
    lateralLinesGutter = 8,
    lateralLinesMaxWidth = 16;

  // First set of lines
  drawLineStream(
    flowColor,
    centralPosition,
    centralVariation,
    widthVariation,
    fuzziness,
    minWidth,
    maxWidth,
    lateralLinesGutter,
    lateralLinesMaxWidth,
    fuzzIncreaseFactor,
  );

  // Second set of lines
  centralPosition = width / pixelScaleFactor / 2;
  fuzziness = 3;
  centralVariation = 8;
  drawLineStream(
    flowColor,
    centralPosition,
    centralVariation,
    widthVariation,
    fuzziness,
    minWidth,
    maxWidth,
    lateralLinesGutter,
    lateralLinesMaxWidth,
    fuzzIncreaseFactor,
  );
}

function drawLineStream(
  flowColor,
  centralPosition,
  centralVariation,
  widthVariation,
  fuzziness,
  minWidth,
  maxWidth,
  lateralLinesGutter,
  lateralLinesMaxWidth,
  fuzzIncreaseFactor,
) {
  for (let i = 1; i <= height / 4; i++) {
    fuzziness += fuzzIncreaseFactor;

    // draw the central line
    let lineWidth = int(random(minWidth, maxWidth + 1));
    let startPosition =
      centralPosition -
      int(lineWidth / 2) +
      plusMinus() * int(random(fuzziness));
    let endPosition = startPosition + lineWidth;
    drawLine(startPosition, endPosition, i, flowColor);

    // draw the left line
    let endLeftPosition = startPosition - int(random(lateralLinesGutter));
    let startLeftPosition = endLeftPosition - int(random(lateralLinesMaxWidth));
    drawLine(startLeftPosition, endLeftPosition, i, flowColor);

    // draw the right line
    let startRightPosition = endPosition + int(random(lateralLinesGutter));
    let endRightPosition =
      startRightPosition + int(random(lateralLinesMaxWidth));
    drawLine(startRightPosition, endRightPosition, i, flowColor);

    centralPosition += plusMinus() * int(random(centralVariation)); // move the central position
  }
}

function drawLine(startPosition, endPosition, i, flowColor) {
  stroke(flowColor);
  strokeCap(SQUARE);
  line(startPosition, i, endPosition, i);
}

function plusMinus() {
  let randomValue = random();
  return randomValue < 0.5 ? -1 : 1;
}
