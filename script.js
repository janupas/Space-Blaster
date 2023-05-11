const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/**
 * Information about game
 */
const GAME = {
  FPS: 60,
  LOOP_ID: 0,
  INITIAL_PLAYER_Y: 0,
  PLAYER_WIDTH: 200,
  PLAYER_HEIGHT: 200,
  PLAYER_IMG: "./assets/player.png",
  INITIAL_PLAYER_X: canvas.width - 200,
};

class Player {
  constructor(x, y, imgSrc) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = imgSrc;
  }

  draw() {
    context.drawImage(
      this.img,
      this.x,
      this.y,
      GAME.PLAYER_WIDTH,
      GAME.PLAYER_HEIGHT
    );
  }
}

const player = new Player(
  GAME.INITIAL_PLAYER_X,
  GAME.INITIAL_PLAYER_Y,
  GAME.PLAYER_IMG
);

/**
 * This would only run once
 */
const start = () => {
  player.img.onload = () => {
    player.draw();
  };
};

/**
 * Game loop comes here
 */
const update = () => {
  player.draw();
};

start();
setInterval(() => {
  update();
}, 1000 / GAME.FPS);
