function drawLeaderboard(){
    textSize(48);
    textFont('Pixelify Sans')
    
    textAlign(CENTER);
    fill('red');
    text(`LEADERBOARD`, width/2, height/2 - 30);
    
    textAlign(LEFT);
    textSize(32);
    fill(255);

    let h = height/2 + 30

    mainMenuButton.show();
    mainMenuButton.position(width/2 - mainMenuButton.size().width/2,h+ 120);

    for(let  i = 0; i < leaderboard.leaders.length; i++){
        text(leaderboard.leaders[i].name, width/2 - 150, h);
        text(leaderboard.leaders[i].score, width/2 + 50, h);
        h+= 30;
    }
}

function sortLeaderBoard(leaderboard){
    let temp;
    for(let  i = 0; i < leaderboard.leaders.length; i++){
        for(let j = i + 1; j < leaderboard.leaders.length; j++){
            if(leaderboard.leaders[i].score < leaderboard.leaders[j].score) {
                temp = leaderboard.leaders[i];
                leaderboard.leaders[i]= leaderboard.leaders[j];
                leaderboard.leaders[j] = temp;
                
        }
        }
    }
}   
