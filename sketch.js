let candyCorn, gummyBear, mint, sourGummy, ferrero;
let badCandy;
let candyCornImg, gummyBearImg, mintImg, sourGummyImg, ferreroImg;

let video;
let faceapi;
let faceResults;
let mouthOpen = false;

function preload() {
  candyCornImg = loadImage("assets/candycorn.png", loaded);
  gummyBearImg = loadImage("assets/gummybear.png", loaded);
  mintImg = loadImage("assets/mint.png", loaded);
  ferreroImg = loadImage("assets/chocolate.png", loaded);
  sourGummyImg = loadImage("assets/squaregummy.png", loaded);
}

function loaded() {
  console.log("loaded");
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width,height)

  video.hide();

  faceapi = ml5.faceApi(video, modelReady);
  faceapi.detect(gotResults);

  initialize();
}

function modelReady(){
    console.log('model ready')
}

function gotResults(err, result){
    if (err){
        console.log(err)
    }
    if (result){
        faceResults = result
        console.log(result)
        faceapi.detect(gotResults)
    }
}

function initialize() {
  addBadCandy();
  sourGummy = new goodCandies(random(width), 0, random(3), 0);
  ferrero = new goodCandies(random(width), 0, random(3), 0);
  gummyBear = new goodCandies(random(width), 0, random(3), 0);
  mint = new goodCandies(random(width), 0, random(3), 0);
}

function draw() {
  image(video, 0, 0);

  stroke('black')
  fill('white')
  textSize(15)
  text('p.s. candy corn is gross', 10,15)

  if (badCandy.y > height) {
    addBadCandy();
  }
  badCandy.display();
  badCandy.fall();
  image(candyCornImg, badCandy.x, badCandy.y);

  if (
    sourGummy.y > height ||
    ferrero.y > height ||
    gummyBear.y > height ||
    mint.y > height
  ) {
    addCandy();
  }
  sourGummy.display();
  sourGummy.fall();
  image(sourGummyImg, sourGummy.x, sourGummy.y);

  ferrero.display();
  ferrero.fall();
  image(ferreroImg, ferrero.x, ferrero.y);

  gummyBear.display();
  gummyBear.fall();
  image(gummyBearImg, gummyBear.x, gummyBear.y);

  mint.display();
  mint.fall();
  image(mintImg, mint.x, mint.y);
  
  
  if (faceResults&&faceResults.length>0){
        let parts=faceResults[0].parts

        let mouth=parts["mouth"]
        let mouthTop=mouth[3]
        let mouthBottom=mouth[9]
        let mouthLeft=mouth[0]
        let mouthRight=mouth[6]
        if (mouthBottom._y-mouthTop._y>50){
            mouthOpen=true
            
        }
        else {
            mouthOpen=false
        }
        console.log("status: ",mouthOpen)
        // noStroke()
        // fill('red')
        // circle(mouthTop._x,mouthTop._y,10)
        // fill('blue')
        // circle(mouthBottom._x,mouthBottom._y,10)
        // fill('pink')
        // circle(mouthLeft._x,mouthLeft._y,10)
        // fill('purple')
        // circle(mouthRight._x,mouthRight._y,10)
        if (mouthOpen==true){
          if (mouthTop._y<sourGummy.y&&mouthBottom._y>sourGummy.y&&mouthLeft._x<sourGummy.x&&mouthRight._x>sourGummy.x){
            addSourGummy()
          }
          if (mouthTop._y<ferrero.y&&mouthBottom._y>ferrero.y&&mouthLeft._x<ferrero.x&&mouthRight._x>ferrero.x){
            addFerrero()
          }
          if (mouthTop._y<gummyBear.y&&mouthBottom._y>gummyBear.y&&mouthLeft._x<gummyBear.x&&mouthRight._x>gummyBear.x){
            addGummyBear()
          }
          if (mouthTop._y<mint.y&&mouthBottom._y>mint.y&&mouthLeft._x<mint.x&&mouthRight._x>mint.x){
            addMint()
          }
          if (mouthTop._y<badCandy.y&&mouthBottom._y>badCandy.y&&mouthLeft._x<badCandy.x&&mouthRight._x>badCandy.x){
            endScreen()
          }
        }
    }
}

function addCandy() {
  if (sourGummy.y > height) {
    addSourGummy()
  } else if (ferrero.y > height) {
    addFerrero()
  } else if (gummyBear.y > height) {
    addGummyBear()
  } else if (mint.y > height) {
    addMint()
  }
}

function addSourGummy(){
  sourGummy = new goodCandies(random(width), 0, random(3), 0);
}
function addFerrero(){
  ferrero = new goodCandies(random(width), 0, random(3), 0);
}
function addGummyBear(){
  gummyBear = new goodCandies(random(width), 0, random(3), 0);
}
function addMint(){
  mint = new goodCandies(random(width), 0, random(3), 0);
}

function addBadCandy() {
  badCandy = new badCandies(random(width), 0, random(3, 5));
}

function endScreen(){
  textAlign(CENTER)
  background('orange')
  noStroke()
  fill('black')
  textSize(40)
  text('EWWWW CANDY CORN 🤮🤮🤮🤮🤮🤮🤮', width/5,height/3,width*2/3,height/2)
  noLoop()
}
