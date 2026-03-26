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

        if (img) {
            // Clone before resize — img.resize() mutates the bitmap; all bullets
            // share the same loadImage() asset, so mutating it rescales every shot.
            let piece = img.get(0, 0, img.width, img.height);
            let rw = Math.max(1, Math.round(w * 2));
            let rh = Math.max(1, Math.round(h));
            piece.resize(rw, rh);
            this.sprite.image = piece;
        } 
    }

    isOffScreen() {
        return (this.sprite.position.x > width || this.sprite.position.x < 0 || this.sprite.position.y > height || this.sprite.position.y < 0);
    }
    
    remove(){
        this.sprite.remove();
    }

}