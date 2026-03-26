// import {} from ''

const storedVelocities = {
    player: {x: 0, y: 0},
    enemies: [],
    boss: null,
    playerBullets: [],
    enemiesBullets: [],
    stars: []
};

function resumeGame(){
    playClickSound();
    unpauseGame();
    currentState = GAME;
}
function goToMainMenu(){
    playClickSound();
    resetGame();
    hasPlayed3 = false;
    currentState = MAIN_MENU;
}

function resetGame(){

}

function renderPauseScreen() {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    textFont('Pixelify Sans')
    text("Paused", width / 2, height / 2 - 70);

    const menu_btn = createButton("MAIN MENU");
    menu_btn.mouseClicked(goToMainMenu);
    mainMenuButton.position(width/2 - mainMenuButton.size().width/2, height/2 + 50);

    const resume_btn = createButton("RESUME");
    resume_btn.mouseClicked(resumeGame);
    resumeButton.position(width/2 - resumeButton.size().width/2, height/2)
}

// PAUSE
function pausePlayer(){
    storedVelocities.player = []
    if(player.sprite){
        storedVelocities.player[0] = player.sprite.velocity.x;
        storedVelocities.player[1] = player.sprite.velocity.y;
        player.sprite.velocity.x = 0;
        player.sprite.velocity.y = 0;
    } else storedVelocities.player = null
}
function pauseEnemies(){
    storedVelocities.enemies = [];
    if(enemies.length){
        for(let i = 0; i < enemies.length; i++){
            let ex = enemies[i].sprite.velocity.x;
            let ey = enemies[i].sprite.velocity.y;
            storedVelocities.enemies.push({x: ex, y: ey});
            enemies[i].sprite.velocity.x = 0;
            enemies[i].sprite.velocity.y = 0;
        }
    } else {
        storedVelocities.enemies = null;
    }
}
function pausePlayerBullets(){
    storedVelocities.playerBullets = [];
    if (playerBullets.length){
        for(let i = 0; i < playerBullets.length; i++) {
            let bx  = playerBullets[i].sprite.velocity.x;
            let by  = playerBullets[i].sprite.velocity.y;
            storedVelocities.playerBullets.push({x: bx, y: by});
            playerBullets[i].sprite.velocity.x = 0;
            playerBullets[i].sprite.velocity.y = 0;
        }
    } else storedVelocities.playerBullets = null
}
function pauseBoss(){
    if (typeof boss !== 'undefined' && boss && boss.sprite) {
        storedVelocities.boss = [] 
        storedVelocities.boss[0] = boss.sprite.velocity.x,
        storedVelocities.boss[1] = boss.sprite.velocity.y
        boss.sprite.velocity.x = 0;
        boss.sprite.velocity.y = 0;
    } else storedVelocities.boss = null;
}
function pauseEnemyBullets(){
    storedVelocities.enemiesBullets = [];
    if(enemiesBullets.length){
        for(let i = 0; i < enemiesBullets.length; i++) {
            let ex  = enemiesBullets[i].sprite.velocity.x;
            let ey  = enemiesBullets[i].sprite.velocity.y;
            storedVelocities.enemiesBullets.push({x: ex, y: ey});
            enemiesBullets[i].sprite.velocity.x = 0;
            enemiesBullets[i].sprite.velocity.y = 0;
        }
    } else storedVelocities.enemiesBullets = null
}
function pauseGame(){
    pausePlayer();
    pausePlayerBullets();
    pauseEnemies();
    pauseEnemyBullets();
    pauseBoss();
    renderPauseScreen();
}

// UNPAUSE
function unpausePlayer(){
    player.sprite.velocity.x = storedVelocities.player.x;
    player.sprite.velocity.y = storedVelocities.player.y;
}
function unpauseEnemies(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].sprite.velocity.x = storedVelocities.enemies[i].x;
        enemies[i].sprite.velocity.y = storedVelocities.enemies[i].y;
    }
}
function unpauseBoss(){
    if (storedVelocities.boss && typeof boss !== 'undefined' && boss && boss.sprite) {
        boss.sprite.velocity.x = storedVelocities.boss.x;
        boss.sprite.velocity.y = storedVelocities.boss.y;
    }
}
function unpausePlayerBullets(){
    for(let i = 0; i < playerBullets.length; i++) {
        playerBullets[i].sprite.velocity.x = storedVelocities.playerBullets[i].x;
        playerBullets[i].sprite.velocity.y = storedVelocities.playerBullets[i].y;
    }
}
function unpauseEnemyBullets(){
    for(let i = 0; i < enemiesBullets.length; i++) {
        enemiesBullets[i].sprite.velocity.x = storedVelocities.enemiesBullets[i].x;
        enemiesBullets[i].sprite.velocity.y = storedVelocities.enemiesBullets[i].y;
    }
}

function unpauseGame(){
    unpausePlayer();
    unpausePlayerBullets();
    unpauseEnemies();
    unpauseEnemyBullets();
    unpauseBoss();
}

export { pauseGame, unpauseGame }