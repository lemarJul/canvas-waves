import Wave from "./modules/Wave.mjs";
import { initCanvas } from "./modules/Canvas.mjs";
import { loop } from "./modules/utils.mjs";
import animConfig from "./anim.config.mjs";
// import initDialog from "./dialog.mjs";
//wave options

const [canvas, ctx2D] = initCanvas(document.getElementById("c"));
const wavesConfig = [
  { x: 0, y: canvas.yAtRatio(animConfig.level) },
  { x: canvas.width, y: canvas.yAtRatio(animConfig.level) },
  4,
  animConfig,
];
const waveCollection = Array(3)
  .fill(null)
  .map((w, i) => new Wave(...wavesConfig));

loop(() => {
  ctx2D.clear();
  waveCollection.forEach(
    (wave) =>
      (wave.fillStyle = gradient(
        wave,
        ctx2D,
        animConfig.gradient.startColor(),
        animConfig.gradient.endColor()
      ))
  );

  ctx2D.draw(...waveCollection.map((w) => w.update()));
});

function gradient(wave, ctx2D, ...colors) {
  const gradient = ctx2D.createLinearGradient(
    0,
    ctx2D.canvas.height,
    0,
    wave.getHighestY()
  );

  colors.forEach((color, i) => {
    gradient.addColorStop(i, color);
  });

  return gradient;
}
