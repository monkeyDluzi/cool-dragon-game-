const dragon = document.getElementById("dragon");

let x = 100;
let y = 300;

let vx = 0;
let vy = 0;

const speed = 0.8;      // acceleration
const friction = 0.85;  // slows dragon down smoothly

const keys = {};

// key press
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

// key release
document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

function gameLoop() {

  // acceleration (smooth movement start)
  if (keys["ArrowRight"]) vx += speed;
  if (keys["ArrowLeft"]) vx -= speed;
  if (keys["ArrowDown"]) vy += speed;
  if (keys["ArrowUp"]) vy -= speed;

  // apply movement
  x += vx;
  y += vy;

  // friction (smooth stop)
  vx *= friction;
  vy *= friction;

  // stop tiny sliding
  if (Math.abs(vx) < 0.05) vx = 0;
  if (Math.abs(vy) < 0.05) vy = 0;

  // update position
  dragon.style.left = x + "px";
  dragon.style.top = y + "px";

  requestAnimationFrame(gameLoop);
}

gameLoop();
