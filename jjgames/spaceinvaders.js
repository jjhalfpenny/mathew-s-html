let bullets = []
let lasers = []
let ballhit = 0
let score = 0
let dead=false
let timer = 0
let timery = 0
class dodger{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:350,y:50}
        this.speed={x:0,y:0}
        this.size=50
        this.maxSpeed=7
    }
    draw(ctx){
        ctx.fillStyle = '#000000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
    moveRight(){
        this.speed.x = this.maxSpeed
    }
    moveLeft(){
        this.speed.x = -this.maxSpeed
    }
    shoot(){
        score = score - 5
        let new_bullet = new Bullet(GAME_WIDTH,GAME_HEIGHT,0,10)
        bullets.push(new_bullet)
    }
    stopx(){
        this.speed.x=0;
    }
    stopy(){
        this.speed.y=0
    }
    update(deltaTime) {
        lasers.forEach(laser => {
            if(this.position.y < laser.position.y){
                if(laser.position.y < this.position.y + this.size){
                    if(this.position.x < laser.position.x){
                        if(laser.position.x < this.position.x + this.size){
                            dead = true
                        }
                    }
                }
            }
        })
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if(!deltaTime);
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.size > 800) this.position.x = 800 - this.size;
        if(this.position.y<0) this.position.y=0;
    }

}
class Bullet{
    constructor(gamewidth,gameheight,x,y){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.speed = {
            x:x,
            y:y
        }
        this.width=10;
        this.height=10;
        this.position = {
            x:(dodger.position.x + (dodger.size/2)),
            y:(dodger.position.y + (dodger.size/2))
        }
    }
    draw(ctx){
        
        ctx.fillStyle = '#000000'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        this.position.y += this.speed.y;
        this.position.x += this.speed.x;
        
    }
}
class Handler{
    constructor() {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger.moveLeft()
                    break
                case 39:
                    dodger.moveRight()
                    break
                case 32:
                    dodger.shoot()
                    break
            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    if(dodger.speed.x < 0)
                        dodger.stopx()
                    break
                
                case 39:
                    if(dodger.speed.x > 0)
                        dodger.stopx()
                    break              

            }
        });

    }
}
class ball{
    constructor(gameheight,gamewidth,posx){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:posx,y:550}
        this.speed={x:0,y:0}
        this.size=50
        this.rem=50
        this.maxSpeed=10
    }
    draw(ctx){
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size,this.maxSpeed)
    }
    cannon(){
        let new_laser = new laser(GAME_WIDTH,GAME_HEIGHT,0,-10)
        lasers.push(new_laser)
    }
    update() {
        if(this.position.x + this.size>this.gameheight){
            if(this.rem % 2 == 0){
                this.position.y -= 50
                this.rem = this.rem + 1
            }
        }
        if(this.position.x < 0){
            if(this.rem % 2 == 1){
                this.rem = this.rem + 1
                this.position.y -=50
            }
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
        bullets.forEach(bullet => {
            if(this.position.y < bullet.position.y){
                if(bullet.position.y < this.position.y + this.size){
                    if(this.position.x < bullet.position.x){
                        if(bullet.position.x < this.position.x + this.size){
                            console.log('wel gedaan')
                            ballhit = ballhit + 1
                            score = score + 20
                            this.position.y = 550
                            this.position.x = Math.floor((Math.random() * 750) + 1)
                        }
                    }
                }
            }
        })
        if(this.speed < 8){
            if(this.speed > -8){
            this.speed.x = Math.floor((Math.random() * 10) + -10)
            this.speed.y = Math.floor((Math.random() * 10) + -10)
            }
        }

        if(timer % 30 == 0){
            if(this.rem % 2 == 0){
                this.position.x+=50
            }
        }
        if(timer % 30 == 0){
            if(this.rem % 2 == 1){
                this.position.x-=50
            }
        }
        if(timery == Math.floor((Math.random() * 35) + 1)){
            this.cannon()
        }
        this.position.y+=this.speed.y
        this.position.x+=this.speed.x
    }

}
class laser{
    constructor(gamewidth,gameheight,x,y){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.speed = {
            x:x,
            y:y
        }
        this.width=10;
        this.height=10;
        this.ranum = Math.floor((Math.random() * 8) + 1)
        if(this.ranum == 1){
            this.position = {
                x:(ball1.position.x + (ball1.size/2)),
                y:(ball1.position.y + (ball1.size/2))
            }
        }
        if(this.ranum == 2){
            this.position = {
                x:(ball2.position.x + (ball2.size/2)),
                y:(ball2.position.y + (ball2.size/2))
            }
        }
        if(this.ranum == 3){
            this.position = {
                x:(ball3.position.x + (ball3.size/2)),
                y:(ball3.position.y + (ball3.size/2))
            }
        }
        if(this.ranum == 4){
            this.position = {
                x:(ball4.position.x + (ball4.size/2)),
                y:(ball4.position.y + (ball4.size/2))
            }
        }
        if(this.ranum == 5){
            this.position = {
                x:(ball5.position.x + (ball5.size/2)),
                y:(ball5.position.y + (ball5.size/2))
            }
        }
        if(this.ranum == 6){
            this.position = {
                x:(ball6.position.x + (ball6.size/2)),
                y:(ball6.position.y + (ball6.size/2))
            }
        }
        if(this.ranum == 7){
            this.position = {
                x:(ball7.position.x + (ball7.size/2)),
                y:(ball7.position.y + (ball7.size/2))
            }
        }
        if(this.ranum == 8){
            this.position = {
                x:(ball8.position.x + (ball8.size/2)),
                y:(ball8.position.y + (ball8.size/2))
            }
        }
    }
    draw(ctx){
        ctx.fillStyle = '#00FF00'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        this.position.y += this.speed.y;
        this.position.x += this.speed.x;
        
    }
}
new Handler(dodger);

let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600

dodger = new dodger(GAME_WIDTH,GAME_HEIGHT)
ball1 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 20) + -20))
ball2 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 20) + -20))
ball3 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 20) + -20))
ball4 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 20) + -20))
ball5 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 20) + -20))
ball6 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 20) + -20))
ball7 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 20) + -20))
ball8 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 20) + -20))

dodger.draw(ctx)
let lastTime = 0

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
    timer = timer + 1
    timery = timery + 1
    if(timery > 35){
        timery = 0
    }
    bullets.forEach(element => {
        element.update()
        element.draw(ctx)
    })
    lasers.forEach(element => {
        element.update()
        element.draw(ctx)
    })
    if(!dead){
        requestAnimationFrame(gameloop)
    }
    if(dead){
        console.log('your score is',score)
        console.log('you destroyed',ballhit,'alien space ships')
    }
}
requestAnimationFrame(gameloop)