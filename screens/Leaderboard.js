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

function sortLeaderBoard(lb){
    if (lb == null) {
        lb = leaderboard;
    }
    if (!lb || !lb.leaders || lb.leaders.length === 0) {
        return;
    }
    let temp;
    for(let  i = 0; i < lb.leaders.length; i++){
        for(let j = i + 1; j < lb.leaders.length; j++){
            let a = Number(lb.leaders[i].score);
            let b = Number(lb.leaders[j].score);
            if(a < b) {
                temp = lb.leaders[i];
                lb.leaders[i]= lb.leaders[j];
                lb.leaders[j] = temp;
            }
        }
    }
}   
