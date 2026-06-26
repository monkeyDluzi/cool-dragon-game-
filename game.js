const dragon = document.getElementById("dragon");

let x = 100;
let y = 300;

let vx = 0;
let vy = 0;

const speed = 0.8;
const friction = 0.85;

const keys = {};

document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

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

  // 🧱 BOUNDARIES (THIS IS THE IMPORTANT PART)

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const dragonWidth = dragon.offsetWidth;
  const dragonHeight = dragon.offsetHeight;

  if (x < 0) x = 0;
  if (y < 0) y = 0;

  if (x > screenWidth - dragonWidth) {
    x = screenWidth - dragonWidth;
  }

  if (y > screenHeight - dragonHeight) {
    y = screenHeight - dragonHeight;
  }

  // update position
  dragon.style.left = x + "px";
  dragon.style.top = y + "px";

  requestAnimationFrame(gameLoop);
}

gameLoop();
