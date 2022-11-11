import Vector from "./vector.js";
import Ball from "./ball.js";
class Graph {
  t = 0;
  constructor(c = "black") {
    this.c = c;
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
        // console.log((isNaN(y)));

        y= isNaN(y)?0:y
        y= y==Infinity?0:y
        y= typeof(y)==="number"?y:0
        point.push([x, y]);
      } catch (e) {
        console.log(e);
        point.push([x,0]);
      }
    }
    return point;
  }
}
export default Graph;
