export default {
  range: {
    // point range
    x: 0,
    y: 500,
  },
  duration: {
    // point duration
    min: 500,
    max: 1500,
  },
  strokeColor: "transparent",
  level: 0.5,
  showPoints: false,
  gradient: {
    startColor: () => `hsla(${Date.now() / 400}, 100%, 50%, .2)`,
    endColor: () => `hsla(${-Date.now() / 400}, 100%, 50%, .8)`,
  },
};
