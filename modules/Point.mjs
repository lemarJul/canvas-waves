import { euclideanDist, rand, ease } from "./utils.mjs";

export default class Point {
  #ANCHOR_X;
  #ANCHOR_Y;
  constructor({ x, y }, OPTIONS) {
    this.OPTIONS = OPTIONS;

    this.#ANCHOR_X = this.x = x;
    this.#ANCHOR_Y = this.y = y;
    // this.setTarget();
  }
  get ANCHOR_X() {
    return this.#ANCHOR_X;
  }
  get ANCHOR_Y() {
    return this.#ANCHOR_Y;
  }
  get coords() {
    return [this.x, this.y];
  }
  set coords([x = this.x, y = this.y]) {
    [this.x, this.y] = [x, y];
  }
  /**
   * Updates the position of the wave on the canvas.
   * If the euclidean distance is not set, it sets the target.
   */
  update() {
    const reachedTarget = euclideanDist(
      this.x,
      this.targetX,
      this.y,
      this.targetY
    );
    if (!reachedTarget) return this.setTarget();
    [this.x, this.y] = [this.#easeX(), this.#easeY()];

    this.tick++;
  }

  /**
   * Sets the target position for the wave animation.
   */
  setTarget() {
    this.initialX = this.x;
    this.initialY = this.y;
    this.targetX =
      this.ANCHOR_X + rand(0, this.OPTIONS.range.x * 2) - this.OPTIONS.range.x;
    this.targetY =
      this.#ANCHOR_Y + rand(0, this.OPTIONS.range.y * 2) - this.OPTIONS.range.y;
    this.tick = 0;
    this.animationDuration = rand(
      this.OPTIONS.duration.min,
      this.OPTIONS.duration.max
    );
  }

  #easeX() {
    return ease(
      this.tick,
      this.initialX,
      this.targetX - this.initialX,
      this.animationDuration
    );
  }
  #easeY() {
    return ease(
      this.tick,
      this.initialY,
      this.targetY - this.initialY,
      this.animationDuration
    );
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
}
