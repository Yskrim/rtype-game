/**
 * Layout baseline: everything scales with canvas width so aspect and motion stay even.
 * Loaded first so all other game scripts can read these globals.
 */
var GAME_REF_WIDTH = 1280;
/** Multiply screen-based scale (e.g. 0.75 → 75% of the default size on a large display). */
var SPRITE_SCREEN_SCALE = 0.75;
var gameScale = 1;
var playerSize = 50;
var BULLET_WIDTH = 16;
var BULLET_HEIGHT = 16;
var enemyBulletVelocity = 10;

var BASE_PLAYER_BULLET_VX = 10;
var BASE_PLAYER_BULLET_VY = 0;
var PLAYER_BULLET_DAMAGE = 1;

function refreshGameLayout() {
    gameScale = (width / GAME_REF_WIDTH) * SPRITE_SCREEN_SCALE;
    playerSize = Math.max(50 * gameScale, 28);
    BULLET_WIDTH = playerSize / 3;
    BULLET_HEIGHT = playerSize / 3;
    enemyBulletVelocity = 10 * gameScale;
}

/** Resize a copy of img onto the sprite so the global asset is never warped or mutated. */
function applyImageToSprite(sprite, img, w, h) {
    if (!img || !sprite) return;
    let piece = img.get(0, 0, img.width, img.height);
    piece.resize(Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
    sprite.image = piece;
}
