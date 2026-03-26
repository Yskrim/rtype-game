
let hasPlayed3 = false;

function drawGameOverScreen() {
    background(0)

    image(video, 150, 150, width - 300, height - 300);
    video.loop()

    music.game_theme.stop();
    music.menu_theme.stop();
    if(!sounds.glitch.isPlaying() && !hasPlayed3){
        sounds.glitch.play()
        hasPlayed3 = true;
    }


    mainMenuButton.show();
    mainMenuButton.position(width / 2 - mainMenuButton.size().width / 2, height - 180);

    // SCORE 
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    textFont('Pixelify Sans');
    text("YOUR SCORE: " + score, width / 2, 120);
}


