import Point from "./Point.mjs";

export default class Wave extends Array {
  constructor(
    startPoint,
    endPoint,
    nPoints,
    {
      range = {
        x: 0,
        y: 100,
      },
      duration = {
        max: 1000,
        min: 500,
      },
      fillStyle = "rgba(255, 255, 255, .9)",
      showPoints = false,
      strokeColor = "transparent",
    } = {}
  ) {
    super(nPoints + 2);
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.nPoints = nPoints;
    this.width = endPoint.x - startPoint.x;
    this.height = endPoint.y - startPoint.y;
    this.spacing = this.width / (nPoints + 1);
    this.fillStyle = fillStyle;
    this.showPoints = showPoints;
    this.strokeColor = strokeColor

    this.fill(null).forEach((_, i) => {
      const coord = {
        x: startPoint.x + this.spacing * i,
        y: startPoint.y + (this.height / (nPoints + 1)) * i,
      };
      const options = {
        range: { x: i == 0 || i == this.length - 1 ? 0 : range.x, y: range.y },
        duration,
      };
      this[i] = new Point(coord, options);
    });
  }
  update() {
    this.forEach((point) => {
      point.update();
    });
    return this;
  }
  getHighestY() {
    return this.reduce(
      (highest, point) => (point.y < highest ? point.y : highest),
      Infinity
    );
  }
  _drawCurves(ctx) {
    this.forEach((point, i) => {
      const hasNext = () => this.length > i + 1;
      const next = () => this[i + 1];

      if (!hasNext()) return ctx.lineTo(point.x, point.y);
      ctx.quadraticCurveTo(point.x, point.y, ...averageXY(point, next()));

      function averageXY({ x, y }, { x: x_, y: y_ }) {
        return [(x + x_) / 2, (y + y_) / 2];
      }
    });
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.lineJoin = "round";

    // ctx.lineWidth = OPTIONS.thickness; //Todo: => wave option  /
    ctx.strokeStyle = this.strokeColor; //Todo: => wave option  /

    this._drawCurves(ctx);

    ctx.lineToBottomRight();
    ctx.lineToBottomLeft();

    // const gradient = ctx.createLinearGradient(
    //   0,
    //   canvas.height,
    //   0,
    //   points.getHighestY()
    // );

    // [OPTIONS.gradient.startColor(), OPTIONS.gradient.endColor()].forEach(
    //   (color, i) => {
    //     gradient.addColorStop(i, color);
    //   }
    // );
    ctx.fillStyle = this.fillStyle;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    if (this.showPoints) this.forEach((p) => p.draw(ctx));
  }
}

function WaveOLD(OPTIONS, canvas, nPoints) {
  //points setup
  const fillStyle = "white";
  const points = [];
  const width = canvas.width;
  points.init = function init() {
    // create points
    const spacing = (width + OPTIONS.range.x * 2) / (nPoints - 1);

    Array(nPoints)
      .fill()
      .map((_, i) => {
        points.push(
          new Point(
            {
              x: spacing * i,
              y: canvas.height - canvas.height * OPTIONS.level,
            },
            OPTIONS
          )
        );
      });

    return this;
  };
  points.firstPointXY = () => points[0].coords;
  points.update = function () {
    this.forEach((p) => {
      p.update();
    });
    return this;
  };
  points.getHighestY = function getHighestY() {
    return this.reduce((acc, p) => (p.y < acc ? p.y : acc), Infinity);
  };
  points._drawCurves = (ctx) => {
    points.forEach((p, i) => {
      if (!hasNext()) return ctx.lineTo(p.x, p.y);
      ctx.quadraticCurveTo(p.x, p.y, ...averageXY(p, next()));

      function averageXY({ x, y }, { x: x_, y: y_ }) {
        return [(x + x_) / 2, (y + y_) / 2];
      }
      function next() {
        return points[i + 1];
      }
      function hasNext() {
        return points.length > i + 1;
      }
    });
  };

  points.draw = function draw(ctx) {
    ctx.beginPath();

    this._drawCurves(ctx);

    ctx.lineToBottomRight();
    ctx.lineToBottomLeft();

    const gradient = ctx.createLinearGradient(
      0,
      canvas.height,
      0,
      points.getHighestY()
    );

    [OPTIONS.gradient.startColor(), OPTIONS.gradient.endColor()].forEach(
      (color, i) => {
        gradient.addColorStop(i, color);
      }
    );
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    if (OPTIONS.showPoints) points.forEach((p) => p.draw(ctx));
  };

  return points.init();
}
