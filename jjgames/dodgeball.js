let score = 0
class dodger{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:0,y:0}
        this.speed={x:0,y:0}
        this.size=50
        this.maxSpeed=10
    }
    draw(ctx){
        ctx.fillStyle = '#000000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    moveLeft(){
        this.speed.x = -this.maxSpeed
    }
    moveRight(){
        this.speed.x = this.maxSpeed
    }
    moveup(){
        this.speed.y = -this.maxSpeed
    }
    movedown(){
        this.speed.y = this.maxSpeed
    }
    stopx(){
        this.speed.x=0;
    }
    stopy(){
        this.speed.y=0
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.size > 800) this.position.x = 800 - this.size;
        if(this.position.y<0) this.position.y=0;
        if(this.position.y + this.size > 600) this.position.y = 600 - this.size;
        if(this.position.x > 75){
            score = score + 1
        }
    }

}
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger.moveLeft()
                    break;
                case 39:
                    dodger.moveRight()
                    break;
                case 38:
                    dodger.moveup()
                    break
                case 40:
                    dodger.movedown()
                    break
            

            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    if(dodger.speed.x<0){
                        dodger.stopx()
                    }
                    break
                case 39:
                    if(dodger.speed.x>0){
                        dodger.stopx()
                    }
                    break;
                case 38:
                    if(dodger.speed.y<0){
                        dodger.stopy()
                    }
                    break
                
                case 40:
                    if(dodger.speed.y>0){
                        dodger.stopy()
                    }
                    break
                

            }
        });

    }
}
class ball{
    constructor(gameheight,gamewidth,pos,sped,refall){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:pos,y:0}
        this.speed={x:0,y:sped}
        this.size=50
        this.refall=refall
        this.maxSpeed=10
    }
    draw(ctx){
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size,this.maxSpeed)
    }
    update() {
        if(this.position.y + this.size>this.gamewidth||this.position.y<0){
            this.position.y = this.refall
        }
        if(dodger.position.y - dodger.size < this.position.y){
            if(this.position.y < dodger.position.y + dodger.size){
                if(dodger.position.x - dodger.size < this.position.x){
                    if(this.position.x < dodger.position.x + dodger.size){
                        console.log('your dead ha!!!!!!!!')
                        dead=true
                    }
                }
            }
        }
        this.position.y+=this.speed.y
        this.position.x+=this.speed.x
    }

}
let dead=false
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600

dodger = new dodger(GAME_WIDTH,GAME_HEIGHT)
ball1 = new ball(GAME_WIDTH,GAME_HEIGHT,75,-8,555)
ball2 = new ball(GAME_WIDTH,GAME_HEIGHT,150,8,0)
ball3 = new ball(GAME_WIDTH,GAME_HEIGHT,300,8,0)
ball4 = new ball(GAME_WIDTH,GAME_HEIGHT,450,8,0)
ball5 = new ball(GAME_WIDTH,GAME_HEIGHT,600,8,0)
ball6 = new ball(GAME_WIDTH,GAME_HEIGHT,750,8,0)
ball7 = new ball(GAME_WIDTH,GAME_HEIGHT,225,-8,555)
ball8 = new ball(GAME_WIDTH,GAME_HEIGHT,375,-8,555)
ball9 = new ball(GAME_WIDTH,GAME_HEIGHT,525,-8,555)
ball10 = new ball(GAME_WIDTH,GAME_HEIGHT,675,-8,555)

new Handler(dodger);

let lastTime = 0
dodger.draw(ctx)

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    dodger.update(deltaTime);
    dodger.draw(ctx);
    ball1.draw(ctx)
    ball1.update()
    ball2.draw(ctx)
    ball2.update()
    ball3.draw(ctx)
    ball3.update()
    ball4.draw(ctx)
    ball4.update()
    ball5.draw(ctx)
    ball5.update()
    ball6.draw(ctx)
    ball6.update()
    ball7.draw(ctx)
    ball7.update()
    ball8.draw(ctx)
    ball8.update()
    ball9.draw(ctx)
    ball9.update()
    ball10.draw(ctx)
    ball10.update()
    if(!dead){
        requestAnimationFrame(gameloop)
    }
    if(dead){
        console.log('your score is', score )
    }
}
requestAnimationFrame(gameloop)