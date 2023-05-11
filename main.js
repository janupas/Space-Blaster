import { Game } from "./src/game";

function main() {
  const game = new Game(60, document.getElementById("canvas"));

  game.start();
}

main();
