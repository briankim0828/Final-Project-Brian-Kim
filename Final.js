

class Enemy {
  constructor(x, y,r,g,b){
    /*
    this.sprite.acceleration = createVector(0, 0);
    this.sprite.velocity = createVector(0, -2);
    this.sprite.position = createVector(x, y);
    */
    this.maxspeed = 10;
    this.maxforce = 0.2;
    this.sprite = createSprite(x,y,50,50);
    this.r = r;
    this.g = g;
    this.b = b;
    this.sprite.acceleration = createVector(0,0);
    //this.sprite.topSpeed = 15;
    //this.sprite.friction = 0.05;
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
    this.sprite = createSprite(x,y,50,50);
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

let enemy1;
let enemy2;
let player;

function setup() {
  createCanvas(800, 700);
  enemy1 = new Enemy(200,100,235,64,52);
  enemy2 = new Enemy(600,100,242,242,24);
  player = new Player(400,400);

}


function draw() {
  background(51);


  player.movement();
  player.display();

  enemy1.seek(player.sprite.position);
  enemy2.seek(player.sprite.position);

  enemy1.update();
  enemy2.update();

  enemy1.display();
  enemy2.display();
}