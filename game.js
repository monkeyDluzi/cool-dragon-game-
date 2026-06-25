const player = document.getElementById("player");

let x = 100;
let y = 300;

document.addEventListener("keydown", (event) => {

   <img id="dragon" src="images/dragon.gif" alt="Dragon">

<script>
const dragon = document.getElementById("dragon");

let x = 100;
let y = 100;
const speed = 5;

// Stores which keys are being held down
const keys = {};

// When a key is pressed
document.addEventListener("keydown", function(event) {
  keys[event.key] = true;
});

// When a key is released
document.addEventListener("keyup", function(event) {
  keys[event.key] = false;
});

// Game loop - runs about 60 times per second
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

  dragon.style.left = x + "px";
  dragon.style.top = y + "px";

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
</script>

    player.style.left = x + "px";
    player.style.top = y + "px";
});
