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
    let W = ctx.canvas.clientWidth
    let x 
    let point=[]
    for (x = -W/2; x < W/2; x+=n) {
        let y=eval(f)
        point.push([x,y])
    }
    return point
  }
}
export default Graph;
