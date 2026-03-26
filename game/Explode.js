class Explosion {
    x = 0;
    y = 0;
    index = 0;
    counter = 0;
    active = false;
}

let exp = []
let imp = []
let imp_explosions = [];
let explosions = [];

function explodeAnimate() {
    explosionAnimation();
    impactAnimation();
}

function explosionAnimation(){
    for(let i = 0; i < explosions.length; i++){
        if(explosions[i].active){
            image(exp[explosions[i].index], explosions[i].x, explosions[i].y, 70, 70);
            explosions[i].counter++
            if(explosions[i].counter%5 === 0){
                explosions[i].index++;
                if(explosions[i].index >= exp.length){
                    explosions[i].index = 0;
                    explosions[i].active = false;
                }
            }
        }
    }
}

function impactAnimation(){
    for(let i = 0; i < imp_explosions.length; i++){
        if(imp_explosions[i].active){
            image(imp[imp_explosions[i].index], imp_explosions[i].x, imp_explosions[i].y, imp_explosions[i].size, imp_explosions[i].size);
            imp_explosions[i].counter++
            if(imp_explosions[i].counter%5 === 0){
                imp_explosions[i].index++;
                if(imp_explosions[i].index >= imp.length){
                    imp_explosions[i].index = 0;
                    imp_explosions[i].active = false;
                }
            }
        }
    }
}

function createExplosion(x,y){
    let e = new Explosion;
    e.x = x;
    e.y = y;
    e.index = 0;
    e.counter = 0;
    e.active = true;
    explosions.push(e);
    console.log(e)
}

function createImpact(x,y,size){
    let e = new Explosion;
    e.x = x;
    e.y = y;
    e.index = 0;
    e.counter = 0;
    e.active = true;
    e.size = size
    imp_explosions.push(e);
    console.log(e)
}

function keyPressed() {
    if(key === 'x'){
        let x = player.sprite.position.x - 40;
        let y =player.sprite.position.y - 40;
        createExplosion(x,y);
    }
    if(key === 'z'){
        let x = player.sprite.position.x - 40;
        let y =player.sprite.position.y - 40;
        createImpact(x,y);
    }
}