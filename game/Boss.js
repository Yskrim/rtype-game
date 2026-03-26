class Boss {
    constructor(x, y, img) {
        let baseH = playerSize * 1.15 * 2;
        let baseW = baseH * (img.width / img.height);
        this.sprite = createSprite(x, y, baseW, baseH);
        this.sprite.physics = 'kinematic';
        this.sprite.rotationLock = true;
        applyImageToSprite(this.sprite, img, baseW, baseH);

        this.maxHealth = 100;
        this.health = 100;

        // Twice as slow as a regular enemy base speed; stronger vertical weave in the arena
        this.sprite.velocity.x = -random(0.5, 3) * gameScale * 0.5;
        let yDir = y > height / 2 ? -1 : 1;
        this.sprite.velocity.y = random(1.4, 3.8) * yDir * gameScale * 0.5;
        let j = gameScale / 1.5;
        this.sprite.position.x += random(-1, 1) * j;
        this.sprite.position.y += random(-1, 1) * j;
    }

    /** Keeps the boss patrolling the right 2/3 of the screen (x ≥ width/3) with vertical bounce. */
    move() {
        let pad = 30 * gameScale;
        let leftWall = width / 3;
        let rightWall = width - pad;
        let yTop = pad;
        let yBot = height - pad;
        let s = this.sprite;
        let x = s.position.x;
        let y = s.position.y;
        let hw = s.hw;
        let hh = s.hh;
        let vx = s.velocity.x;
        let vy = s.velocity.y;

        if (x - hw < leftWall && vx < 0) {
            s.position.x = leftWall + hw;
            s.velocity.x *= -1;
        }
        if (x + hw > rightWall && vx > 0) {
            s.position.x = rightWall - hw;
            s.velocity.x *= -1;
        }

        if (y - hh < yTop && vy < 0) {
            s.position.y = yTop + hh;
            s.velocity.y *= -1;
        } else if (y + hh > yBot && vy > 0) {
            s.position.y = yBot - hh;
            s.velocity.y *= -1;
        }
    }

    reset() {
        this.sprite.remove();
    }

    /** Green → yellow → red as health drops */
    healthColor() {
        let pct = constrain(this.health / this.maxHealth, 0, 1);
        let r, g, b;
        if (pct > 0.5) {
            let t = (pct - 0.5) / 0.5;
            r = 255 * (1 - t);
            g = 255;
            b = 0;
        } else {
            let t = pct / 0.5;
            r = 255;
            g = 255 * t;
            b = 0;
        }
        return color(r, g, b);
    }

    drawHealthBar() {
        let barW = max(this.sprite.w * 1.1, 40 * gameScale);
        let barH = max(6 * gameScale, 4);
        // Below the boss so the bar stays visible (allSprites draw on top of user draw).
        let left = this.sprite.position.x - barW / 2;
        let top = this.sprite.position.y + this.sprite.hh + 10 * gameScale;

        noStroke();
        fill(30, 30, 40);
        rect(left - 2, top - 2, barW + 4, barH + 4);
        fill(this.healthColor());
        rect(left, top, barW * (this.health / this.maxHealth), barH);
    }
}
