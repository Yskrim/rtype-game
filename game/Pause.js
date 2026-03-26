let storedVelocities = {
    player: {x: 0, y: 0},
    enemies: [],
    boss: null,
    playerBullets: [],
    enemiesBullets: [],
    stars: []
};  



function drawPausedScreen() {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    textFont('Pixelify Sans')
    text("Paused", width / 2, height / 2 - 70);

    mainMenuButton.show()
    resumeButton.show()
    
    mainMenuButton.position(width/2 - mainMenuButton.size().width/2, height/2 + 50);
    resumeButton.position(width/2 - resumeButton.size().width/2, height/2)
}

function hidePausedScreen(){
    if(currentState === GAME){
        mainMenuButton.hide()
    } if (currentState != PAUSED){
        resumeButton.hide()
    }

}

function pauseGame(){
    isPaused = true;
    storedVelocities.enemies = [];
    storedVelocities.playerBullets = [];
    storedVelocities.enemiesBullets = [];
    
    //pause player
    if(player.sprite){
        storedVelocities.player.x = player.sprite.velocity.x;
        storedVelocities.player.y = player.sprite.velocity.y;
        player.sprite.velocity.x = 0;
        player.sprite.velocity.y = 0;
    }

    // pause Enemies

    for(let i = 0; i < enemies.length; i++){
        let ex = enemies[i].sprite.velocity.x;
        let ey = enemies[i].sprite.velocity.y;
        storedVelocities.enemies.push({x: ex, y: ey});
        enemies[i].sprite.velocity.x = 0;
        enemies[i].sprite.velocity.y = 0;
    }

    if (typeof boss !== 'undefined' && boss && boss.sprite) {
        storedVelocities.boss = {
            x: boss.sprite.velocity.x,
            y: boss.sprite.velocity.y
        };
        boss.sprite.velocity.x = 0;
        boss.sprite.velocity.y = 0;
    } else {
        storedVelocities.boss = null;
    }

    
    // pause Player Bullets

    for(let i = 0; i < playerBullets.length; i++) {
        let bx  = playerBullets[i].sprite.velocity.x;
        let by  = playerBullets[i].sprite.velocity.y;
        storedVelocities.playerBullets.push({x: bx, y: by});
        playerBullets[i].sprite.velocity.x = 0;
        playerBullets[i].sprite.velocity.y = 0;
    }
    
    //pause enemy bullets

    for(let i = 0; i < enemiesBullets.length; i++) {
        let ex  = enemiesBullets[i].sprite.velocity.x;
        let ey  = enemiesBullets[i].sprite.velocity.y;
        storedVelocities.enemiesBullets.push({x: ex, y: ey});
        enemiesBullets[i].sprite.velocity.x = 0;
        enemiesBullets[i].sprite.velocity.y = 0;
    }
    
    // pause stars 

    /* for(let i = 0; i < stars.length; i++) {
        let sx = stars[i].velocity.x;
        let sy = stars[i].velocity.y;
        storedVelocities.stars.push({x: sx, y: sy});
        stars[i].velocity.x = 0;
        stars[i].velocity.y = 0;
    }
    */

    console.log('stored velocities' + storedVelocities);
}

function unpauseGame(){

    //unpause player
    player.sprite.velocity.x = storedVelocities.player.x;
    player.sprite.velocity.y = storedVelocities.player.y;

    
    //unpause Enemies
    for(let i = 0; i < enemies.length; i++){
        enemies[i].sprite.velocity.x = storedVelocities.enemies[i].x;
        enemies[i].sprite.velocity.y = storedVelocities.enemies[i].y;
    }

    if (storedVelocities.boss && typeof boss !== 'undefined' && boss && boss.sprite) {
        boss.sprite.velocity.x = storedVelocities.boss.x;
        boss.sprite.velocity.y = storedVelocities.boss.y;
    }

    // unpause stars 

    /*for(let i = 0; i < stars.length; i++) {
        stars[i].velocity.x = storedVelocities.stars[i].x;
        stars[i].velocity.y = storedVelocities.stars[i].y;
    }
        */

        // unpause Player Bullets
    for(let i = 0; i < playerBullets.length; i++) {
        playerBullets[i].sprite.velocity.x = storedVelocities.playerBullets[i].x;
        playerBullets[i].sprite.velocity.y = storedVelocities.playerBullets[i].y;
    }
    // unpause  enemy bullets
    for(let i = 0; i < enemiesBullets.length; i++) {
        enemiesBullets[i].sprite.velocity.x = storedVelocities.enemiesBullets[i].x;
        enemiesBullets[i].sprite.velocity.y = storedVelocities.enemiesBullets[i].y;
    }
    isPaused = false;
    storedVelocities.enemies = [];
    storedVelocities.boss = null;
    storedVelocities.playerBullets = [];
    storedVelocities.enemiesBullets = [];
    /* storedVelocities.stars = []; */
}