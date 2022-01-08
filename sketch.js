var spriteimg, spaceShip;
var bgImg;
var ship1,ship1Img,ship2Img,ship3Img,ship4Img;
var fireGroup,enemyGroup,enemyG;

var monsterShip,mSimg,missile,missileImg,ab,missileGroup;

var wall1,wall2,wall3,wall4;

//GameState 0 = Wait, 1 = Play and 2 = End
var gameState = 0;

var fire,fireImg;

var space;
 
var score = 10;

var hits = 200;

function preload() {
  spriteimg = loadImage("../Img/rocket6.png");
  space = loadImage('../Img/space.jpg');
  fireImg = loadImage("../Img/fire.png");
  ship1Img = loadImage("../Img/rocket1.png");
  ship2Img = loadImage("../Img/rocket222.jpg");
  ship3Img = loadImage("../Img/rocket4.png");
  ship4Img = loadImage("../Img/rocket5.png");
  msImg = loadImage("../Img/rocket3.png");
  missileImg = loadImage("../Img/missile1.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bgImg = createSprite(windowWidth*2,windowHeight/2, 50, 50);
  bgImg.addImage('spaceImage',space);
  bgImg.scale = 8;

  spaceShip = createSprite(windowWidth/20,windowHeight/2, 50, 50);
  spaceShip.addImage('rocketImage',spriteimg);
  spaceShip.scale = 2.2;
  spaceShip.visible = false; 

  wall1 = createSprite(0,windowHeight/2,10,windowHeight*2);
  wall1.visible = false;

  wall2 = createSprite(windowWidth/5,windowHeight/2,10,windowHeight*2);
  wall2.visible = false;
  
  wall3 = createSprite(windowWidth/2,0,windowWidth*2,10);
  wall3.visible = false;
  
  wall4 = createSprite(windowWidth/2,windowHeight,windowWidth*2,10);
  wall4.visible = false;

  monsterShip = createSprite(windowWidth*1.5,windowHeight/2,10,10)
  monsterShip.scale = 2.2;
  monsterShip.addImage(msImg);

  fireGroup = new Group();
  enemyGroup = new Group();
  enemyG = new Group();
  missileGroup=new Group();

//   spaceShip.debug = true;

}

function draw() {
  background("#151E3D")
  // missile.x = monsterShip.x;
  if (gameState === 0) {
    console.log("this is GameState 0");

    if (keyDown("space")) {
      gameState = 1
    }
  }else if(gameState === 1) {
    // console.log(bgImg.x)
    spaceShip.visible = true;
    bgImg.velocityX = -bgImg.velocityX-50;
    if(bgImg.x<=450){
      bgImg.x = windowWidth*2.5;
    }

    if(keyIsDown(UP_ARROW)) {
      spaceShip.y -= 25;
    }
    
    if(keyIsDown(DOWN_ARROW)) {
      spaceShip.y += 25;
    }

    if(keyIsDown(RIGHT_ARROW)) {
      spaceShip.x += 25;
    }
    
    if(keyIsDown(LEFT_ARROW)) {
      spaceShip.x -= 25;
    }

    if(keyIsDown(32)) {
      attack();
    }

    spaceShip.collide(wall1);
    spaceShip.collide(wall2);
    spaceShip.collide(wall3);
    spaceShip.collide(wall4);

    if (score >= 1 ) {
      enemies();
    }
    if (score === 0){
      monsterShip.velocityX = -30
    }
    if (fireGroup.isTouching(enemyGroup)) {
      enemyGroup.destroyEach();
      score -= 1;
    }
    if(fireGroup.isTouching(enemyG)) {
      enemyG.destroyEach();
      score -= 1;
    }

    if (monsterShip.x <= windowWidth/1.3) {
      monsterShip.velocityX = 0;
      missiles();
      if (fireGroup.isTouching(monsterShip)) {
        hits = hits - 1;
      }
      if (hits===0){
        gameState = 3;
      }
    }

    if (missileGroup.isTouching(spaceShip)){
      gameState = 2;
      missileGroup.destroyEach();
      // missile.visible = false;
    }
    
    if(spaceShip.isTouching(enemyG)) {
      gameState = 2;
    }
    
    if(spaceShip.isTouching(enemyGroup)) {
      gameState = 2;
    }
  }else if(gameState ===2){
    console.log("this is gameState 2")
    bgImg.velocityX = 0;
    enemyG.destroyEach();
    enemyGroup.destroyEach();
    spaceShip.visible = false;
  }else{
    bgImg.velocityX = 0;
    enemyG.destroyEach();
    enemyGroup.destroyEach();
    spaceShip.visible = false;
    monsterShip.visible = false;
  }
  drawSprites();
  if(gameState===0){
    fill("#FAEBEFFF");
    textSize(windowWidth/20);
    text("PLEASE SAVE EARTH FROM ALIENS!",windowWidth/10,windowHeight/5);

    fill("#FAEBEFFF");
    textSize(windowWidth/15);
    text("Use Arrow Keys To Move",windowWidth/10,windowHeight/2);

    fill("#FAEBEFFF");
    textSize(windowWidth/15);
    text("Press 'Space' To Move",windowWidth/10,windowHeight/1.5);
  }
  if (gameState === 2) {
    fill("#FAEBEFFF");
    textSize(windowWidth/15);
    text("Game Over",windowWidth/2,windowHeight/2);
  }

  if (gameState === 1) {
    fill("#FAEBEFFF");
    textSize(50);
    text("Kill " + score +" Aliens",windowWidth/2,200);
  }

  if (gameState === 3) {
    fill("#FAEBEFFF");
    textSize(windowWidth/15);
    text("You Won",windowWidth/2,windowHeight/2);
  }
}

function attack() {
  if (frameCount % 10 === 0) {
    fire = createSprite(spaceShip.x+333,spaceShip.y,0,0);
    fire.addImage("fire Image",fireImg);
    fire.velocityX = 100;
    fire.scale = 0.2;
    fire.lifetime = 100;
    fireGroup.add(fire)
  }
}

function enemies(){
  if(frameCount % 100 === 0) {
    enemyShip = createSprite(windowWidth+200,Math.round(random(windowHeight-200,200)),10,10)

    var shipNumber = Math.round(random(1,2));
    console.log(shipNumber)
    switch (shipNumber) {
      case 1: enemyShip.addImage(ship1Img);
              enemyShip.scale = 0.8;
        break;
      case 2: enemyShip.addImage(ship2Img);
              enemyShip.scale = 0.5;
        break; 
      default:break;
    }
    enemyShip.velocityX = -50;
    enemyShip.lifetime = 250;

    enemyGroup.add(enemyShip);

    if(frameCount % 80 === 0){
      enemyShip2 = createSprite(windowWidth+200,Math.round(random(windowHeight-200,200)),10,10)

      var shipNumber2 = Math.round(random(1,2));
      switch (shipNumber2) {
        case 1: enemyShip2.addImage(ship3Img);
                enemyShip2.scale = 0.8;
           break;
        case 2: enemyShip2.addImage(ship4Img);
                enemyShip2.scale = 0.3;
           break;   
        default:break;
      }
      enemyShip2.velocityX = -50;
      enemyShip2.lifetime = 250;

      enemyG.add(enemyShip2);

    }
  }
}

function missiles() {
  if (frameCount%150===0) {

    missile = createSprite(windowWidth*1.5,windowHeight/2,10,10);
    missile.addImage(missileImg);
    missile.x = monsterShip.x;
    missile.velocityX=-20;
    missile.lifetime = 400;
    ab = Math.round(random(-450,450));
    missile.y = spaceShip.y - ab;
    missileGroup.add(missile);
  }
}
