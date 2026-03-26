import { exp, imp } from '../sketch.js'

class Explosion {
    x = 0;
    y = 0;
    index = 0;
    counter = 0;
    active = false;
}

export function explodeAnimate() {
    explosionAnimation();
    impactAnimation();
}


function explosionAnimation(){
    for(let i = 0; i < exp.length; i++){
        if(exp[i].active){
            let d = 70 * gameScale;
            image(exp[exp[i].index], exp[i].x, exp[i].y, d, d);
            exp[i].counter++
            if(exp[i].counter%5 === 0){
                exp[i].index++;
                if(exp[i].index >= exp.length){
                    exp[i].index = 0;
                    exp[i].active = false;
                }
            }
        }
    }
}

function impactAnimation(){
    for(let i = 0; i < imp.length; i++){
        if(imp[i].active){
            image(imp[imp[i].index], imp[i].x, imp[i].y, imp[i].size, imp[i].size);
            imp[i].counter++
            if(imp[i].counter%5 === 0){
                imp[i].index++;
                if(imp[i].index >= imp.length){
                    imp[i].index = 0;
                    imp[i].active = false;
                }
            }
        }
    }
}

// function createExplosion(x,y){
//     let e = new Explosion;
//     e.x = x;
//     e.y = y;
//     e.index = 0;
//     e.counter = 0;
//     e.active = true;
//     explosions.push(e);
// }

// function createImpact(x,y,size){
//     let e = new Explosion;
//     e.x = x;
//     e.y = y;
//     e.index = 0;
//     e.counter = 0;
//     e.active = true;
//     e.size = size
//     imp_explosions.push(e);
// }