//sounds

function playHoverSound() { //works
    sounds.hover.play();
}
function playClickSound() { //works
        sounds.click.play();

}

//GUI functions
function showHealthBar(){
    textFont('Pixelify Sans')
    for(let i = 0; i < player.health; i++){
        text('❤️', 50 + 18 * i, 50);
    }
    textSize(24)
    fill('white');
    text('fps' + frameRate().toFixed(0), 50, 80);
    text('score:' + score, 50, 110);
}


// gameplay functions

function setStars() {
    refreshGameLayout();
    for(let i = 0; i < width/10; i++){
        let size = random(1, 5) * gameScale;
        size = max(0.6, size);
        let star = createSprite(random(0, width), random(0, height), size, size);
        star.physics = 'none';
        star.depth = 100;
        star.rotationLock = true;
        star.factor = random(0.2 , 3);
        // Keep sprite velocity at 0 so p5play's physics _step doesn't move stars
        // when the game is paused — we scroll only via moveStars() during GAME.
        star.velocity.x = 0;
        star.velocity.y = 0;
        star.scrollSpeed = (-5 * (star.factor / 5)) * gameScale;
        let roll = random();
        if (roll < 0.12) {
            star.shapeColor = color(170, 210, 255);
        } else if (roll < 0.22) {
            star.shapeColor = color(190, 255, 255);
        } else {
            star.shapeColor = color(
                random(236, 255),
                random(238, 255),
                random(245, 255)
            );
        }
        stars.push(star);
    }
}

function moveStars() {
    for(let i = 0; i < stars.length; i++){
        stars[i].position.x += stars[i].scrollSpeed;

        if(stars[i].position.x < 0){
            stars[i].position.x = width;
        }
        if(stars[i].position.y < 0){
            stars[i].position.y = height;
        }
    }
}

/** Stars only during active play: hidden on main menu, pause, etc. */
function updateStarFieldForState(state) {
    const show = (state === GAME);
    for (let i = 0; i < stars.length; i++) {
        stars[i].visible = show;
    }
    if (show) {
        moveStars();
    }
}

function wobble(a) {
    let j = gameScale / 1.5;
    a.sprite.position.x += random(-1, 1) * j;
    a.sprite.position.y += random(-1, 1) * j;
}

function flame(player) {
    if (!player || !player.sprite) {
        console.error('player invalid or missing');
        return false;
    }
    let s = gameScale;
    let spr = createSprite(
        player.sprite.position.x - 30 * s,
        player.sprite.position.y + 3 * s,
        random(1, 8) * s,
        random(1, 8) * s
    );
    spr.velocity.y = (random(- player.sprite.velocity.y,  player.sprite.velocity.y) / 3  + random(-1, 1)) * s;
    spr.velocity.x = -2 * s;
    spr.velocity.x -= (player.sprite.position.x / 100) * s;
    spr.friction = 0.1;
    spr.depth = player.sprite.depth 
    spr.life = random(1, 5).toFixed(0);
    spr.shapeColor = color(random(200, 255),random(150, 255), 0);
}

