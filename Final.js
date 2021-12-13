

class Enemy {
  constructor(x, y,r,g,b){
    /*
    this.sprite.acceleration = createVector(0, 0);
    this.sprite.velocity = createVector(0, -2);
    this.sprite.position = createVector(x, y);
    */
    this.maxspeed = 10;
    this.maxforce = 0.2;
    this.sprite = createSprite(x,y,27,27);
    this.r = r;
    this.g = g;
    this.b = b;
    this.sprite.acceleration = createVector(0,0);

  }


// Method to update location
  update() {
     
    this.sprite.velocity.add(this.sprite.acceleration);
    this.sprite.velocity.limit(this.maxspeed);
    this.sprite.position.add(this.sprite.velocity);
    /*
    this.sprite.position.x = this.position.x;
    this.sprite.position.y = this.position.y;
    */
    this.sprite.acceleration.mult(0);


  }


applyForce(force){
 // We could add mass here if we want A = F / M
    this.sprite.acceleration.add(force);

}  

seek(target){

  let desired = p5.Vector.sub(target, this.sprite.position);

  desired.setMag(this.maxspeed);

  //steering:
  let steer = p5.Vector.sub(desired, this.sprite.velocity);
  steer.limit(this.maxforce);

  this.applyForce(steer);


}

display() {
    let theta = this.sprite.velocity.heading() + PI/2;

    fill(this.r,this.g,this.b);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.sprite.position.x,this.sprite.position.y);
    rotate(theta); 
    rectMode(CENTER);
    rect(0,0,25);
    rect(0,-13,8);
    pop();
    //drawSprites();

  }

}

class Player {
  constructor(x,y){
    this.sprite = createSprite(x,y,27,27);
  }

  movement(){
    if (keyDown("w")){
      this.sprite.position.y -= 7;
    }
    if (keyDown("a")){
      this.sprite.position.x -= 7;
    }
    if (keyDown("s")){
      this.sprite.position.y += 7;
    }
    if (keyDown("d")){
      this.sprite.position.x += 7;
    }
    if (this.sprite.position.x <= 0){
      this.sprite.position.x = 0;
    }
    if (this.sprite.position.x >= width){
      this.sprite.position.x = width;
    }
    if (this.sprite.position.y <= 0){
      this.sprite.position.y = 0;
    }
    if (this.sprite.position.y >= height){
      this.sprite.position.y = height;
    }
  }

  display(){
    fill(127);
    stroke(200);
    strokeWeight(2);
    rectMode(CENTER);
    rect(this.sprite.position.x,this.sprite.position.y,25);
  }
}

class Playspace{
  constructor(){
    this.group = new Group();

    this.leftWall = createSprite(0,height/2,50,height);
    this.topWall = createSprite(width/2,0,width,50);
    this.rightWall = createSprite(width,height/2,50,height);
    this.bottomWall = createSprite(width/2,height,width,50);

    this.leftWall.immovable = true;
    this.topWall.immovable = true;
    this.rightWall.immovable = true;
    this.bottomWall.immovable = true;

    this.group.add(this.leftWall);
    this.group.add(this.topWall);
    this.group.add(this.rightWall);
    this.group.add(this.bottomWall);
  }
}

let playspace;

let enemy1;
let enemy2;
let enemies;

let player;

let start;
let pause = false;
let end;

let storeSpeed = [];
let storeDir = [];


function setup() {
  createCanvas(800, 700);
  playspace = new Playspace();
  enemies = new Group();
  enemy1 = new Enemy(200,100,235,64,52);
  enemy2 = new Enemy(600,100,242,242,24);
  enemies.add(enemy1.sprite);
  enemies.add(enemy2.sprite);
  player = new Player(400,400);

}


function draw() {
  background(51);

  if (pause == true){

  } else { 
    enemies.bounce(enemies);
    enemies.bounce(playspace.group);
    //enemies.bounce(player.sprite);

    player.movement();
    player.display();

    enemy1.seek(player.sprite.position);
    enemy2.seek(player.sprite.position);

    enemy1.update();
    enemy2.update();
  }

 
  player.display();

  enemy1.display();
  enemy2.display();

  line(enemy1.sprite.position.x,enemy1.sprite.position.y,player.sprite.position.x,player.sprite.position.y);
  line(enemy2.sprite.position.x,enemy2.sprite.position.y,player.sprite.position.x,player.sprite.position.y);

  drawSprites();

  console.log(pause);

  if (keyWentDown(ESCAPE)){
    if (pause == false){
      pause = true;
      storeSpeed[0] = enemy1.sprite.getSpeed();
      storeDir[0] = enemy1.sprite.getDirection();
      storeSpeed[1] = enemy2.sprite.getSpeed();
      storeDir[1] = enemy2.sprite.getDirection();
      enemy1.sprite.setSpeed(0.0000001);
      enemy2.sprite.setSpeed(0.0000001);
   } else {
      pause = false;
      enemy1.sprite.setSpeed(storeSpeed[0],storeDir[0]);
      enemy2.sprite.setSpeed(storeSpeed[1],storeDir[1]);
   }
  }

  /*
  if (player.sprite.overlap(enemy1.sprite) || player.sprite.overlap(enemy2.sprite)){
    console.log("end");
    end = true; 
  }
  */


}


