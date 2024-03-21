// Define variables for grid dimensions, gridScale, and canvas size
let columns, rows; // Number of columns and rows in the grid
let gridScale = 40; // Scale of the grid
let canvasWidth = 1400; // Width of the canvas
let canvasHeight = 800; // Height of the canvas

let noiseScale = 0.05; // set the scale of the perlin noise
let noiseSpeed = 0.003;
let vectorMagnitude = 4; // Initial magnitude of the vectors

let flowField; // Array to store flow field vectors

function setup() {
  createCanvas(canvasWidth, canvasHeight); // Create a canvas with specified width and height
  columns = floor(canvasWidth / gridScale); // Calculate number of columns based on canvas width and gridScale
  rows = floor(canvasHeight / gridScale); // Calculate number of rows based on canvas height and gridScale
  flowField = new Array(columns * rows); // Initialize the flow field array

  pixelDensity(4); // Set the pixel density for high-resolution displays
  noiseSeed(10); // Initialize Perlin noise offset
}

function draw() {
  background(255); // Set background color to white

  // Draw Perlin noise visualization
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let posX = x * gridScale;
      let posY = y * gridScale;
      let noiseValue = noise(
        x * noiseScale,
        y * noiseScale,
        frameCount * noiseSpeed,
      );
      let grayColor = map(noiseValue, 0, 1, 0, 255); // Map noise value to grayscale color
      fill(grayColor);
      noStroke();
      rect(posX, posY, gridScale, gridScale);
    }
  }

  // Calculate Perlin noise values for flow field
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let index = x + y * columns; // Calculate index in the flow field array
      let angle =
        noise(x * noiseScale, y * noiseScale, frameCount * noiseSpeed) *
        TWO_PI *
        4; // Calculate angle based on Perlin noise
      let vector = p5.Vector.fromAngle(angle); // Create a 2D vector from the angle
      vector.setMag(vectorMagnitude); // Set the magnitude of the vector
      flowField[index] = vector; // Store the vector in the flow field array

      // Draw vector arrows with varying size based on vector magnitude
      let positionX = x * gridScale + gridScale / 2; // Calculate x position of the arrow
      let positionY = y * gridScale + gridScale / 2; // Calculate y position of the arrow
      let arrowSize = vectorMagnitude; // Calculate arrow size based on vector magnitude
      drawArrow(
        createVector(positionX, positionY),
        flowField[index],
        arrowSize,
      ); // Draw the arrow
    }
  }
}

function drawArrow(base, vector, arrowSize) {
  push(); // Save the current drawing state
  translate(base.x, base.y); // Translate the origin to the base position of the arrow
  stroke(150); // Set stroke color to gray
  strokeWeight(1); // Set stroke weight to 1 pixel
  fill(0); // Set fill color to black
  line(0, 0, vector.x * arrowSize, vector.y * arrowSize); // Draw the line representing the vector
  rotate(vector.heading()); // Rotate the arrow based on the vector's heading
  let arrowHeadSize = arrowSize * 0.2; // Calculate arrow head size based on arrow size
  triangle(0, arrowHeadSize / 2, 0, -arrowHeadSize / 2, arrowHeadSize, 0); // Draw the arrow head
  pop(); // Restore the previous drawing state
}
