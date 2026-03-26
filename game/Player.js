// player.js

class Player{
  constructor(x,y,w,h,img) {
    this.sprite = createSprite(x, y, w, h);
    this.sprite.physics = 'kinematic';
    this.sprite.rotationLock = true; 

    if(img) {
      img.resize(w, h);
      this.sprite.image = img;
    }
    this.health = 5;
    this.maxVelocity = 10
  }


  move() {
    let accel = 0.9;
    let friction = 0.95;
    this.sprite.velocity.x = constrain(this.sprite.velocity.x, -this.maxVelocity , this.maxVelocity);
    this.sprite.velocity.y = constrain(this.sprite.velocity.y, -this.maxVelocity , this.maxVelocity);
    
    this.sprite.position.x = constrain(this.sprite.position.x, 0, width);
    this.sprite.position.y = constrain(this.sprite.position.y, 0, height);

    if(keyIsDown(LEFT_ARROW)) {
        this.sprite.velocity.x -= accel;
    } 

    if(keyIsDown(RIGHT_ARROW)) {
        this.sprite.velocity.x +=accel;
    }
    
    if(keyIsDown(UP_ARROW)) {
        this.sprite.velocity.y -=accel;
    }

    if(keyIsDown(DOWN_ARROW)) {
        this.sprite.velocity.y +=accel;
    }

    this.sprite.velocity.y *=friction;
    this.sprite.velocity.x *=friction;
    }

  reset() {
      this.sprite.position.x = 100;
      this.sprite.position.y = height / 2;
      this.sprite.velocity.x *= 0.9;
      this.sprite.velocity.y *= 0.9;
  }
}


