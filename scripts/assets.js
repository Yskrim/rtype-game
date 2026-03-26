//sfx
const sound_files= {};

sound_files.exp = loadSound("assets/sounds/explosion.mp3");
sound_files.glitch = loadSound("assets/sounds/glitch.mp3");
sound_files.hit = loadSound("assets/sounds/hitHurt.wav");
sound_files.shoot = loadSound("assets/sounds/laserShoot.wav");
sound_files.bigShoot = loadSound("assets/sounds/bigLaser.wav");
sound_files.loadUp = loadSound("assets/sounds/synth (3).wav");
sound_files.loaded = loadSound("assets/sounds/pickupCoin.wav");
sound_files.hover = loadSound("assets/sounds/click.wav");
sound_files.click = loadSound("assets/sounds/click2.wav");

//music
const music_files= {};

music_files.menu_theme = loadSound("assets/sounds/Buckshot Roulette OST - 70K.mp3");
music_files.game_theme = loadSound("assets/sounds/Buckshot_Roulette_OST__General_Release.mp3");

//sprites
const player_img = loadImage('assets/sprites/starship.png');
const player_img_2 = loadImage('assets/sprites/rocket.png');
const blaster_blue = loadImage('assets/sprites/blasters/blasterBlue.png');
const blaster_big = loadImage('assets/sprites/blasters/blasterBlue.png');
const blaster_red = loadImage('assets/sprites/blasters/blasterRed.png');
const background_img = loadImage('assets/background.png');

let sfx_default_volume = 0.15;
let music_default_volume = 0.15;

const exp_anim_arr = [];
for(let i = 0; i < 6; i++){
    let exp_anim_arr = loadImage(`assets/sprites/explosion_1/${i + 1}.png`);
    exp_anim_arr[i] = img;
}
const imp_anim_arr = [];
for(let i = 0; i < 7; i++){
    let img = loadImage(`assets/sprites/explosion_2/${i + 1}.png`);
    imp[i] = img;
}

const leaderboard = {
    leaders: [
        { name: "WINNER", score: 25000 },
        { name: "SLAYER", score: 22800 },
        { name: "MON$TER", score: 13370 }
    ]
};

export {player_img, player_img_2, blaster_big, blaster_blue, blaster_red, background_img, sound_files, music, exp_anim_arr, imp_anim_arr, leaderboard, sfx_default_volume, music_default_volume}