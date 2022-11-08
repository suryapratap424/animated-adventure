import Vector from "./vector.js";
class Graph{
    t=0
    constructor(c='black'){
        this.c=c
    }
    draw(f,ctx){
        this.v = new Vector(0,f,this.c)
        this.v.draw(ctx,[this.t,ctx.canvas.clientHeight/2])
        this.t++
    }
}
export default Graph