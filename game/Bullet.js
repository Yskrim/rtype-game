//bullet.js

class Bullet{
    constructor(x, y, w, h, vx, vy, damage, img){
        this.sprite = createSprite(x,y,w,h);
        this.sprite.physics = 'kinematic';
        this.sprite.rotationLock = false;
        this.sprite.isSuperFast = true; 
        this.sprite.velocity.x = vx;
        this.sprite.velocity.y = vy;
        this.damage = damage

        if(img){
            img.resize(w*2, h);
            this.sprite.image = img;
        } 
    }

    isOffScreen() {
        return (this.sprite.position.x > width || this.sprite.position.x < 0 || this.sprite.position.y > height || this.sprite.position.y < 0);
    }
    
    remove(){
        this.sprite.remove();
    }

}