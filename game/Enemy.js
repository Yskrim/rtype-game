class Enemy{
    constructor(x,y,w,h,img) {
        this.sprite = createSprite(x, y, w, h);
        this.sprite.physics = 'kinematic';
        this.sprite.rotationLock = true; 

        if (img) {
            applyImageToSprite(this.sprite, img, w, h);
        }
        this.health = 3;
        this.sprite.velocity.x = -random(0.5, 3) * gameScale;

        if(y > height/2){
            this.sprite.velocity.y = random(0, 2) * -1 * gameScale;
        } else {
            this.sprite.velocity.y = random(0, 2) * 1 * gameScale;
        }

        let j = gameScale / 1.5;
        this.sprite.position.x += random(-1, 1) * j;
        this.sprite.position.y += random(-1, 1) * j;
    }

    move() {
    }

    isOffScreen() {
        return (this.sprite.position.x < 0 || this.sprite.position.y > height || this.sprite.position.y < 0);
    }

    reset() {
        this.sprite.remove();
//        this.sprite.position.x = x;
//        this.sprite.position.y = y;
//        this.sprite.velocity.x = 0;
//        this.sprite.velocity.y = 0;
    }
}
