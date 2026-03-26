// game

/*                      GAME LOGIC FILE                         */

'use strict'



/* ENEMIES SHOOTING LOGIC */
function enemyBulletsEdgeControl(){
    for(let i = enemiesBullets.length - 1; i >= 0 ; i--) {
        if(enemiesBullets[i].isOffScreen()){
            enemiesBullets[i].remove()
            enemiesBullets.splice(i,1);
        }
    }
}

function enemyCreateBullets(){
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

            let vx = dirX * enemyBulletVelocity / 1.5;
            let vy = dirY * enemyBulletVelocity / 1.5;

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


let isPaused = false;
/* PLAYER SHOOTING LOGIC */

let loadGunCounter = 0;
let isCounting = false;

if(!isPaused){
    
}

function createPlayerBullet(w, h, damage, bullet_img){
    let x = player.sprite.position.x + playerSize/2;
    let y = player.sprite.position.y;
    let vx = PLAYER_BULLET_VX;
    let vy = PLAYER_BULLET_VY;
    let b_damage = PLAYER_BULLET_DAMAGE * damage;
    let bullet = new Bullet(x, y, BULLET_WIDTH * w, BULLET_HEIGHT * h, vx, vy, b_damage, bullet_img);
    playerBullets.push(bullet);
}

function keyReleased(){
    
        if (key === ' '){

            if(currentState != PAUSED){

                isCounting = false;
                if(!sounds.loaded.isPlaying){
                 sounds.loaded.play();
                }
                
                if (sounds.loadUp.isPlaying()) {
                    sounds.loadUp.stop(); 
                }
                
                if(loadGunCounter >= 50 * difficulty) {
                    
                    sounds.bigShoot.play();     
                    createPlayerBullet(3, 3,PLAYER_BULLET_DAMAGE * 100, blasterBig);
                    
                } else {
                    sounds.shoot.play()
                    createPlayerBullet(1, 1,PLAYER_BULLET_DAMAGE * difficulty, blasterBlue);
                }
            
    
            }
            loadGunCounter = 0;
            hasPlayed = false;
            isCounting = false;
    }
}




let hasPlayed = false;
function playerShoot() {
    if(keyIsDown(32)){
        
        isCounting = true;

        if (!sounds.loadUp.isPlaying()) {
            sounds.loadUp.play(); 
        }
    }
    
    if(isCounting){
        loadGunCounter++;
        let x = player.sprite.position.x - 25;
        let y = player.sprite.position.y + 20;
        let h = 4
        
        if(loadGunCounter > 10 * difficulty){
            if(loadGunCounter <=20 * difficulty){
                fill('red');
            } else if(loadGunCounter <= 60 * difficulty){
                fill('orange');
            } else {
                if (sounds.loadUp.isPlaying()) {
                    sounds.loadUp.stop(); 
                }
                if(!hasPlayed && !sounds.loaded.isPlaying()){
                    sounds.loaded.play();
                    hasPlayed = true;
                }
                fill('green');
            }
            rect(x, y, Math.min(loadGunCounter, 50 * difficulty)/difficulty, h);
        }
    }
}


function playerBulletsEdgeControl(){
    for(let i = 0; i < playerBullets.length; i++){
        if(playerBullets[i].isOffScreen()){
            playerBullets[i].remove();
            playerBullets.splice(i, 1);
        }
    }
}




/*                       ENEMY SPAWN LOGIC                       */
let enemies = [];

function spawnEnemies() {
    if(enemies.length === 0){
        if(frameCount%240 === 0) {
            for(let i = 0; i < random (1* difficulty,5* difficulty) ; i++){
                let y = random(height/4, 3*height/4);
                let spr = new Enemy(width + 50, y, playerSize + 10, playerSize - 10, player2Img);
                spr.sprite.velocity.x *= difficulty;
                spr.sprite.velocity.y *= difficulty;
                enemies.push(spr)
            }
        } 
    }
}

function enemySpriteEdgeControl(){   
    for(let j = 0; j < enemies.length; j++){
        if(enemies[j].isOffScreen()){
            enemies[j].reset();
            enemies.splice(j, 1);   
            console.log(enemies);
            break;
        }
    }
}

function moveEnemies(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].move()
        if(enemies[i].sprite.position.y <= 30 || enemies[i].sprite.position.y >= height - 30) {
            enemies[i].sprite.velocity.y *= -1;
        }

        /*
            enemies[i].sprite.position.y += (height/200 - player.sprite.position.y/100);
            if(enemies[i].sprite.position.y < 0){
                enemies[i].sprite.position.y = height;
            }
            if(enemies[i].sprite.position.y > height){
                enemies[i].sprite.position.y = 0;
            }
        */
    }
}



function drawGamePlay(){
    background('black');
    
    // gui element
    showHealthBar();

    
    // sound part

    
    
    
    // utilities
    wobble(player);
    flame(player);
    explodeAnimate()
    
    // player 
    player.move()
    playerShoot();
    playerBulletsEdgeControl();

    // enemy Sprites
    spawnEnemies();
    moveEnemies()
    enemySpriteEdgeControl();

    // enemy fire
    enemyCreateBullets();
    enemyBulletsEdgeControl();

    collisionDetection();
    // drawSprites();
    
}