let canvasWidth = 1400; // Width of the canvas
let canvasHeight = 800; // Height of the canvas
let backgroundColor = 255; // Background color of the canvas

let backgroundImage; // Variable to store the background image

let columns, rows; // Number of columns and rows in the grid
let gridScale = 40; // Scale of the grid

let noiseScale = 0.05; // Scale of the Perlin noise
let noiseSpeed = 0.003; // Speed at which the noise changes over time

let vectorMagnitude = 0.5; // Initial magnitude of the vectors

let particleMaxSpeed = 1; // Maximum speed of particles
let particleMinSize = 20; // Minimum size of particles
let particleMaxSize = 40; // Maximum size of particles
let repulsionFactor = 3; // Repulsion strength between particles
let influenceRadius = 4; // How the particles are influenced by far away vectors (for smoothing)

let flowField; // Array to store flow field vectors
let particles = []; // Array to store particles
let totalParticles = 400; // Total number of particles

function preload() {
  // Load the JPG image before setup
  backgroundImage = loadImage(
    "neven.jpg",
    function (img) {
      console.log("Image loaded successfully:", img);
    },
    function (err) {
      console.error("Error loading image:", err);
    },
  );
}

function setup() {
  createCanvas(canvasWidth, canvasHeight); // Create a canvas with specified width and height
  image(backgroundImage, 0, 0);
  //pixelDensity(1); // Set the pixel density for standard displays

  // Calculate number of columns and rows based on canvas width, height, and grid scale
  columns = floor(canvasWidth / gridScale);
  rows = floor(canvasHeight / gridScale);

  // Initialize flow field array
  flowField = new Array(columns * rows);

  // Initialize particles
  for (let i = 0; i < totalParticles; i++) {
    let particleSize = int(random(particleMinSize, particleMaxSize)); // Generate random size for each particle
    particles.push(new Particle(particleSize));
  }
}

function draw() {
  background(backgroundColor); // Set background color

  // Calculate Perlin noise values for flow field
  let yOff = 0;
  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (let x = 0; x < columns; x++) {
      let index = x + y * columns; // Calculate index in the flow field array
      let angle = noise(xOff, yOff, frameCount * noiseSpeed) * TWO_PI * 4; // Calculate angle based on Perlin noise
      let vector = p5.Vector.fromAngle(angle); // Create a 2D vector from the angle
      vector.setMag(vectorMagnitude); // Set the magnitude of the vector
      flowField[index] = vector; // Store the vector in the flow field array

      // Draw vectors
      stroke(0, 50); // Set vector color with transparency
      strokeWeight(1); // Set vector line thickness
      drawVector(
        vector,
        x * gridScale + gridScale / 2,
        y * gridScale + gridScale / 2,
        gridScale / 2,
      ); // Draw the vector
      xOff += noiseScale;
    }
    yOff += noiseScale;
  }

  // Update and display particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].applyRepulsion(particles);
    particles[i].update();
    particles[i].display();
    particles[i].edges();
  }
}

// Function to draw a vector at a given position
function drawVector(v, x, y, scale) {
  push();
  translate(x, y);
  rotate(v.heading());
  let len = v.mag() * scale;
  line(0, 0, len, 0);
  pop();
}

// Particle class definition
class Particle {
  constructor(size) {
    this.pos = createVector(random(width), random(height)); // Initialize particle position randomly within canvas
    this.vel = createVector(0, 0); // Initialize particle velocity
    this.acc = createVector(0, 0); // Initialize particle acceleration
    this.maxSpeed = particleMaxSpeed; // Maximum speed of the particle
    this.size = size; // Size of the particle
  }

  // Function to steer particle based on flow field with smoothing
  follow(flow) {
    let x = floor(this.pos.x / gridScale); // Calculate column index for flow field
    let y = floor(this.pos.y / gridScale); // Calculate row index for flow field

    // Initialize variables for summing vectors in the neighborhood
    let sumVector = createVector(0, 0);
    let count = 0;

    // Loop through the neighborhood
    for (
      let yOffset = -influenceRadius;
      yOffset <= influenceRadius;
      yOffset++
    ) {
      for (
        let xOffset = -influenceRadius;
        xOffset <= influenceRadius;
        xOffset++
      ) {
        let i = x + xOffset;
        let j = y + yOffset;

        // Check if the neighbor is within bounds
        if (i >= 0 && i < columns && j >= 0 && j < rows) {
          let index = i + j * columns;
          let force = flow[index]; // Get the flow field vector at the current position
          sumVector.add(force); // Add the vector to the sum
          count++;
        }
      }
    }

    // If there are vectors in the neighborhood, steer towards the average direction
    if (count > 0) {
      sumVector.div(count); // Average the sum vector
      this.applyForce(sumVector); // Apply the averaged vector as force to the particle
    }
  }

  // Function to apply force to particle
  applyForce(force) {
    this.acc.add(force); // Add force to particle's acceleration
  }

  // Function to apply repulsion force between particles
  applyRepulsion(particles) {
    let repulsion = createVector(0, 0); // Initialize repulsion force
    for (let other of particles) {
      if (other !== this) {
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y); // Calculate distance between particles
        if (d < this.size * 2) {
          // Check if particles are too close
          let diff = p5.Vector.sub(this.pos, other.pos); // Calculate vector pointing away from other particle
          diff.normalize(); // Normalize vector
          diff.div(d); // Divide vector by distance
          repulsion.add(diff); // Add repulsion force to total force
        }
      }
    }
    repulsion.mult(repulsionFactor); // Scale repulsion force by repulsion factor
    this.applyForce(repulsion); // Apply repulsion force to particle
  }

  // Function to update particle position and velocity
  update() {
    this.vel.add(this.acc); // Update velocity based on acceleration
    this.vel.limit(this.maxSpeed); // Limit velocity to maximum speed

    // Apply velocity damping
    this.vel.mult(0.85); // Adjust damping factor as needed

    this.pos.add(this.vel); // Update position based on velocity
    this.acc.mult(0); // Reset acceleration to zero
  }

  // Function to display particle
  display() {
    fill(255); // Set fill color to white
    stroke(0); // Set stroke color to black
    square(this.pos.x, this.pos.y, this.size); // Draw particle as square
  }

  // Function to wrap particle around canvas edges
  edges() {
    // Adjust particle position if it goes beyond canvas boundaries
    if (this.pos.x > width + this.size) {
      this.pos.x = -this.size;
    } else if (this.pos.x < -this.size) {
      this.pos.x = width + this.size;
    }
    if (this.pos.y > height + this.size) {
      this.pos.y = -this.size;
    } else if (this.pos.y < -this.size) {
      this.pos.y = height + this.size;
    }
  }
}
