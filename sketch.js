// sketch.js
let sounds = {};
let music = {};

let video;

let stars = [];
let score = 0;
let difficulty = 1;

let playerImg;
let player2Img;

let player;

let playerBullets = [];
let blasterBlue;
let blasterBig;
let bulletSize = 8;

let backgroundImg;

let blasterRed;
let enemiesBullets = [];

let sfxVolumeSlider;
let musicVolumeSlider; 



/** In-memory dummy leaderboard (no JSON load — avoids file:// / fetch issues). */
let leaderboard = {
    leaders: [
        { name: "WINNER", score: 25000 },
        { name: "SLAYER", score: 22800 },
        { name: "MON$TER", score: 13370 }
    ]
};


const MAIN_MENU = 0;
const LOADING = 1;
const GAME = 2;
const SETTINGS = 3;
const LEADERBOARD = 4;
const PAUSED = 5;
const GAME_OVER = 6;


let currentState = MAIN_MENU;


let sfxVolume = 0.15;
let musicVolume = 0.15;

function preload(){

    //sfx
    sounds.exp = loadSound("assets/sounds/explosion.mp3");
    sounds.glitch = loadSound("assets/sounds/glitch.mp3");
    sounds.hit = loadSound("assets/sounds/hitHurt.wav");
    sounds.shoot = loadSound("assets/sounds/laserShoot.wav");
    sounds.bigShoot = loadSound("assets/sounds/bigLaser.wav");
    sounds.loadUp = loadSound("assets/sounds/synth (3).wav");
    sounds.loaded = loadSound("assets/sounds/pickupCoin.wav");
    sounds.hover = loadSound("assets/sounds/click.wav");
    sounds.click = loadSound("assets/sounds/click2.wav");


    //music
    music.menu_theme = loadSound("assets/sounds/Buckshot Roulette OST - 70K.mp3");
    music.game_theme = loadSound("assets/sounds/Buckshot_Roulette_OST__General_Release.mp3");

 
    //sprites
    playerImg = loadImage('assets/sprites/starship.png');
    player2Img = loadImage('assets/sprites/rocket.png');
    blasterBlue = loadImage('assets/sprites/blasters/blasterBlue.png');
    blasterBig = loadImage('assets/sprites/blasters/blasterBlue.png');
    blasterRed = loadImage('assets/sprites/blasters/blasterRed.png');
    
    backgroundImg = loadImage('assets/background.png');
    
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

    for (let k in sounds) {
        try {
            if (sounds[k] && typeof sounds[k].playMode === 'function') {
                sounds[k].playMode('restart');
            }
        } catch (e) { /* ignore */ }
    }
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
    //setAnimSprites();
}

function mousePressed() {
    resumeP5AudioIfNeeded();
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
    
    //main menu switch
    hideMainMenuButtons();
    hidePausedScreen();
    hideSliders();
    musicSwitch();
    updateStarFieldForState(currentState);
    if (player && player.sprite) {
        player.sprite.visible = currentState === GAME;
    }
}

function musicSwitch(){
    resumeP5AudioIfNeeded();
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
