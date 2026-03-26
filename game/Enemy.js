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

/* ENEMIES SHOOTING LOGIC */
export function enemyBulletsEdgeControl(){
    for(let i = enemiesBullets.length - 1; i >= 0 ; i--) {
        if(enemiesBullets[i].isOffScreen()){
            enemiesBullets[i].remove()
            enemiesBullets.splice(i,1);
        }
    }
}

export function enemyCreateBullets(){
    for(let i = 0; i < enemies.length; i++){
        if(frameCount%(90 / difficulty) == 0){
            let x = enemies[i].sprite.position.x - playerSize/2;
            let y = enemies[i].sprite.position.y;
            let damage = 1;

            let dy = player.sprite.position.y - enemies[i].sprite.position.y;
            let dx = player.sprite.position.x - enemies[i].sprite.position.x;

            let hyp = (dx**2 + dy**2) ** 0.5;
            if (hyp < 1e-6) continue;

            let dirY = dy / hyp;
            let dirX = dx / hyp;

            let vx = dirX * (enemyBulletVelocity / 1.5);
            let vy = dirY * (enemyBulletVelocity / 1.5);

            // p5play sets angleMode(DEGREES): atan2 already returns degrees.
            // Do not wrap with degrees() — that treats the value as radians and breaks rotation.
            if (dirX < -0.5) {
                let bullet = new Bullet(x, y, BULLET_WIDTH, BULLET_HEIGHT, vx, vy, damage, blasterRed);
                bullet.sprite.rotation = atan2(vy, vx);
                enemiesBullets.push(bullet);
            }
        }
    }
}
