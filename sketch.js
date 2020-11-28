var PLAY = 1;
var END = 0;
var gameState = 1;

var sword,swordImage, swordSound, SS1, SS2, SS3, SS4, SS5, SS6;

var gameover, gameoverImage, gameOverSound;

var restart, restartImage, restart2, restartImage2;

var fruit, fruit1, fruit2, fruit3, fruit4, fruitGroup;

var alien, alienAnimation, enemyGroup;
var background1, backgroundImage;

var score = 0;

function preload(){
  swordImage = loadImage("sword .png");
  
  gameoverImage = loadImage("gameover.png");
  
  alienAnimation = loadAnimation("alien1.png","alien2.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  backgroundImage = loadImage("background.jpg");
  
  restartImage = loadImage("Restart button.png");
  restartImage2 = loadImage("R to restart.png");
  
  gameOverSound = loadSound ("gameover.mp3");
  
  SS1 = loadSound ("sword 1.m4a");
  SS2 = loadSound ("sword 2.m4a");
  SS3 = loadSound ("sword 3.m4a");
  SS4 = loadSound ("sword 4.m4a");
  SS5 = loadSound ("sword 5.m4a");
  SS6 = loadSound ("sword 6.m4a");

}

function setup(){
  createCanvas(500, 500);
     
  score = 0;


  background1 = createSprite(250,250,500,500);
  background1.addImage("backgroundImage", backgroundImage);
  background1.scale = 0.5;
  
  sword = createSprite(50,180,20,50);
  sword.addImage("swordImage", swordImage);
  sword.scale = 0.1;
  
   score = 0
  
  gameover = createSprite(250,200, 500,500);
  gameover.scale = 2;
  gameover.addImage("gameoverImage", gameoverImage);
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  sword.setCollider("rectangle",200,-100,400,350);
  sword.debug = false;
  
  restart = createSprite(250,300,50,50);
  restart.scale = 0.2;
  restart.addImage("restartImage", restartImage);
  
  
  restart2 = createSprite(250,400,50,50);
  restart2.scale = 0.2;
  restart2.addImage("restartImage2", restartImage2);
   
}

function draw(){
  background(180);
  
  
   if(gameState === PLAY){
     
     sword.visible = true;
     
     sword.x=mouseX;
     sword.y=mouseY;
     
     spawnfruits();
     spawnenemy();
     
     if(fruitGroup.isTouching(sword)){
        fruitGroup.destroyEach();
        score = score+2;
        spawnSwordSound();
     }
     
     gameover.visible = false;
     restart.visible = false;
     restart2.visible = false;
     
     if(enemyGroup.isTouching(sword)){
       gameState= END;
       gameOverSound.play();
     } 
     
       
   }
  
  
   else if(gameState === END){
    score = 0
     gameover.visible = true;
     restart.visible = true;
     restart2.visible = true;
     sword.visible = false;
     
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     
  if(keyDown("r")) {
     gameState= PLAY;  
    }
  
   }
  
  drawSprites();
  
  textSize(20);
  stroke("white");
  fill("white");
  text("Score: "+ score, 350,50);
  
  
}

function spawnfruits() {
  if(frameCount%80===0){
    fruit= createSprite(400,200,20,20);
    fruit.scale= 0.2;
    
    var pos = Math.round(random(1,2)); 
    
    if(pos === 1){
      fruit.x= -7
      fruit.velocityX = (7+(score/4));
      
    }
    
    else if(pos === 2){
      fruit.x=507
      fruit.velocityX = -(7+(score/4));
    }
    
   var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default: break;
    }
   fruit.y = Math.round(random(50,340));  
   fruit.setLifetime = 100;
    
   fruitGroup.add(fruit);
  }
}


function spawnenemy() {
   if(frameCount%200===0){
    alien= createSprite(250,250,500,500);
      
     var ene = Math.round(random(1,2)); 
    
     if(ene === 1){
      alien.x= -7
      alien.velocityX = (8+(score/10));
      }
    
    else if(ene === 2){
      alien.x=507
      alien.velocityX = -(8+(score/10));
    }
    
    alien.addAnimation("moving", alienAnimation);
    alien.y = Math.round(random(100,300));
    alien.setLifetime = 50;
    
   enemyGroup.add(alien); 
   }
}

function spawnSwordSound() {
  
  var sou = Math.round(random(1,6));
    switch(sou) {
      case 1: SS1.play();
              break;
      case 2: SS2.play();
              break;
      case 3: SS3.play();
              break;
      case 4: SS4.play();
              break;
      case 5: SS5.play();
              break; 
      case 6: SS6.play();
              break;    
              
      default: break;
    }
}