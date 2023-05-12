const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FPS = 60;
let LOOP_ID = 0;
const BULLETS = [];
const ASTEROIDS = [];
const PLAYER_WIDTH = 100;
const PLAYER_HEIGHT = 100;
const INITIAL_PLAYER_X = 0;
const MAX_ASTEROID_WIDTH = 200;
const ASTEROID_SPAWN_POINT_Y = 0;
const ASTEROID_SPAWN_INTERVAL = 3000;
const PLAYER_IMG = "./assets/ship.png";
const BULLET_IMG = "./assets/bullet.png";
const ASTEROID_IMG = "./assets/asteroid.png";
const INITIAL_PLAYER_Y = canvas.height - (PLAYER_HEIGHT + 50);
const ASTEROID_SPAWN_POINT_X = () =>
  Math.random() * canvas.width - MAX_ASTEROID_WIDTH + 100;

class Bullet {
  constructor(x, y, imgSrc) {
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 25;
    this.img = new Image();
    this.img.src = imgSrc;
    this.velocity = 10;
  }

  draw() {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  update() {
    this.y -= this.velocity;
  }
}

class Asteroid {
  constructor(x, y, w, h, imgSrc) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = new Image();
    this.img.src = imgSrc;
    this.velocity = 2;
  }

  draw() {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  update() {
    this.y += this.velocity;
  }
}

class Ship {
  constructor(x, y, w, h, imgSrc) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = new Image();
    this.img.src = imgSrc;
    this.velocity = 13;
  }

  draw() {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  update(direction) {
    if (direction == "left") {
      this.x -= this.velocity;
    } else if (direction == "right") {
      this.x += this.velocity;
    }
  }
}

// This is the player
const ship = new Ship(
  INITIAL_PLAYER_X,
  INITIAL_PLAYER_Y,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_IMG
);

function spawnAsteroids() {
  setInterval(() => {
    const asteroid = new Asteroid(
      ASTEROID_SPAWN_POINT_X(),
      ASTEROID_SPAWN_POINT_Y,
      50,
      50,
      ASTEROID_IMG
    );
    ASTEROIDS.push(asteroid);
  }, ASTEROID_SPAWN_INTERVAL);
}

function checkCollision(obj1, obj2) {
  if (
    obj1.x < obj2.x + obj2.w &&
    obj1.x + obj1.w > obj2.x &&
    obj1.y < obj2.y + obj2.h &&
    obj1.y + obj1.h > obj2.y
  ) {
    return true;
  }
}

window.addEventListener("mousedown", (e) => {
  const bullet = new Bullet(ship.x + ship.w / 2, ship.y, BULLET_IMG);
  BULLETS.push(bullet);
});

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

function start() {
  ship.img.onload = () => {
    ship.draw();
  };
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  ship.draw();

  for (let i = 0; i < BULLETS.length; i++) {
    BULLETS[i].update();
    BULLETS[i].draw();

    if (BULLETS[i].y <= 0) {
      BULLETS.splice(i, 1);
    }
  }

  for (let i = 0; i < ASTEROIDS.length; i++) {
    ASTEROIDS[i].update();
    ASTEROIDS[i].draw();
  }

  for (let i = 0; i < ASTEROIDS.length; i++) {
    for (let j = 0; j < BULLETS.length; j++) {
      if (checkCollision(ASTEROIDS[i], BULLETS[j])) {
        ASTEROIDS.splice(i, 1);
      }
    }
  }
}

start();
spawnAsteroids();

LOOP_ID = setInterval(() => {
  update();
}, 1000 / FPS);
