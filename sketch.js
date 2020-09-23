var PLAY = 1, END =0;

var monkey, monkey_running;

var bananaImg, stone, stoneImg, stoneGroup, bananaGroup, backGrnd, backgroundImg, ground;

var score;

function preload() {
  monkey_running = loadImage("Monkey_01.png",   "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  backgroundImg = loadImage("jungle.jpg");
  
  bananaImg = loadImage("banana.png");
  
  stoneImg = loadImage("stone.png");
}    
    
function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(50, 360, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  backGrnd = createSprite(200, 200, 10, 10);
  backGrnd = addImage("backgnd", backgroundImg);
  backGrnd.velocityX = -6;
  
  ground = createSprite(200, 370, 10, 10);
  ground.visible = false;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
}

  function draw() {
  background("225");
  
  text("Score: "+ stone, 250, 100);
  
  monkey.collide(ground);
  
  if (gameState===PLAY){
   
   score = score + Math.round(World.frameRate/50);
    
   if (keyDown("space") && monkey.y <360) {
      monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
     
   if (stoneGroup.isTouching(monkey)) {
      gameState = END;  
    }
    
   if(bananaGroup.isTouching(monkey)){
     monkey.scale = monkey.scale + 1;
    }
  }
    
  else if (gameState===END) {
   monkey.scale = 0.1;
  }
  
  
  drawSprites();
  spawnBananas();
  spawnStones();
}

function spawnBananas(){
  if (World.frameCount % 80===0){
    var banana = createSprite(400, 200, 10, 10);
    banana.y = 200;
    banana.addImage("banana", bananaImg);
    banana.velocityX = - (3 + 3*score/50);
    banana.scale = 0.05;
    banana.lifetime = 134;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth +1;
    
    bananaGroup.add(banana);
    }
}
  
function spawnStones(){
  if (World.frameCount % 60===0){
   var stone = createSprite(400, 370, 10, 10);
   stone.addImage("Stone", stoneImg);
   stone.velocityX = -(3 + 3*stone/50);
   stone.scale = 0.1;
   stone.lifetime = 134;
   stone.setCollider("circle", 0, 0, 200);
   
   stoneGroup.add(stone);
  }
}
