import Vector from "./vector.js";
function map(real_min, real_max, target_min, target_max, value) {
  return (
    target_min +
    ((value - real_min) * (target_max - target_min)) / (real_max - real_min)
  );
}
class Graph {
  t = 0;
  xScale;
  yScale;
  options = {};
  max = 10;
  constructor(
    ctx,
    {
      axisColor = "white",
      functionColor = "red",
      backgroundColor = "black",
      showVals = false,
    } = {}
  ) {
    let W = ctx.canvas.clientWidth;
    let H = ctx.canvas.clientHeight;
    this.options.axisColor = axisColor;
    this.options.functionColor = functionColor;
    this.options.backgroundColor = backgroundColor;
    this.options.showVals = showVals;
    this.origin = [W / 2, H / 2];
    this.clear(ctx)
  }
  drawAxis(ctx, x = 10, y = 10) {
    let O = this.origin;
    let [W, H] = O.map((a) => a * 2);
    this.xScale = W / 2 / x;
    this.yScale = H / 2 / y;
    let A = this.options.axisColor;
    new Vector(W / 2, 0, A).drawCut(ctx, O, this.xScale);
    new Vector(-W / 2, 0, A).drawCut(ctx, O, this.xScale);
    new Vector(0, H / 2, A).drawCut(ctx, O, this.yScale);
    new Vector(0, -H / 2, A).drawCut(ctx, O, this.yScale);
  }
  drawGrid(ctx, x = 10, y = 10) {
    let O = this.origin;
    let [W, H] = O.map((a) => a * 2);
    this.xScale = W / 2 / x;
    this.yScale = H / 2 / y;
    let A = this.options.axisColor;
    for (let i = 0; i < W; i += this.xScale) {
      new Vector(0, H, "#202124").draw(ctx, [i, H], this.xScale);
    }
    for (let i = 0; i < H; i += this.yScale) {
      new Vector(W, 0, "#202124").draw(ctx, [0, i], this.yScale);
    }
  }
  clear(ctx) {
    ctx.fillStyle = this.options.backgroundColor;
    ctx.fillRect(0, 0, ...this.origin.map((a) => a * 2));
  }
  draw(ctx, f) {
    let [W, H] = this.origin.map((a) => a * 2);
    if (f > this.max) {
      this.max = f;
    }
    this.v = new Vector(
      0,
      map(-this.max, this.max, -H / 2, H / 2, f),
      this.options.functionColor
    );
    this.v.draw(ctx, [this.t, H / 2]);
    this.t++;
    if (this.t > W) {
      this.clear(ctx);
      this.t = 0;
    }
  }
  static getPoints(ctx, f, xScale, yScale) {
    let [W, H] = [ctx.canvas.clientWidth,ctx.canvas.clientHeight];
    let point = [];
    for (let X = -W / 2; X < W / 2; X++) {
      try {
        let x = (X * 2 * xScale) / W;
        let y = eval(f);
        if (!isNaN(y) && y != Infinity && typeof y === "number") {
          point.push([X, (y * H) / 2 / yScale, ""]);
        } else {
          point.push([X, 0, "error"]);
        }
      } catch (e) {
        point.push([X, 0, "error"]);
      }
    }
    // console.log(point);
    return point;
  }
}
class DescreteGraph extends Graph {
  drawfunction(ctx, f) {
    let [W, H] = this.origin.map((a) => a * 2);
    let max = W / (2 * this.xScale);
    let x = -max;
    // console.log(x, this.xScale);
    while (x < max) {
      let y = eval(f);
      if (!isNaN(y) && typeof y === "number") {
        let v = new Vector(0, y, this.options.functionColor);
        v.MagOptions.is = this.options.showVals;
        v.draw(ctx, [W / 2 + x * this.xScale, H / 2], this.yScale);
      }
      x++;
    }
  }
  animatefunction(ctx, f, time = 50) {
    let [W, H] = this.origin.map((a) => a * 2);
    let x = -W / (2 * this.xScale);
    time *= 1000; //coverting to miliseconds
    let speed = time / (W / this.xScale);
    let anime = setInterval(() => {
      let y = eval(f);
      if (!isNaN(y) && typeof y === "number") {
        let v = new Vector(0, y, this.options.functionColor);
        v.MagOptions.is = this.options.showVals;
        v.draw(ctx, [W / 2 + x * this.xScale, H / 2], this.yScale);
      }
      x++;
      if (x > W / (2 * this.xScale)) {
        // console.log(speed * x * 2);
        clearInterval(anime);
      }
    }, speed);
  }
}
class ContinuousGraph extends Graph {
  mode = "point";
  drawfunction(ctx, f) {
    let [W, H] = this.origin.map((a) => a * 2);
    let max = W / 2;
    let X = -max;
    // console.log(x, this.xScale);
    while (X < max) {
      let x = X / this.xScale;
      let y = eval(f);
      if (!isNaN(y) && typeof y === "number") {
        let v = new Vector(0, y, this.options.functionColor);
        if (this.mode == "point") {
          v.drawPoint(ctx, [W / 2 + X, H / 2], this.yScale);
        } else if (this.mode == "fill") {
          v.draw(ctx, [W / 2 + X, H / 2], this.yScale);
        }
      }
      X++;
    }
  }
  animatefunction(ctx, f) {
    let [W, H] = this.origin.map((a) => a * 2);
    let X = -W / 2;
    let anime = setInterval(() => {
      let x = X / this.xScale;
      let y = eval(f);
      if (!isNaN(y) && typeof y === "number") {
        let v = new Vector(0, y, this.options.functionColor);
        if (this.mode == "point") {
          v.drawPoint(ctx, [W / 2 + X, H / 2], this.yScale);
        } else if (this.mode == "fill") {
          v.draw(ctx, [W / 2 + X, H / 2], this.yScale);
        }
      }
      X++;
      if (X > W / 2) {
        // console.log(speed * x * 2);
        clearInterval(anime);
      }
    }, 1);
  }
}

export { Graph, DescreteGraph, ContinuousGraph };
