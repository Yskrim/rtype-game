let counter = 0
let hasPlayed2 = false;
function drawLoadingScreen(){
    background('black');
    rect(width/2 - 200, height/2 + 50, Math.min(counter+=random(0,100)/10,400), 80);

    if(counter > 450){
        if(!sounds.loaded.isPlaying() && !hasPlayed2){
            sounds.loaded.play()
            hasPlayed2 = true;
        }
        startButton.show();
        startButton.position(width/2 - startButton.size().width/2, height/2);
    }

    
}