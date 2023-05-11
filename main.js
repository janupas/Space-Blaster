import { constants } from "./src/constants";
import { Game } from "./src/game";

/**
 * Main function
 */
function main() {
  const game = new Game(document.getElementById("canvas"));
  let id = 0;

  game.start();

  id = setInterval(() => {
    game.update(id);
  }, 1000 / constants.FPS);
}

main();
