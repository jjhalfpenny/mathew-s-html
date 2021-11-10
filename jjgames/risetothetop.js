let score = 0
let dead = false
let lives = 5
let died = false
class dodger{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:400,y:555}
        this.speed={x:0,y:0}
        this.size=50
        this.maxSpeed=6
    }
    draw(ctx){
        ctx.fillStyle = '#000000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
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
        if(this.position.y == 0){
            score = score + 1
            this.position.y = 555
            console.log('your score is',score)
        }
        if(this.position.y > 555){
            this.position.y = 555
        }
        if(this.position.x > 75){
        }
    }

}
class Handler{
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
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
    constructor(gameheight,gamewidth,posy,posx){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:posx,y:posy}
        this.speed={x:10,y:0}
        this.size=50
        this.maxSpeed=10
    }
    draw(ctx){
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size,this.maxSpeed)
    }
    update() {
        if(this.position.x + this.size>this.gameheight||this.position.x<0){
            this.speed.x = -this.speed.x
        }
        if(dodger.position.y - dodger.size < this.position.y){
            if(this.position.y < dodger.position.y + dodger.size){
                if(dodger.position.x - dodger.size < this.position.x){
                    if(this.position.x < dodger.position.x + dodger.size){
                        dead=true
                        lives = lives - 1
                        dodger.position.y = 555
                        console.log(lives,'lives left')
                    }
                }
            }
        }
        this.position.y+=this.speed.y
        this.position.x+=this.speed.x
    }
}
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600
dodger = new dodger(GAME_WIDTH,GAME_HEIGHT)
ball1 = new ball(GAME_WIDTH,GAME_HEIGHT,100,Math.floor((Math.random() * 755) + 1))
ball2 = new ball(GAME_WIDTH,GAME_HEIGHT,200,Math.floor((Math.random() * 755) + 1))
ball3 = new ball(GAME_WIDTH,GAME_HEIGHT,300,Math.floor((Math.random() * 755) + 1))
ball4 = new ball(GAME_WIDTH,GAME_HEIGHT,400,Math.floor((Math.random() * 755) + 1))
ball5 = new ball(GAME_WIDTH,GAME_HEIGHT,500,Math.floor((Math.random() * 755) + 1))

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
    if (lives == 0){
        died = true
    }
    if(!died){
        requestAnimationFrame(gameloop)
    }
    if(died){
        console.log('your score is', score )
    }
}
requestAnimationFrame(gameloop)