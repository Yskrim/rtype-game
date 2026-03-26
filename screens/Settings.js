//settings.js
let difficultyButton;



function initSettingsScreen(){
    sfxVolumeSlider = createSlider(0, 100, (sfxVolume/0.3 * 100));
    musicVolumeSlider = createSlider(0, 100, (musicVolume/0.3 * 100));
    sfxVolume = map(sfxVolumeSlider.value(), 0, 100, 0, 0,3);
    musicVolume = map(musicVolumeSlider.value(),0, 100, 0, 0,3);


    difficultyButton = createButton("difficulty: EASY");
    difficultyButton.mouseOver(playHoverSound);
    difficultyButton.mouseClicked(toggleDifficulty);
    difficultyButton.hide();
    // console.log('После создания кнопки:', difficultyButton);
    
}

function toggleDifficulty() {

    if (difficulty === 1) {
        playClickSound();
        difficulty = 2;
        difficultyButton.html("difficulty: HARD");
    } else {
        playClickSound();
        difficulty = 1;
        difficultyButton.html("difficulty: EASY");
    }

}

function setSfxVolume(){
    for(let sound in sounds){
        sounds[sound].setVolume(sfxVolume);
    }
}
function setMusicVolume(){
    for(let sound in music){
        music[sound].setVolume(musicVolume);
    }
}


function drawSettingsScreen(){
    if (currentState === SETTINGS) {
        fill(255);
        
        difficultyButton.position(width / 2 - difficultyButton.size().width/2, height / 2 + 100);
        
        mainMenuButton.show()
        mainMenuButton.position(width / 2 -  mainMenuButton.size().width/2, height / 2 + 140);
        difficultyButton.show();
        fill(255);
        textSize(20);
        textFont('Pixelify Sans');
        text("SFX Volume", width/2 - 140, height/2 + 15);
        text("Music Volume", width/2 - 140, height/2+ 65);
    
        // применяем громкость
        sfxVolume = map(sfxVolumeSlider.value(), 0,100, 0, 0.3);
        musicVolume = map(musicVolumeSlider.value(), 0,100, 0, 0.3);
    
        setSfxVolume(sfxVolume);
        setMusicVolume(musicVolume);
    }
}

function hideSliders() {

    if (currentState === SETTINGS) {
        sfxVolumeSlider.show();
        sfxVolumeSlider.position(width/2, height/2);
      
        musicVolumeSlider.show();
        musicVolumeSlider.position(width/2, height/2+ 50);
    } else {
        sfxVolumeSlider.hide();
        musicVolumeSlider.hide();
        difficultyButton.hide();
    }
}



