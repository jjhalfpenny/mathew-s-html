let gravity = 0
let accel = 0
let counter = gravity
let county = 0
let rememmber = 0
let grav = 0.1
class Handler{
    constructor(ball) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 32:
                    ball.jump()
                    break
                case 39:
                    ball.gravup()
                    break
                case 37:
                    ball.gravdo()
                    break
            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 32:
                    ball.rel(grav)
                    break
            }
        });
    }
}
class ball{
    constructor(gameheight,gamewidth){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:355,y: 550}
        this.speed={x:0,y:0}
        this.size=50
    }
    draw(ctx){
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size,this.maxSpeed)
    }
    jump(){
        if(gravity < 0){
            accel = -5
        }
        if(gravity >= 0){
            accel = 5
        }
        gravity = grav

    }
    update() {
        if(gravity >= 0){
            if(this.position.y < 0){
                this.speed.y = 2
                accel = 0
            }
            if(this.position.y + this.size>GAME_HEIGHT + accel){
                accel = 0 
                this.position.x+= 0
                this.position.y = 550
            }
        }
        if(gravity > 0){
            county = 0
            if(this.position.y < 0){
                this.speed.y = 2
                accel = 0
            }
            if(this.position.y + this.size>GAME_HEIGHT + accel){
                accel = 0 
                this.position.x+= 0
                this.position.y = 550
            }
        }
        if(gravity < 0){
            if(this.position.y + this.size>GAME_HEIGHT + -accel){
                accel = 0 
                this.position.x+= 0
                this.position.y = 550
            }
        }
        gravity = grav
        accel -= gravity
        this.speed.y = -accel
        this.position.y+=this.speed.y
        this.position.x+=this.speed.x
        console.log(Math.round(gravity * 10));
        county = 0
        if(gravity < 0){
            if(this.position.y < 0){
                this.position.y = 0
                this.speed.y = 1
            }
        }
    }

    rel(){
    }
    gravup(){
        grav = grav + 0.1
    }
    gravdo(){
        grav = grav - 0.1
    }
}

let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600

ball1 = new ball(GAME_WIDTH,GAME_HEIGHT)

let lastTime = 0
new Handler(ball1)

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    ball1.draw(ctx)
    ball1.update()
    requestAnimationFrame(gameloop)
}
requestAnimationFrame(gameloop)