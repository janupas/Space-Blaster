/**
 * This is the base skelton for the working game
 */
export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
  }

  // Runs only once
  start() {}

  // Runs per frame
  update(id) {}
}
