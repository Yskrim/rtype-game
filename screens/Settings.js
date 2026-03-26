import { sfx_default_volume, music_default_volume, difficulty } from "./scripts/variables.js"


const sliders = {};
sliders.sfx = createSlider(0, 100, (sfx_default_volume / 0.3 * 100));
sliders.sfx.input(setSfxVolume(sliders.sfx.value()))
sliders.music = createSlider(0, 100, (music_default_volume / 0.3 * 100));
sliders.music.input(setSfxVolume(sliders.music.value()))


const difficulty_button = createButton("difficulty: EASY");
difficulty_button.mouseOver(playHoverSound);
difficulty_button.mouseClicked(toggleDifficulty);


function toggleDifficulty() {
    playClickSound();
    if (difficulty === 'EASY') {
        difficulty = 'HARD';
        difficulty_button.html("difficulty: HARD");
    } else {
        difficulty = 'EASY';
        difficulty_button.html("difficulty: EASY");
    }
}

function setSfxVolume(volume){
    volume = map(volume, 0, 100, 0, 0.3)
    for(let sound in sound_files){
        sound_files[sound].setVolume(volume);
    }
}
function setMusicVolume(volume){
    volume = map(volume, 0, 100, 0, 0.3)
    for(let sound in music_files){
        music_files[sound].setVolume(volume);
    }
}

function drawSettingsScreen(){
    if (currentState === SETTINGS) {
        fill(255);
        
        difficulty_button.position(width / 2 - difficulty_button.size().width/2, height / 2 + 100);
        
        mainMenuButton.show()
        mainMenuButton.position(width / 2 -  mainMenuButton.size().width/2, height / 2 + 140);
        difficulty_button.show();
        fill(255);
        textSize(20);
        textFont('Pixelify Sans');
        text("SFX Volume", width/2 - 140, height/2 + 15);
        text("Music Volume", width/2 - 140, height/2+ 65);
    
        // применяем громкость
        sfxVolume = map(sfx_volume_slider.value(), 0,100, 0, 0.3);
        musicVolume = map(music_volume_slider.value(), 0,100, 0, 0.3);
    
        setSfxVolume(sfxVolume);
        setMusicVolume(musicVolume);
    }
}

function hideSliders() {

    if (currentState === SETTINGS) {
        sfx_volume_slider.show();
        sfx_volume_slider.position(width/2, height/2);
      
        music_volume_slider.show();
        music_volume_slider.position(width/2, height/2+ 50);
    } else {
        sfx_volume_slider.hide();
        music_volume_slider.hide();
        difficulty_button.hide();
    }
}



