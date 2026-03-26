// game

/*                      GAME LOGIC FILE                         */

'use strict'
let exp = []
let imp = []
let imp_explosions = [];
let explosions = [];


let boss = null;
let enemiesKilled = 0;

function onRegularEnemyKilled() {
    enemiesKilled++;
    if (boss != null) return;
    if (enemiesKilled % 20 !== 0) return;
    spawnBoss();
}

function spawnBoss() {
    if (boss != null || currentState !== GAME) return;
    let y = random(height / 4, (3 * height) / 4);
    boss = new Boss(width + 80 * gameScale, y, player2Img);
    boss.sprite.velocity.x *= difficulty;
    boss.sprite.velocity.y *= difficulty;
}

function bossCreateBullets() {
    if (!boss || currentState !== GAME) return;
    if (frameCount % Math.max(24, floor(72 / difficulty)) !== 0) return;

    let bx = boss.sprite.position.x - boss.sprite.hw;
    let by = boss.sprite.position.y;
    let dy = player.sprite.position.y - by;
    let dx = player.sprite.position.x - bx;
    let hyp = sqrt(dx * dx + dy * dy);
    if (hyp < 1e-6) return;

    let baseAngle = atan2(dy, dx);
    let spreads = [-22, -11, 0, 11, 22];
    let spd = enemyBulletVelocity / 1.5;

    for (let k = 0; k < 5; k++) {
        let a = baseAngle + spreads[k];
        let vx = cos(a) * spd;
        let vy = sin(a) * spd;
        let bullet = new Bullet(bx, by, BULLET_WIDTH, BULLET_HEIGHT, vx, vy, 1, blasterRed);
        bullet.sprite.rotation = atan2(vy, vx);
        enemiesBullets.push(bullet);
    }
}

function moveBoss() {
    if (!boss) return;
    boss.move();
}

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