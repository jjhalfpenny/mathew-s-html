class dodger{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:0,y:0}
        this.pts={
            p1:{x:34,y:54},
            p2:{x:84,y:23},
            p3:{x:48,y:89}
        }
        this.speed={x:0,y:0}
        this.size=50
        this.maxSpeed=10
    }
    draw(ctx){
        JTD(this.pts.p1,this.pts.p2)
        JTD(this.pts.p2,this.pts.p3)
        JTD(this.pts.p1,this.pts.p3)
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
        this.pts.p1.x += this.speed.x
        this.pts.p1.y += this.speed.y
        this.pts.p2.x += this.speed.x
        this.pts.p2.y += this.speed.y
        this.pts.p3.x += this.speed.x
        this.pts.p3.y += this.speed.y
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.size > 800) this.position.x = 800 - this.size;
        if(this.position.y<0) this.position.y=0;
        if(this.position.y + this.size > 600) this.position.y = 600 - this.size;
    }

}
class object{
    constructor(gamewidth,gameheight){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:0,y:0}
        this.pts={
            p1:{x:Math.floor((Math.random() * 800) + 1),y: Math.floor((Math.random() * 600) + 1)},
            p2:{x:Math.floor((Math.random() * 800) + 1),y:Math.floor((Math.random() * 600) + 1)},
            // p3:{x:Math.floor((Math.random() * 800) + 1),y:Math.floor((Math.random() * 600) + 1)}
        }
        this.speed={x:0,y:0}
        this.size=50
        this.maxSpeed=1
    }
    draw(ctx){
        JTD(this.pts.p1,this.pts.p2)
        // JTD(this.pts.p2,this.pts.p3)
        // JTD(this.pts.p1,this.pts.p3)
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
        this.pts.p1.x += this.speed.x
        this.pts.p1.y += this.speed.y
        // this.pts.p2.x += this.speed.x
        // this.pts.p2.y += this.speed.y
        // this.pts.p3.x += this.speed.x
        // this.pts.p3.y += this.speed.y
        if(this.position.x<0) this.position.x=0;
        if(this.position.x + this.size > 800) this.position.x = 800 - this.size;
        if(this.position.y<0) this.position.y=0;
        if(this.position.y + this.size > 600) this.position.y = 600 - this.size;
    }

}
class Handler{
    constructor(object1) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 37:
                    object1.moveLeft()
                    break;
                case 39:
                    object1.moveRight()
                    break;
                case 38:
                    object1.moveup()
                    break
                case 40:
                    object1.movedown()
                    break
                case 67:
                    dead = true
                    break
            

            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 37:
                    if(object1.speed.x<0){
                        object1.stopx()
                    }
                    break
                case 39:
                    if(object1.speed.x>0){
                        object1.stopx()
                    }
                    break;
                case 38:
                    if(object1.speed.y<0){
                        object1.stopy()
                    }
                    break
                
                case 40:
                    if(object1.speed.y>0){
                        object1.stopy()
                    }
                    break
                

            }
        });

    }
}
function pndiff(p1,p2){
    return {x:p2.x-p1.x,y:p2.y-p1.y}
}
function JTD(p1,p2){
    // debugger
    let dist={x:p2.x-p1.x,y:p2.y-p1.y}
    var lv=0
    var finish={x:0,y:0}
    for(var i=0;i<=dist.x;i++){
        // lv={x:p2.x/p1.x,y:p2.y/p1.y}
        lv=dist.y/dist.x
        // save={x:lvector.x,y:lvector.y}
        if(lv>2){
            lv=lv/10
        }
        finish.x=i
        finish.y=lv*i
        ctx.fillStyle='#0f0'
        ctx.fillRect(finish.x+p1.x,finish.y+p1.y,2,2)

    }
    finish={x:0,y:0}
    for(var i=0;i<=dist.y;i++){
        // lv={x:p2.x/p1.x,y:p2.y/p1.y}
        lv=dist.x/dist.y
        // save={x:lvector.x,y:lvector.y}
        if(lv>2){
            lv=lv/10
        }
        finish.y=i
        finish.x=lv*i
        ctx.fillStyle='#f00'
        ctx.fillRect(finish.x+p1.x,finish.y+p1.y,2,2)
    }
}
function JTD(p1,p2){
    ctx.fillStyle='#0f0'
    let hp
    let lp
    if(p1.y<p2.y){
        hp=p1
        lp=p2
    }
    else{
        hp=p2
        lp=p1
    }
    let lindiffhl=pndiff(lp,hp)
    let vectorhl=lindiffhl.x/lindiffhl.y
    for(var i=0;i<lindiffhl.y;i++){
        if(i==lindiffhl.y-1){
            ctx.fillRect(Math.floor(i*vectorhl)+hp.x,hp.y+i,2,2)
        }
        else{
            ctx.fillRect(Math.floor(i*vectorhl)+hp.x,hp.y+i,2,2)
        }
    }
    if(p1.x<p2.x){
        hp=p1
        lp=p2
    }
    else{
        hp=p2
        lp=p1
    }
    lindiffhl=pndiff(lp,hp)
    vectorhl=lindiffhl.y/lindiffhl.x
    dvectorhl=lindiffhl.z/lindiffhl.x
    for(var i=0;i<lindiffhl.x;i++){
        ctx.fillRect(hp.x+i,Math.floor(i*vectorhl)+hp.y,2,2)
    }
}
function LD(lv,pnt,x){
    if(x==true){
        if(lv<=pnt){
            return true
        }
        if(lv>pnt){
            return false
        }
    }
}
let dead=false
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600

dodger1 = new dodger(GAME_WIDTH,GAME_HEIGHT)
object1 = new object(GAME_WIDTH,GAME_HEIGHT)

new Handler(object1);

let lvstTime = 0
dodger1.draw(ctx)

function gameloop(timestamp) {
    let deltaTime = timestamp - lvstTime;
    lvstTime = timestamp;
    ctx.clearRect(0,0,800,600);
    // dodger1.update(deltaTime);
    // dodger1.draw(ctx);
    object1.update(deltaTime);
    object1.draw(ctx);
    // console.log(lvector)
    if(!dead){
        requestAnimationFrame(gameloop)
    }
}
requestAnimationFrame(gameloop)