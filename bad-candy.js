class badCandies {
  constructor(x,y,speed){
    this.x=x
    this.y=y
    this.s=speed
  }
  display(){
    // fill(0)
    // square(this.x,this.y,100)
    createVector(this.x,this.y)

  }
  fall(){
    this.y+=this.s
    
  }
}