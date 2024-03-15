function setup() {
  createCanvas(500, 550);
  frameRate(2.5)
  //noLoop()
pixelDensity(3);
}

function draw() {
  background(220);
  
  for (let i = 0; i <= height; i+=4) {
    
    let uno = random(100, 200);
    let dos = random(300, 400);
    let tres = random(400, 500);
    
    let a = random(0,uno); 
    let b = random(a,uno);
    let c = random(b, dos);
    let d = random(c, dos);
    let e = random(d, tres);
    let f = random(e, tres);
    stroke(50,95,209);
    strokeWeight(4);
    strokeCap(SQUARE);
    line(a, i, b, i);
    
    stroke(50,95,209);
    strokeWeight(4);
    strokeCap(SQUARE);
    line(c, i, d, i);
    
    stroke(50,95,209);
    strokeWeight(4);
    strokeCap(SQUARE);
    line(e, i, f, i);
  }
}