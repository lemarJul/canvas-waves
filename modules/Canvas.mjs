import { setupAnimationFrame } from "./utils.mjs";

export function initCanvas(canvas) {
  setupAnimationFrame();
  // canvas setup
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx2D = canvas.getContext("2d");

  ctx2D.lineToBottomRight = function () {
    this.lineTo(this.canvas.width, this.canvas.height);
  };
  ctx2D.lineToBottomLeft = function () {
    this.lineTo(0, this.canvas.height);
  };
  ctx2D.lineToTopRight = function () {
    this.lineTo(this.canvas.width, 0);
  };
  ctx2D.lineToTopLeft = function () {
    this.lineTo(0, 0);
  };
  // canvas setup
  ctx2D.draw = function draw(...drawables) {
    drawables.forEach((d) => {
      ctx2D.restore();
      ctx2D.save();
      d.draw(ctx2D);
    });
    return this;
  };
  ctx2D.clear = function clear() {
    ctx2D.clearRect(0, 0, canvas.width, canvas.height);
    return this;
  };
  canvas.xAtRatio = function xAtRatio(ratio) {
    const clampedRatio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;
    return this.width * clampedRatio;
  };
  canvas.yAtRatio = function yAtRatio(ratio) {
    ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;
    return this.height * ratio;
  };
  return [canvas, ctx2D];
}
