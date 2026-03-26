// main_menu.js


let buttons = [];
let buttonOffsetY = 35;
let playButton;
let mainMenuButton;
let settingsButton;
let leaderboardButton;
let startButton;

let resumeButton;


function initMainMenu(){
    leaderboardButton = createButton("LEADERBOARD");
    settingsButton = createButton("SETTINGS");
    playButton = createButton("PLAY");
    startButton = createButton('START');

    //reusable buttons
    mainMenuButton = createButton("MAIN MENU");
    resumeButton = createButton("RESUME");

    resumeButton.hide();

    buttons.push(leaderboardButton);
    buttons.push(settingsButton);
    buttons.push(playButton);

    startButton.mouseClicked(startGame);
    startButton.hide()
    mainMenuButton.mouseClicked(goToMainMenu);
    mainMenuButton.mouseOver(playHoverSound);
    mainMenuButton.hide()

    resumeButton.mouseClicked(resumeGame);
    
    for(let i = 0; i < buttons.length; i++){
        buttons[i].mouseOver(playHoverSound);

        buttons[i].mouseClicked(() => {
            playClickSound();
            buttonsHandling(buttons[i]);
        });
    }
    
}

function startGame(){
    playClickSound();
    resetGame();
    currentState = GAME;
    startButton.hide();
    counter = 0;
}

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
    mainMenuButton.hide();
}

function buttonsHandling(button){
    const label = button.html()
    if(label === 'PLAY'){
        resetGame();
        currentState = LOADING;
    } else if (label === 'SETTINGS') {
        currentState = SETTINGS;
    } else if (label === 'MAIN MENU') {
        currentState = MAIN_MENU;
    } else if (label === 'LEADERBOARD') {
        currentState = LEADERBOARD;
    } 
}


function hideMainMenuButtons(){
    if(currentState === MAIN_MENU) {
        for(let button of buttons) {
            button.show();
        }
    } else {
        for(let button of buttons) {
            button.hide();
        }
    }
}

function drawMainMenuScreen(){
    //screen gui

    background('black');
    image(backgroundImg, 0, 0, windowWidth, windowHeight);

    fill(255);
    textAlign(CENTER);
    
    
    textSize(73);
    textFont('Pixelify Sans')
    text(`R-TYPE`, width/2, height/2 - 130);
    
    textSize(16);
    fill(150);
    text(`by Anton Korotkov s5343594`, width/2, height/2 - 100);

    
    fill(255);
    textSize(20);

    for(let i = 0; i < buttons.length; i++){
        buttons[i].position(width/2 - buttons[i].size().width/2, height/2 + 80- i * buttonOffsetY);
       
    }    
}