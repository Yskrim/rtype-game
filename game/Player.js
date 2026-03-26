// player.js

class Player{
  constructor(x,y,w,h,img) {
    this.sprite = createSprite(x, y, w, h);
    this.sprite.physics = 'kinematic';
    this.sprite.rotationLock = true; 

    if (img) {
      applyImageToSprite(this.sprite, img, w, h);
    }
    this.health = 5;
    this.maxVelocity = 10 * gameScale;
  }


  move() {
    let accel = 0.9 * gameScale;
    let friction = 0.95;
    let cap = this.maxVelocity;
    this.sprite.velocity.x = constrain(this.sprite.velocity.x, -cap , cap);
    this.sprite.velocity.y = constrain(this.sprite.velocity.y, -cap , cap);
    
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
      this.sprite.position.x = 100 * gameScale;
      this.sprite.position.y = height / 2;
      this.sprite.velocity.x *= 0.9;
      this.sprite.velocity.y *= 0.9;
  }
}


