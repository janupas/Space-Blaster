export class Player {
  constructor(ctx, x, y, imgSrc) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = imgSrc;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, 200, 180);
  }

  update() {}
}
