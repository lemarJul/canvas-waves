export function euclideanDist(x, x_, y, y_) {
  return Math.sqrt(squareOfDelta(x, x_) + squareOfDelta(y, y_));
}
export function squareOfDelta(n, n_) {
  return Math.pow(n_ - n, 2);
}

export function ease(tick, n, n_, duration) {
  if (tick < 0 || tick > duration) throw new Error("Invalid time value");

  const halfDuration = duration / 2;

  if (tick < halfDuration) {
    const normalizedTime = tick / halfDuration;
    return (n_ / 2) * normalizedTime * normalizedTime + n;
  } else {
    const normalizedTime = (tick - halfDuration) / halfDuration;
    return (-n_ / 2) * (normalizedTime * (normalizedTime - 2) - 1) + n;
  }
}

//utils
export function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function loop(...callbacks) {
  const loopID = window.requestAnimFrame(() => loop(...callbacks));
  try {
    callbacks.forEach((cb) => {
      cb();
    });
  } catch (e) {
    console.error(e, "loop error");
    window.cancelAnimationFrame(loopID);
  }
}

export function setupAnimationFrame() {
  window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (a) {
      window.setTimeout(a, 1000 / 60);
    };
}
