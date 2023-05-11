import { Player } from "./classes/Player";
import { constants } from "./constants";

/**
 * This is the base skelton for the working game
 */
export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.playerX = canvas.width - 300;
    this.playerY = 20;
    this.context = this.canvas.getContext("2d");
    this.player = new Player(
      this.context,
      this.playerX,
      this.playerY,
      constants.PLAYER_IMG
    );
  }

  // Runs only once
  start() {
    this.player.img.onload = () => {
      this.player.draw();
    };
  }

  // Runs per frame
  update(id) {
    this.player.draw();
  }
}
