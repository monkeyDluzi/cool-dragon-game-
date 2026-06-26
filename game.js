const player = document.getElementById("player");

let x = 100;
let y = 100;
const speed = 5;

const keys = {};

// When a key is pressed
document.addEventListener("keydown", function(event) {
  keys[event.key] = true;
});

// When a key is released
document.addEventListener("keyup", function(event) {
  keys[event.key] = false;
});

// Game loop
function gameLoop() {

  if (keys["ArrowRight"]) {
    x += speed;
  }

  if (keys["ArrowLeft"]) {
    x -= speed;
  }

  if (keys["ArrowUp"]) {
    y -= speed;
  }

  if (keys["ArrowDown"]) {
    y += speed;
  }

  player.style.left = x + "px";
  player.style.top = y + "px";

  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
