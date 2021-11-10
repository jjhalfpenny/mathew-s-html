let canvas = document.querySelector('canvas');
const gameheight = 600
const gamewidth = 800
const GAME_HEIGHT = 600
const GAME_WIDTH = 800
let dead = false
const centerX = gamewidth / 2;
const centerY = gameheight / 2;
let ctx = canvas.getContext('2d');
let rem = 90*Math.PI/180

class dodger{
    constructor(gamewidth,gameheight,width,height,x,y){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:400,y:300}
        this.speed={x:0,y:0}
        this.size=50
        this.MaxSpeed=10
        this.maxSpeed={x:10,y:10}
        this.angle = 1;
        this.width = width;
        this.height = height;
        this.x=x
        this.y=y
    }
    draw(ctx){
        ctx.save();
        ctx.translate(this.position.x,this.position.y);
        ctx.rotate(rem);
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    rotation1() {
        rem -= 3 * Math.PI / 180
    }
    rotation2() {
        rem += 3 * Math.PI / 180
    }
    moveup(){
        this.speed.y = -this.maxSpeed.y
        this.speed.x = -this.maxSpeed.x
    }
    movedown(){
        this.speed.y = this.maxSpeed.y
        this.speed.x = this.maxSpeed.x
    }
    stopy(){
        this.speed.y=0
    }
    stopx(){
        this.speed.x = 0
    }
    update(deltaTime) {
        if(!deltaTime) return
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.maxSpeed.x=angularmov(rem,this.MaxSpeed,true)
        this.maxSpeed.y=angularmov(rem,this.MaxSpeed,false)
    }

}
class Handler{
    constructor(dodger1) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger1.rotation1()
                    //console.log("rotate left")
                    break;
                case 39:
                    dodger1.rotation2()
                    //console.log('rotate right')
                    break;
                case 38:
                    dodger1.moveup()
                    break
                case 40:
                    dodger1.movedown()
                    break
            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 38:
                    dodger1.stopy()
                    dodger1.stopx()
                    break
                
                case 40:
                    dodger1.stopy()
                    dodger1.stopx()
                    break

            }
        });

    }
}
class ball{
    constructor(gamewidth,gameheight,width, height,x,y){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.width = width;
        this.height = height;
        this.size = 50
        this.angle = 1;
        this.x=x
        this.y=y
        this.mid=this.position-25
        this.position={x:x,y:y}
    }
    rotation() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
}
function angularmov(ang,speed,x){
    rang=ang
    xymot={
        x:0,
        y:0
    }
    xymot.y=speed*Math.sin(rang)
    xymot.x=speed*Math.cos(rang)
    if(x){
        return xymot.x
    }
    else{
        return xymot.y
    }
}
dodger1 = new dodger(GAME_WIDTH,GAME_HEIGHT,50,50,centerX,centerY)
ball1 = new ball(GAME_WIDTH,GAME_HEIGHT,50,50,400,300)
ball2 = new ball(GAME_WIDTH,GAME_HEIGHT,50,50,300,300)

new Handler(dodger1);

let lastTime = 0

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    dodger1.draw(ctx);
    dodger1.update(deltaTime);
    ball1.angle += 1 * Math.PI / 180;
    ball1.rotation();
    ball2.angle += 2 * Math.PI / 180;
    ball2.rotation();
    if(!dead){
        requestAnimationFrame(gameloop)
    }
}
requestAnimationFrame(gameloop)