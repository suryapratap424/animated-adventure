import Vector from "./vector.js";
class Phasor{
    t=0
    constructor(A=1,phi = 0 ,rpm=1,c='black'){
        this.phi = phi*Math.PI/180
        this.A=A
        this.w=rpm/60
        this.c=c
        // this.v = new Vector(A*Math.cos(w*this.t+phi),A*Math.sin(w*this.t+phi))
    }
    static add(...p) {
        return new Vector(...p.reduce((a, b) => [a[0] + b.v.x, a[1] - b.v.y], [0, 0]), 'black');
    }
    draw(ctx,[a,b]){
        let theta = this.w*this.t+this.phi
        this.v = new Vector(this.A*Math.cos(theta),this.A*Math.sin(theta),this.c)
        this.v.draw(ctx,[a,b])
        this.t++
    }
    tip(){
        return this.v.tip()
    }
}
export default Phasor