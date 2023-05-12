const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
const FPS = 60;
let LOOP_ID = 0;

// Player variables
const PLAYER_WIDTH = 100;
const PLAYER_HEIGHT = 100;
const INITIAL_PLAYER_X = 0;
const INITIAL_PLAYER_Y = canvas.height - (PLAYER_HEIGHT + 100);

class Ship {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocity = 10;
  }

  draw() {
    context.fillRect(this.x, this.y, this.w, this.h);
  }

  update(direction) {
    if (direction == "left") {
      this.x -= this.velocity;
    } else if (direction == "right") {
      this.x += this.velocity;
    }
  }
}

const ship = new Ship(
  INITIAL_PLAYER_X,
  INITIAL_PLAYER_Y,
  PLAYER_WIDTH,
  PLAYER_HEIGHT
);

function start() {
  ship.draw();
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  ship.draw();
}

start();

LOOP_ID = setInterval(() => {
  update();
}, 1000 / FPS);

window.addEventListener("keydown", (e) => {
  /**
   * Detecting key presses and wall collision
   */
  if (e.key === "ArrowRight") {
    if (!(ship.x + ship.w >= canvas.width)) {
      ship.update("right");
    }
  }

  if (e.key === "ArrowLeft") {
    if (!ship.x <= 0) {
      ship.update("left");
    }
  }
});
