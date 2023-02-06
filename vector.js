class Vector {
    x = 0;
    y = 0;
    a = 0;
    b = 0;
    MagOptions={is:false,direction:'MID'};
    constructor(x=0, y=0, c='black') {
        this.x = x
        this.y = -y
        this.color = c
    }
    static randomVector(w,h,c){
        let x =Math.floor(Math.random()*2*w-w)
        let y =Math.floor(Math.random()*2*h-h)
        return new Vector(x,y,c)
    }
    static add(...v) {
        // console.log(v.reduce((a,b)=>[a[0]+b.x,a[1]-b.y],[0,0]));
        return new Vector(...v.reduce((a, b) => [a[0] + b.x, a[1] - b.y], [0, 0]), 'black');
    }
    static mult(v,n) {
        return new Vector(v.x*n,v.y*n)
    }
    mult(n){
        this.x*=n
        this.y*=n
    }
    setMag(n){
        this.x = this.x*n/this.mag()
        this.y = this.y*n/this.mag()
    }
    tip() {
        return [this.x + this.a, this.y + this.b]
    }
    draw(ctx, [a, b], l = 1) {
        this.a = a
        this.b = b
        ctx.beginPath();
        ctx.moveTo(this.a, this.b)
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color;
        let [x,y]=[this.x * l + this.a, this.y * l + this.b]
        ctx.lineTo(x,y)
        ctx.arc(x,y, 2, 0, Math.PI * 2, true);
        ctx.stroke();
        if(this.MagOptions.is)
        ctx.fillText(this.mag().toFixed(2), x+2,y+2, 50);
    }
    drawCut(ctx, [a, b],scale=10){
        let mag=this.mag()
        this.setMag(scale)
        this.draw(ctx, [a, b])
        for (let i = 0; i < mag; i++) {
            [a,b]=this.tip()
            this.draw(ctx, [a, b])
        }
    }
    drawDetail(ctx, [a, b]) {
        this.draw(ctx, [a, b])
        ctx.beginPath();
        ctx.moveTo(this.a, this.b)
        ctx.strokeStyle = "grey"
        ctx.lineTo(this.x + this.a, this.b)
        ctx.lineTo(this.x + this.a, this.y + this.b)
        ctx.stroke();
    }
    add(v) {
        this.x += v.x
        this.y += v.y
    }
    sub(v) {
        this.x -= v.x
        this.y -= v.y
    }
    static subtract(v1,v2){
        return new Vector(v1.x-v2.x,-v1.y+v2.y);
    }
    mag(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }
}
export default Vector