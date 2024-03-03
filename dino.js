// Board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

// DINOSAUR
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImage;

let dino = {
  x: dinoX,
  y: dinoY,
  width: dinoWidth,
  height: dinoHeight
}

// cacti info
let cacti = [];
let cactusWidth1 = 34;
let cactusWidth2 = 69;
let cactusWidth3 = 102;

let cactusHeight = 70;
let cactusX = 750;
let cactusY = boardHeight - cactusHeight;

let cactusImage1;
let cactusImage2;
let cactusImage3;


// BIG CACTUS
let bigCactusWidth = 100;
let bigCactusHeight = 60;
let bigCactusX = 700;
let bigCactusY = boardHeight - cactusHeight;
let bigCactusImage;

let bigCactus = {
  x: bigCactusX,
  y: bigCactusY,
  width: bigCactusWidth,
  height: bigCactusHeight
}

let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;


window.onload = function() {
  board = document.getElementById("board")
  board.height = boardHeight;
  board.width = boardWidth;

  // our context knows where the canvas is in 2d space and allows us to interact with it
  context = board.getContext("2d");

  // Drawing a rectangle on our context
  // context.fillStyle = "green";
  // context.fillRect(dino.x, dino.y, dino.width, dino.height);

  dinoImage = new Image();
  dinoImage.src = "../dino_img/dino.png";


  cactusImage1 = new Image();
  cactusImage1.src = "../dino_img/cactus1.png";
  cactusImage2 = new Image();
  cactusImage2.src = "../dino_img/cactus2.png";
  cactusImage3 = new Image();
  cactusImage3.src = "../dino_img/cactus3.png";


  bigCactusImage = new Image();
  bigCactusImage.src = "../dino_img/big-cactus1.png";



  dinoImage.onload = function() {
    context.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);
  }

  requestAnimationFrame(update)
  setInterval(placeCactus, 1000)
  document.addEventListener("keydown", moveDino)
}

function update() {
  // recursive call
  // requestAnimationFrame(update);
  if (gameOver) {
    return;
  }

  // clear the board each time we re render it
  context.clearRect(0, 0, board.width, board.height);

  // dino
  velocityY += gravity;
  dino.y = Math.min(dino.y + velocityY, dinoY) // apply gravity to current dino.y, making sure it doesn't exeed the ground
  context.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);

  // cactus loop
  for (let i = 0; i < cacti.length; i++) {
    let cactusType = cacti[i];
    cactusType.x += velocityX;
    context.drawImage(cactusType.img, cactusType.x, cactusType.y, cactusType.width, cactusType.height);

    if (detectCollision(dino, cactusType)) {
      gameOver = true;
      dinoImage.src = '../dino_img/dino-dead.png'

      dinoImage.onload = function() {
        context.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);
      }
    }
  }
}

function moveDino(e) {
  if (gameOver) {
    return;
  }

  if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
    velocityY = -12;
  }

}





function placeCactus() {
  if (gameOver) {
    return;
  }
  let cactus = {
    x: cactusX,
    y: cactusY,
    width: null,
    height: cactusHeight,
    img: null
  }

  let cactusChance = Math.random(); // 0 - 0.99999
  if (cactusChance > 0.8) { // 20% chance (100 - 80 = 20)
    cactus.img = cactusImage3;
    cactus.width = cactusWidth3;
    cacti.push(cactus)
  }
  else if (cactusChance > 0.55) { // 25% chance (80 - 55 = 25)
    cactus.img = cactusImage2;
    cactus.width = cactusWidth2;
    cacti.push(cactus)
  }
  else if (cactusChance > 0.45) { // 10% chance (55 - 45 = 10)
    cactus.img = cactusImage1;
    cactus.width = cactusWidth1;
    cacti.push(cactus)
  }

  if (cacti.length > 3) {
    cacti.shift();
  }
}

// return true if the dino is colliding with a cactus
function detectCollision(a, b) {
  return (a.x + a.width > b.x) &&   // furthest right point of dino, furthest left point of cactus
    (a.x < b.x + b.width) &&   // furthest left point of dino, furthest right point of cactus.
    (a.y < b.y + b.height) &&   // bottommost point on dino, top part of cactus
    (a.y + a.height > b.y);     // topmost point on dino, bottom part of cactus
}



// HOMEWORK
// Add a game over text
// Keep score of how far the dino has made it
// Add a reset button (optional)
// https://youtu.be/lgck-txzp9o?si=4h7lCQeaoVPjoYyC&t=2049
