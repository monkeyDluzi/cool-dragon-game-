const dragon = document.getElementById("dragon");
const gameArea = document.getElementById("gameArea");
const waveText = document.getElementById("wave");
const healthText = document.getElementById("health");

let x = 100;
let y = 300;
let vx = 0;
let vy = 0;

const speed = 0.8;
const friction = 0.85;

const keys = {};

let enemies = [];
let fireballs = [];

let wave = 1;
let health = 100;

// keyboard
document.addEventListener("keydown", (event) => {
    keys[event.key] = true;

    if (event.key === " ") {
        shootFireball();
    }
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

// fireball
function shootFireball() {
    const fireball = document.createElement("div");
    fireball.className = "fireball";

    gameArea.appendChild(fireball);

    fireballs.push({
        el: fireball,
        x: x,
        y: y,
        speed: 10
    });
}

// enemies
function spawnWave() {
    enemies = [];

    for (let i = 0; i < wave + 2; i++) {
        const enemy = document.createElement("img");
        enemy.src = "images/enemy.png";
        enemy.className = "enemy";

        enemy.style.left = Math.random() * (window.innerWidth - 60) + "px";
        enemy.style.top = Math.random() * (window.innerHeight - 60) + "px";

        gameArea.appendChild(enemy);
        enemies.push(enemy);
    }

    waveText.innerText = "Wave: " + wave;
}

spawnWave();

// game loop
function gameLoop() {

    // movement
    if (keys["ArrowRight"]) vx += speed;
    if (keys["ArrowLeft"]) vx -= speed;
    if (keys["ArrowDown"]) vy += speed;
    if (keys["ArrowUp"]) vy -= speed;

    x += vx;
    y += vy;

    vx *= friction;
    vy *= friction;

    if (Math.abs(vx) < 0.05) vx = 0;
    if (Math.abs(vy) < 0.05) vy = 0;

    // boundaries
    const maxX = window.innerWidth - dragon.offsetWidth;
    const maxY = window.innerHeight - dragon.offsetHeight;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > maxX) x = maxX;
    if (y > maxY) y = maxY;

    dragon.style.left = x + "px";
    dragon.style.top = y + "px";

    // fireballs
    fireballs = fireballs.filter(fb => {

        fb.x += fb.speed;

        fb.el.style.left = fb.x + "px";
        fb.el.style.top = fb.y + "px";

        let hit = false;

        enemies = enemies.filter(enemy => {

            const ex = enemy.offsetLeft;
            const ey = enemy.offsetTop;

            const dx = fb.x - ex;
            const dy = fb.y - ey;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 30) {
                enemy.remove();
                hit = true;
                return false;
            }

            return true;
        });

        if (hit || fb.x > window.innerWidth) {
            fb.el.remove();
            return false;
        }

        return true;
    });

    // enemy damage
    enemies.forEach(enemy => {

        const ex = enemy.offsetLeft;
        const ey = enemy.offsetTop;

        const dx = x - ex;
        const dy = y - ey;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 40) {
            health -= 1;
        }

    });

    healthText.innerText = "Health: " + health;

    // next wave
    if (enemies.length === 0) {
        wave++;
        spawnWave();
    }

    requestAnimationFrame(gameLoop);
}

enemies.forEach(enemy => {

    const ex = enemy.el.offsetLeft;
    const ey = enemy.el.offsetTop;

    const dx = x - ex;
    const dy = y - ey;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {

        const moveX = dx / distance;
        const moveY = dy / distance;

        enemy.el.style.left =
            ex + moveX * enemy.speed + "px";

        enemy.el.style.top =
            ey + moveY * enemy.speed + "px";
    }

});

gameLoop();
