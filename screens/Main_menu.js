// main_menu.js
import { background_img } from './assets.js'


const buttonOffsetY = 35;
const buttons = {}
buttons.leaderboard_btn = createButton("LEADERBOARD");
buttons.settingsButton_btn = createButton("SETTINGS");
buttons.playButton_btn = createButton("PLAY");
buttons.start_btn = createButton('START');
buttons.start_btn.mouseClicked(startGame);

for(let button in buttons){
    button.mouseOver(playHoverSound);
    button.mouseClicked(() => {
        playClickSound();
        buttonsHandling(buttons[i]);
    });
}

function startGame(){
    resetGame();
    currentState = GAME;
    startButton.hide();
    counter = 0;
}

function buttonsHandling(button){
    const label = button.html()
    if(label === 'PLAY'){
        currentState = LOADING;
    } else if (label === 'SETTINGS') {
        currentState = SETTINGS;
    } else if (label === 'MAIN MENU') {
        currentState = MAIN_MENU;
    } else if (label === 'LEADERBOARD') {
        currentState = LEADERBOARD;
    } 
}

function renderMenu(){
    background('black');
    image(background_img, 0, 0, windowWidth, windowHeight);
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

    for(const button in buttons){
        button.position(width/2 - buttons[i].size().width/2, height/2 + 80 - i * buttonOffsetY);
    }    
}

export { renderMenu }