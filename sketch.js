
var doraemon, doraemonImg, scared, scareImg;
var home, homeImg;
var score = 0;
var gr;
var food, foodImg, foodGrp;
var mouse, mouseImg, mouseGrp;
var gameOver, gameOverImg;
var restart, resetImg;
var song;
var play = 1;
var end = 0;
var gameState = play;

function preload(){
  doraemonImg = loadImage("doraemon.png");
  homeImg = loadImage("home.png");
  foodImg = loadImage("doracake.png");
  mouseImg = loadImage("mouse.png");
  scareImg = loadImage("doraemon_scared.png");
  resetImg = loadImage("reset.png");
  gameOverImg = loadImage("gameOver.png");
  song = loadSound("song.mp3");
}

function setup(){
  
  createCanvas(600,400);

    //song.loop();
    //song.setVolume(0.2);
  
     song.play();

    home = createSprite(300,250,20,20)
    home.addImage(homeImg);
    home.scale = 2.8;
    home.velocityX = -7;

    doraemon = createSprite(50,340,20,20);
    doraemon.addImage(doraemonImg);
    doraemon.scale = 0.1;

    scared = createSprite(50,340,20,20);
    scared.addImage(scareImg);
    scared.scale = 0.12;
    scared.visible = false;

    gameOver = createSprite(300,150,20,20);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;
    gameOver.scale = 0.2;

    restart = createSprite(300,250,20,20);
    restart.addImage(resetImg);
    restart.visible = false;
    restart.scale = 0.2;
 
  gr = createSprite(300,390,1000,5);
  gr.visible = false;

  foodGrp = new Group();
  mouseGrp = new Group();

}

function draw(){
  background("white");

  fill("red");
  textSize(20);
  text("score"+score,300,200);
  console.log(score);

  if(gameState===play){

  if(home.x<0){
    home.x = home.width/2;
  }

    if(keyDown("space")){
        doraemon.velocityY = -10;
    }
    
    doraemon.velocityY = doraemon.velocityY+0.8;
    doraemon.collide(gr);

    if(doraemon.isTouching(foodGrp)){
      score = score+2;
      foodGrp.destroyEach();
    }

    spawnFoods();
    spawnMouse();

    if(doraemon.isTouching(mouseGrp)){
      gameState = end;
    }
  }

  else if(gameState===end){
    scared.visible = true;
    doraemon.visibe = false;
    home.velocityX = 0;
    doraemon.velocityY = 0;
    foodGrp.setVelocityXEach(0);
    mouseGrp.setVelocityXEach(0);
    foodGrp.setLifetimeEach(-1);
    mouseGrp.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    song.stop();

    if(mousePressedOver(restart)){
      reset();
    }
    
}

    drawSprites();
}

function spawnFoods() {
  
  if (frameCount % 200 === 0) {
    food = createSprite(600,180,40,10);
    food.addImage(foodImg);
    food.scale = 0.05;
    food.velocityX = -12;
    food.lifetime = 200;
    foodGrp.add(food);
    }
}

function spawnMouse() {
  if (frameCount % 100 === 0) {
    mouse = createSprite(600,360,40,10);
    mouse.addImage(mouseImg);
    mouse.scale = 0.05;
    mouse.velocityX = -10;
    mouse.lifetime = 200;
    mouseGrp.add(mouse);
    }
}

function reset(){
  gameState = play;
  gameOver.visible = false;
  restart.visible = false;
  scared.visible = false;
  doraemon.visible = true;
  foodGrp.destroyEach();
  mouseGrp.destroyEach();
  home.velocityX = -7;
  if(home.x<0){
    home.x = home.width/2;
  }
  score = 0;
  song.play();
}