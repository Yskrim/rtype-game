// collisions

/**
 * Axis-aligned box overlap using live sprite position/size.
 * p5play updates physics contacts in postDraw *after* user draw(), so
 * sprite.overlaps() / .collides() can miss hits when checked inside draw().
 */
function spriteAabbOverlap(s0, s1) {
    if (!s0 || !s1 || s0.removed || s1.removed) return false;
    return (
        abs(s0.x - s1.x) < s0.hw + s1.hw &&
        abs(s0.y - s1.y) < s0.hh + s1.hh
    );
}

function collisionDetection(){
    playerBulletsCollisions();
    shipsCollisions();
    enemyBulletCollision();
    bulletsCollide();
}

function playerBulletsCollisions(){
    for(let i = playerBullets.length-1; i >=0 ; i--){
        for(let j = enemies.length-1; j >=0 ; j--){
            if (spriteAabbOverlap(playerBullets[i].sprite, enemies[j].sprite)) {
                let temp = enemies[j].health;
                enemies[j].health -= playerBullets[i].damage;
                if(enemies[j].health > 0){
                    createImpact(playerBullets[i].sprite.position.x - BULLET_WIDTH, playerBullets[i].sprite.position.y - BULLET_HEIGHT, 40 * gameScale);
                    score += 20;
                }
                
                if(enemies[j].health <= 0) {
                    sounds.exp.play();
                    createExplosion(enemies[j].sprite.position.x - 40 * gameScale, enemies[j].sprite.position.y - 40 * gameScale);
                    score += 100;
                    enemies[j].sprite.remove();
                    enemies.splice(j, 1);  
                }
                if(playerBullets[i].damage - temp <= 0){
                    sounds.hit.play();
                    playerBullets[i].remove();
                    playerBullets.splice(i, 1);   
                } else {
                    playerBullets[i].damage -= temp;
                }
                break;
            }
        }
    }
}
   
function shipsCollisions(){
    for(let j = enemies.length - 1; j >= 0; j--){
        if (spriteAabbOverlap(enemies[j].sprite, player.sprite)) {
            player.health -= 1;

            if (player.health <= 0) {
                currentState = GAME_OVER;
                clearCombatEntities();
                player.reset();
                return;
            }

            enemies[j].health -=3;

            if(player.sprite.velocity.x <=1){
                player.sprite.velocity.x = 1
            }
            if(player.sprite.velocity.y <=1){
                player.sprite.velocity.y = -enemies[j].sprite.velocity.y / abs(enemies[j].sprite.velocity.y) * 1
            }

            sounds.exp.play();
            createExplosion(enemies[j].sprite.position.x - 40 * gameScale, enemies[j].sprite.position.y - 40 * gameScale);

            player.sprite.velocity.x *= -0.5
            player.sprite.velocity.y *= -0.5
            
            enemies[j].sprite.remove();
            enemies.splice(j, 1);   
            //
            
        }
    }
}

function enemyBulletCollision(){
    for(let i = enemiesBullets.length - 1; i >=0 ; i --) {
        if (spriteAabbOverlap(enemiesBullets[i].sprite, player.sprite)) {
            player.health -=1;

            if(player.health <= 0){
                currentState = GAME_OVER;
                clearCombatEntities();
                player.reset();
                return;
            }

            sounds.hit.play()
            createImpact(enemiesBullets[i].sprite.position.x - BULLET_WIDTH - 20 * gameScale, enemiesBullets[i].sprite.position.y - BULLET_HEIGHT, 40 * gameScale);
            
            
            if(player.sprite.velocity.x <=1){
                player.sprite.velocity.x = -1; 
            }
            if(player.sprite.velocity.y <=1){
                player.sprite.velocity.y = random(-1,1); 
            }

            enemiesBullets[i].remove();
            enemiesBullets.splice(i, 1);
        }
    }
}

function bulletsCollide(){
    for(let i = playerBullets.length -1; i >= 0; i--){
        for(let j = enemiesBullets.length -1; j >= 0; j--){
            if (spriteAabbOverlap(enemiesBullets[j].sprite, playerBullets[i].sprite)) {
                if(playerBullets[i].damage - enemiesBullets[j].damage <= 0){
                    sounds.hit.play();
                    createImpact(playerBullets[i].sprite.position.x - BULLET_WIDTH, playerBullets[i].sprite.position.y - BULLET_HEIGHT, 30 * gameScale);
                    playerBullets[i].remove();
                    enemiesBullets[j].remove();
                    playerBullets.splice(i,1);
                    enemiesBullets.splice(j,1);
                    break;
                } else {
                    sounds.hit.play();
                    createImpact(enemiesBullets[j].sprite.position.x - BULLET_WIDTH * 2, enemiesBullets[j].sprite.position.y - BULLET_HEIGHT, 30 * gameScale);
                    enemiesBullets[j].remove();
                    enemiesBullets.splice(j,1);
                }
            }
        }
    }
}
        
