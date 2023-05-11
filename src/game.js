export class Game {
  constructor(FPS, canvas) {
    this.FPS = FPS;
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
  }

  // Runs only once
  start() {}

  // Runs per frame
  update() {}
}
