

class Enemy {
  constructor(x, y){
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxspeed = 15;
    this.maxforce = 0.5;
    this.sprite = createSprite(x,y,50,50);

  }


// Method to update location
  update() {
     
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);

    this.position.add(this.velocity);
    this.sprite.position.x = this.position.x;
    this.sprite.position.y = this.position.y;
    this.acceleration.mult(0);


  }


applyForce(force){
 // We could add mass here if we want A = F / M
    this.acceleration.add(force);

}  

seek(target){

  let desired = p5.Vector.sub(target, this.position);

  desired.setMag(this.maxspeed);

  //steering:
  let steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce);

  this.applyForce(steer);


}

display() {
    let theta = this.velocity.heading() + PI/2;

    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x,this.position.y);
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
    this.position = createVector(x,y);
  }

  movement(){
    if (keyDown("w")){
      this.position.y -= 7;
    }
    if (keyDown("a")){
      this.position.x -= 7;
    }
    if (keyDown("s")){
      this.position.y += 7;
    }
    if (keyDown("d")){
      this.position.x += 7;
    }
  }

  display(){
    fill(127);
    stroke(200);
    strokeWeight(2);
    rectMode(CENTER);
    rect(this.position.x,this.position.y,25);
  }
}

let enemy1;
let enemy2;
let player;

function setup() {
  createCanvas(800, 800);
  enemy1 = new Enemy(200,100);
  enemy2 = new Enemy(600,100);
  player = new Player(400,400);

}


function draw() {
  background(51);
  player.movement();
  player.display();

  enemy1.seek(player.position);
  enemy2.seek(player.position);

  enemy1.update();
  enemy2.update();

  enemy1.display();
  enemy2.display();
}