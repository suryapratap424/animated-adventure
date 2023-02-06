import Vector from "./vector.js";
class Graph {
  t = 0;
  xScale;
  yScale;
  options = {};
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
    ctx.fillStyle = this.options.backgroundColor;
    ctx.fillRect(0, 0, W, H);
    // console.log(this.options);
  }
  drawAxis(ctx, x = 10, y = 10) {
    let O = this.origin;
    let [W, H] = O.map((a) => a * 2);
    this.xScale = W / x;
    this.yScale = H / y;
    let A = this.options.axisColor;
    new Vector(W / 2, 0, A).drawCut(ctx, O, this.xScale);
    new Vector(-W / 2, 0, A).drawCut(ctx, O, this.xScale);
    new Vector(0, H / 2, A).drawCut(ctx, O, this.yScale);
    new Vector(0, -H / 2, A).drawCut(ctx, O, this.yScale);
  }
  clear(ctx){
    ctx.fillStyle = this.options.backgroundColor;
    ctx.fillRect(0, 0, ...this.origin.map((a) => a * 2));
  }
  draw(ctx, f) {
    // this.t=ctx.canvas.clientWidth/2
    this.v = new Vector(0, f, this.c);
    this.v.draw(ctx, [this.t, ctx.canvas.clientHeight / 2]);
    this.t++;
  }
  static getPoints(ctx, f, n) {
    let W = ctx.canvas.clientWidth;
    let x;
    let point = [];
    for (x = -W / 2; x < W / 2; x += n) {
      try {
        let y = eval(f);
        y = isNaN(y) ? 0 : y;
        y = y == Infinity ? 0 : y;
        y = typeof y === "number" ? y : 0;
        point.push([x, y]);
      } catch (e) {
        // console.log(e);
        point.push([x, 0]);
      }
    }
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
  drawfunction(ctx, f) {
    let [W, H] = this.origin.map((a) => a * 2);
    let max = W/2;
    let X = -max;
    // console.log(x, this.xScale);
    while (X < max) {
      let x=X/this.xScale;
      let y = eval(f);
      if (!isNaN(y) && typeof y === "number") {
        let v = new Vector(0, y, this.options.functionColor);
        v.MagOptions.is = this.options.showVals;
        v.draw(ctx, [W / 2 + X , H / 2], this.yScale);
      }
      X++;
    }
  }
  animatefunction(ctx, f) {
    let [W, H] = this.origin.map((a) => a * 2);
    let X = -W/2;
    let anime = setInterval(() => {
      let x=X/this.xScale;
      let y = eval(f);
      if (!isNaN(y) && typeof y === "number") {
        let v = new Vector(0, y, this.options.functionColor);
        v.MagOptions.is = this.options.showVals;
        v.draw(ctx, [W / 2 + X, H / 2], this.yScale);
      }
      X++;
      if (X > W/2) {
        // console.log(speed * x * 2);
        clearInterval(anime);
      }
    }, 5);
  }
}

export { Graph, DescreteGraph,ContinuousGraph };
