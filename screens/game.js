// game
import {explodeAnimate} from './explode.js'

/*                      GAME LOGIC FILE                         */

'use strict'


let boss = null;
let enemiesKilled = 0;





let isPaused = false;
/* PLAYER SHOOTING LOGIC */

let loadGunCounter = 0;
let isCounting = false;

if(!isPaused){
    
}

function createPlayerBullet(w, h, damage, bullet_img){
    let x = player.sprite.position.x + playerSize/2;
    let y = player.sprite.position.y;
    let vx = BASE_PLAYER_BULLET_VX * gameScale;
    let vy = BASE_PLAYER_BULLET_VY * gameScale;
    let b_damage = PLAYER_BULLET_DAMAGE * damage;
    let bullet = new Bullet(x, y, BULLET_WIDTH * w, BULLET_HEIGHT * h, vx, vy, b_damage, bullet_img);
    playerBullets.push(bullet);
}

function keyReleased(){
    if (key !== ' ') return;

    resumeP5AudioIfNeeded();

    if (currentState === GAME) {
        isCounting = false;
        if (!sounds.loaded.isPlaying()) {
            sounds.loaded.play();
        }
        if (sounds.loadUp.isPlaying()) {
            sounds.loadUp.stop();
        }
        if(loadGunCounter >= 50 * difficulty) {
            sounds.bigShoot.play();
            createPlayerBullet(3, 3, BIG_BULLET_DAMAGE, blasterBig);
        } else {
            sounds.shoot.play();
            createPlayerBullet(1, 1, PLAYER_BULLET_DAMAGE * difficulty, blasterBlue);
        }
    }
    loadGunCounter = 0;
    hasPlayed = false;
    isCounting = false;
}




let hasPlayed = false;
function playerShoot() {
    if (currentState !== GAME) return;

    if(keyIsDown(32)){
        
        isCounting = true;

        if (!sounds.loadUp.isPlaying()) {
            sounds.loadUp.play(); 
        }
    }
    
    if(isCounting){
        loadGunCounter++;
        let x = player.sprite.position.x - 25 * gameScale;
        let y = player.sprite.position.y + 20 * gameScale;
        let h = 4 * gameScale;
        
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
            rect(x, y, (Math.min(loadGunCounter, 50 * difficulty) / difficulty) * gameScale, h);
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
    if (boss != null) return;
    if(enemies.length === 0){
        if(frameCount%240 === 0) {
            for(let i = 0; i < random (1* difficulty,5* difficulty) ; i++){
                let y = random(height/4, 3*height/4);
                let hullH = playerSize * 1.15;
                let hullW = hullH * (player2Img.width / player2Img.height);
                let spr = new Enemy(width + 50 * gameScale, y, hullW, hullH, player2Img);
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
            break;
        }
    }
}

function moveEnemies(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].move()
        let edge = 30 * gameScale;
        if(enemies[i].sprite.position.y <= edge || enemies[i].sprite.position.y >= height - edge) {
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
    moveEnemies();
    enemySpriteEdgeControl();
    moveBoss();

    // enemy fire
    enemyCreateBullets();
    bossCreateBullets();
    enemyBulletsEdgeControl();

    if (boss) {
        boss.drawHealthBar();
    }

    collisionDetection();
    // drawSprites();
    
}