bullets = []
let score = 0
kill = false
let timer = 0
let ballhit = 0
class dodger{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.speed={x:0,y:0}
        this.size=50
        this.maxSpeed=10
        this.position = {
            x: 400,
            y: 300
        }
    }
    draw(ctx){
        if(timer < 50){
            ctx.fillStyle = '#00ff00'
        }
        if(timer > 50){
            ctx.fillStyle = '#000000'
        }
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
    shootu(){
        score -= 7
        let new_bullet = new Bullet(GAME_WIDTH,GAME_HEIGHT,0,-10)
        bullets.push(new_bullet)
    }
    shootd(){
        score -= 7
        let new_bullet = new Bullet(GAME_WIDTH,GAME_HEIGHT,0,10)
        bullets.push(new_bullet)
    }
    shootl(){
        score -= 7
        let new_bullet = new Bullet(GAME_WIDTH,GAME_HEIGHT,-10,0)
        bullets.push(new_bullet)
    }
    shootr(){
        score -= 7
        let new_bullet = new Bullet(GAME_WIDTH,GAME_HEIGHT,10,0)
        bullets.push(new_bullet)
    }
    update(deltaTime) {
        if(!deltaTime) return;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.size > 800) this.position.x = 800 - this.size;
        if(this.position.y<0) this.position.y=0;
        if(this.position.y + this.size > 600) this.position.y = 600 - this.size;
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
    constructor(dodger) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    dodger.moveLeft()
                    //console.log("move left")
                    break;
                case 39:
                    dodger.moveRight()
                    //console.log('move right')
                    break;
                case 87:
                    if(timer > 50){
                        dodger.shootu()
                    }
                    break
                case 65:
                    if(timer > 50){
                        dodger.shootl()
                    }
                    break
                case 68:
                    if(timer > 50){
                        dodger.shootr()
                    }
                    break
                case 83:
                    if(timer > 50){
                        dodger.shootd()
                    }
                    break
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
                    if(dodger.speed.x<0)
                        dodger.stopx()
                        //console.log("stop")
                    break;
                
                case 39:
                    if(dodger.speed.x>0)
                        dodger.stopx()
                        //console.log('stop')
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
    constructor(gameheight,gamewidth,posy,posx,spedx,spedy){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:posx,y:posy}
        this.speed={x:spedx,y:spedy}
        this.size=50
        this.maxSpeed=10
    }
    draw(ctx){
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size,this.maxSpeed)
    }
    update() {
        if(this.position.y + this.size>this.gamewidth||this.position.y<0){
            this.speed.y = -this.speed.y
        }
        if(this.position.x + this.size>this.gameheight||this.position.x<0){
            this.speed.x = -this.speed.x
        }
        if(timer > 50){
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
        }
        bullets.forEach(bullet => {
            if(this.position.y < bullet.position.y){
                if(bullet.position.y < this.position.y + this.size){
                    if(this.position.x < bullet.position.x){
                        if(bullet.position.x < this.position.x + this.size){
                            console.log('otlichno srabotano')
                            score = score + 20
                            kill = true
                            ballhit = ballhit + 1
                        }
                    }
                }
            }
        })
        this.position.y+=this.speed.y
        this.position.x+=this.speed.x
        if(kill == true){
            this.position.y = Math.floor((Math.random() * 555) + 1)
            this.position.x = Math.floor((Math.random() * 755) + 1)
            this.speed.x = Math.floor((Math.random() * 10) + -10)
            this.speed.y = Math.floor((Math.random() * 10) + -10)
            kill = false
            timer = 0
        }
        if(this.speed < 4){
            if(this.speed > -4){
            this.speed.x = Math.floor((Math.random() * 10) + -10)
            this.speed.y = Math.floor((Math.random() * 10) + -10)
            }
        }

    }
}
let dead=false
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')


const GAME_WIDTH=800
const GAME_HEIGHT=600

dodger = new dodger(GAME_WIDTH,GAME_HEIGHT)
ball1 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 555) + 1),Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 10) + -10),Math.floor((Math.random() * 10) + -10))
ball2 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 555) + 1),Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 10) + -10),Math.floor((Math.random() * 10) + -10))
ball3 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 555) + 1),Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 10) + -10),Math.floor((Math.random() * 10) + -10))
ball4 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 555) + 1),Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 10) + -10),Math.floor((Math.random() * 10) + -10))
ball5 = new ball(GAME_WIDTH,GAME_HEIGHT,Math.floor((Math.random() * 555) + 1),Math.floor((Math.random() * 755) + 1),Math.floor((Math.random() * 10) + -10),Math.floor((Math.random() * 10) + -10))

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

    timer = timer + 1
    bullets.forEach(element => {
        element.update()
        element.draw(ctx)
    })
    if(!dead){
        requestAnimationFrame(gameloop)
    }
    if(dead){
        console.log('your score is', score )
        console.log('you have destroyed', ballhit,'enemy aircraft' )
    }
}
requestAnimationFrame(gameloop)