class goodCandies {
  constructor(x, y, speed, col) {
    this.x = x;
    this.y=y
    this.s = speed;
    this.c = col;
  }
  display() {
    // noStroke()
    // fill(this.c)
    // square(this.x,this.y,40)
    createVector(this.x,this.y)
    
  }
  fall() {
    this.y+=this.s
  }
}
