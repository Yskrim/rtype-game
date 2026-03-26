class Enemy{
    constructor(x,y,w,h,img) {
        this.sprite = createSprite(x, y, w, h);
        this.sprite.physics = 'kinematic';
        this.sprite.rotationLock = true; 

        if(img) {
            img.resize(w, h);
            this.sprite.image = img;
        }
        this.health = 3;
        this.sprite.velocity.x = -random(0.5,3);

        if(y > height/2){
            this.sprite.velocity.y = random(0,2) * -1;
        } else {
            this.sprite.velocity.y = random(0,2) * 1;
        }

        this.sprite.position.x += random(-1,1) / 1.5;
        this.sprite.position.y += random(-1,1) / 1.5;
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
