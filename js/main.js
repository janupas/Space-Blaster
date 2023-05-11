import { constants } from "./constants";
import { Game } from "./game";

/**
 * Main function
 */
function main() {
  const canvas = document.getElementById("canvas");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const game = new Game(canvas);
  let id = 0;

  game.start();

  id = setInterval(() => {
    game.update(id);
  }, 1000 / constants.FPS);
}

main();
