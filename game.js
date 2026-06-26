const dragon = document.getElementById("dragon");
const gameArea = document.getElementById("gameArea");
const waveText = document.getElementById("wave");

let x = 100;
let y = 300;
let vx = 0;
let vy = 0;

const speed = 0.8;
const friction = 0.85;

const keys = {};

let enemies = [];
let wave = 1;

// controls
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

// spawn enemies
function spawnWave() {
  enemies = [];

  for (let i = 0; i < wave + 2; i++) {
    const enemy = document.createElement("img");
    enemy.src = "images/enemy.png"; // change if needed
    enemy.id = "enemy";

    enemy.style.left = Math.random() * (window.innerWidth - 60) + "px";
    enemy.style.top = Math.random() * (window.innerHeight - 60) + "px";

    gameArea.appendChild(enemy);
    enemies.push(enemy);
  }

  waveText.innerText = "Wave: " + wave;
}

spawnWave();

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

  // 🧠 check enemy collision
  enemies = enemies.filter(enemy => {

    const ex = enemy.offsetLeft;
    const ey = enemy.offsetTop;

    const dx = x - ex;
    const dy = y - ey;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 50) {
      enemy.remove();
      return false;
    }

    return true;
  });

  // 🌊 next wave when all enemies are gone
  if (enemies.length === 0) {
    wave++;
    spawnWave();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
