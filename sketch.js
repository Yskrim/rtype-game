import { Player } from './player.js'

// sketch.js



const player = new Player();
let enemiesBullets = [];

/** Shared with game.js / explode.js — must live here so resetGame() can see them. */

let sfxVolumeSlider;
let musicVolumeSlider; 


/** In-memory dummy leaderboard (no JSON load — avoids file:// / fetch issues). */

let currentState = MAIN_MENU;




function preload(){


    
    //explosion
    for(let i = 0; i < 6; i++){
        let img = loadImage(`assets/sprites/explosion_1/${i + 1}.png`);
        exp[i] = img;
    }

    //bullet impact
    for(let i = 0; i < 7; i++){
        let img = loadImage(`assets/sprites/explosion_2/${i + 1}.png`);
        imp[i] = img;
    }

    setSfxVolume(sfxVolume);
    setMusicVolume(musicVolume);
}

function applyPlayerLayout() {
    if (!player || !player.sprite || !playerImg) return;
    let ph = playerSize;
    let pw = ph * (playerImg.width / playerImg.height);
    player.sprite.w = pw;
    player.sprite.h = ph;
    applyImageToSprite(player.sprite, playerImg, pw, ph);
    player.maxVelocity = 10 * gameScale;
    player.sprite.position.x = constrain(player.sprite.position.x, 0, width - pw);
    player.sprite.position.y = constrain(player.sprite.position.y, 0, height);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    refreshGameLayout();

    video = createVideo('assets/videos/gameover.mp4')
    video.hide()
    let ph = playerSize;
    let pw = ph * (playerImg.width / playerImg.height);
    player = new Player(100 * gameScale, height / 2, pw, ph, playerImg);
    
    setStars();
    initMainMenu();
    initSettingsScreen();
    sortLeaderBoard(leaderboard);
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') {
            resumeP5AudioIfNeeded();
        }
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    refreshGameLayout();
    applyPlayerLayout();
    for (let i = stars.length - 1; i >= 0; i--) {
        stars[i].remove();
    }
    stars.length = 0;
    setStars();
}

/**
 * After the state-specific draw, sync persistent UI (DOM buttons, sliders, music,
 * starfield, player visibility) to currentState. Those layers don't switch by themselves.
 */
function syncUiToCurrentState() {
    hideMainMenuButtons();
    hidePausedScreen();
    hideSliders();
    musicSwitch();
    updateStarFieldForState(currentState);
    if (player && player.sprite) {
        player.sprite.visible = currentState === GAME;
    }
}

function draw() {
    resumeP5AudioIfNeeded();

    switch(currentState) {
        case LOADING:
            drawLoadingScreen();
            break;
        case MAIN_MENU:
            drawMainMenuScreen();
            break;
        case GAME:
            drawGamePlay();
            break;
        case PAUSED:
            drawPausedScreen();
            break;
        case SETTINGS:
            drawSettingsScreen();
            break;
        case GAME_OVER:
            saveScore();
            drawGameOverScreen();
            break;
        case LEADERBOARD:
            drawLeaderboard();
            break;

    }

    syncUiToCurrentState();
}

function musicSwitch(){
    if (currentState == GAME){
    if(!music.game_theme.isPlaying()){
    music.game_theme.loop();
    }
    music.menu_theme.stop();
    } else if (currentState == MAIN_MENU){ //main theme music switch
    if(!music.menu_theme.isPlaying()){
        music.menu_theme.loop();
    }
    music.game_theme.stop();
    } else {
        
    }
}

/** Remove all enemy ships and bullets from the world (e.g. game over). */
function clearCombatEntities() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].sprite.remove();
    }
    for (let i = 0; i < enemiesBullets.length; i++) {
        enemiesBullets[i].sprite.remove();
    }
    for (let i = 0; i < playerBullets.length; i++) {
        playerBullets[i].sprite.remove();
    }
    enemies = [];
    if (typeof boss !== 'undefined' && boss) {
        boss.reset();
        boss = null;
    }
    enemiesBullets = [];
    playerBullets = [];
    if (typeof storedVelocities !== 'undefined') {
        storedVelocities.enemies = [];
        storedVelocities.playerBullets = [];
        storedVelocities.enemiesBullets = [];
    }
    isPaused = false;
}

function saveScore() {
    let found = false;
    for (let i = 0; i < leaderboard.leaders.length; i++) {
        if (leaderboard.leaders[i].name === "YOU") {
            leaderboard.leaders[i].score = score;
            found = true;
            break;
        }
    }
    if (!found) {
        leaderboard.leaders.push({
            name: "YOU",
            score: score
        });
        sortLeaderBoard(leaderboard);
    }
}

function resetGame(){
    // Сброс переменных игры
    refreshGameLayout();
    player.health = 5;
    clearCombatEntities();
    for(let i = 0; i < explosions.length; i++){
        explosions[i].active = false;
    }
    for(let i = 0; i < imp_explosions.length; i++){
        imp_explosions[i].active = false;
    }
    player.reset();
    player.maxVelocity = 10 * gameScale;

    isPaused = false;
    isCounting = false;
    loadGunCounter = 0;
    enemiesKilled = 0;
    score = 0;

    // Скрываем кнопки меню
    for (let btn of buttons) {
        btn.hide();
    }

    // Меняем состояние на игровое
    currentState = GAME;
}

function keyPressed(){
    resumeP5AudioIfNeeded();

    if (key == '1'){
        currentState = MAIN_MENU;
    } 
    
    if (key == '2'){
        currentState = LOADING;
        mainMenuButton.hide();
        
            unpauseGame();
        }

    if (key == '3') {
        currentState = GAME_OVER;
        clearCombatEntities();
        video.stop();      
        video.hide();      
        video.play();   
        saveScore();

    }
    
    if (key == 'Escape') {
        if (currentState == GAME){
            currentState = PAUSED;
            pauseGame();
        } else if (currentState == PAUSED){
            currentState = GAME;
            unpauseGame();
        }
    
    }

} 


