import Vector from "./vector.js";

class Ball {
  // pos;
  // vel;
  static count = 0;
  static randomBall(ctx){
    const W = ctx.canvas.clientWidth/2;
    const H = ctx.canvas.clientHeight/2;
    return new Ball(5,Vector.randomVector(W,H),Vector.randomVector(W/20,H/20),Vector.randomVector(1,1))
  }
  constructor(r = 5, pos =new Vector(), vel =new Vector(), acc=new Vector()) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.r = r;
    this.name = Ball.count++
  }
  show(ctx) {
    let a = ctx.canvas.clientWidth/2
    let b = ctx.canvas.clientHeight/2
    ctx.beginPath();
    this.pos.draw(ctx, [a, b]);
    this.vel.draw(ctx, this.pos.tip(), "", 4);
    this.acc.draw(ctx, this.pos.tip(), "", 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.pos.x + a, this.pos.y + b, this.r, 0, Math.PI * 2, true);
    ctx.fill();
  }
  draw(ctx) {
    let a = ctx.canvas.clientWidth/2
    let b = ctx.canvas.clientHeight/2
    let sidex = this.pos.x + a + this.r;
    let sidey = this.pos.y + b + this.r;
    const W = ctx.canvas.clientWidth;
    const H = ctx.canvas.clientHeight;
    // let sidex=this.pos.x+a+this.r
    // let sidey=this.pos.y+b+this.r
    if (sidex - 2 * this.r <= 0 || sidex > W)
      this.vel.x = -this.vel.x - this.acc.x;
    if (sidey - 2 * this.r <= 0 || sidey > H)
      this.vel.y = -this.vel.y - this.acc.y;
    ctx.beginPath();
    ctx.arc(this.pos.x + a, this.pos.y + b, this.r, 0, Math.PI * 2, true);
    ctx.fill();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  drawDetail(ctx) {
    this.show(ctx);
    this.draw(ctx);
  }
  controles(ctx) {
    let c =['x','y','vx','vy','ax','ay']
    let all= c.map(v=>{
        const W = ctx.canvas.clientWidth;
        const H = ctx.canvas.clientHeight;
        let div = document.createElement('div')
        let lable = document.createElement('label')
        let slider = document.createElement('input')
        slider.id=v
        lable.htmlFor=v
        slider.type='range'
        if (v == "x"){
          slider.value=(this.pos.x+W/2)*100/W
          lable.innerHTML+=v+' = '+this.pos.x
        } 
        if (v== "y"){
          slider.value=(-this.pos.y+H/2)*100/H
          lable.innerHTML+=v+' = '+-this.pos.y
        } 
        if (v == "vx"){
          slider.value=(this.vel.x+W/2)*100/W
          lable.innerHTML+=v+' = '+this.vel.x
        } 
        if (v == "vy"){
          slider.value=(-this.vel.y+H/2)*100/H
          lable.innerHTML+=v+' = '+-this.vel.y
        }      
        if (v == "ax"){
          slider.value=(this.acc.x+W/2)*100/W
          lable.innerHTML+=v+' = '+this.acc.x
        } 
        if (v == "ay"){
          slider.value=(-this.acc.y+H/2)*100/H
          lable.innerHTML+=v+' = '+-this.acc.y
        } 
        slider.addEventListener('input',(e)=>{
            this.update(slider,ctx,lable)
        })
        div.appendChild(lable)
        div.appendChild(slider)
        return div
    })
    return all
  }
  update(e,ctx,lable) {
    const W = ctx.canvas.clientWidth;
    const H = ctx.canvas.clientHeight;
    if (e.id == "x"){
      this.pos.x = (W * e.value) / 100 - W / 2;
      lable.innerHTML=e.id+' = '+this.pos.x
    } 
    if (e.id == "y"){
      this.pos.y =-((H * e.value) / 100 - H / 2);
      lable.innerHTML=e.id+' = '+-this.pos.y
    } 
    // v1 = new Vector(this.pos.x, this.pos.y, "red");
    
    if (e.id == "vx"){
      this.vel.x = (W * e.value) / 100 - W / 2;
      lable.innerHTML=e.id+' = '+this.vel.x
    } 
    if (e.id == "vy"){
      this.vel.y =-((H * e.value) / 100 - H / 2);
      lable.innerHTML=e.id+' = '+-this.vel.y
    } 
    // v2 = new Vector(this.vel.x, this.vel.y, "green");
    
    if (e.id == "ax"){
      this.acc.x = (W * e.value) / 100 - W / 2;
      lable.innerHTML=e.id+' = '+this.acc.x
    } 
    if (e.id == "ay"){
      this.acc.y =-((H * e.value) / 100 - H / 2);
      lable.innerHTML=e.id+' = '+-this.acc.y
    }
    ctx.clearRect(0, 0, W, H);
    this.show(ctx);
  }
}
export default Ball;
