const player = document.getElementById("player");

let x = 100;
let y = 300;

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
        x += 20;
    }

    if (event.key === "ArrowLeft") {
        x -= 20;
    }

    if (event.key === "ArrowUp") {
        y -= 20;
    }

    if (event.key === "ArrowDown") {
        y += 20;
    }

    player.style.left = x + "px";
    player.style.top = y + "px";
});
