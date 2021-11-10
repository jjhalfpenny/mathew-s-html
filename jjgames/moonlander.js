bricks = []
let gravity = 0
let thrust = 0
let counter = gravity
let county = 0
let accel = 0
let speedup = 0.5
let rememmber = 0
let grav = 0.05
let slowdo = 0
let dead = false
const gameheight = 600
const gamewidth = 800
const centerX = gamewidth / 2;
const centerY = gameheight / 2;
let rem = 0
let finish = false
let land = 600
let land2 = 600
let rand = 0
let rand2 = 0
let flat = 1
let scroll = 0
let restr = 400
let restr2 = 600
let dfc2 = 0
let dfc = 0
let save2 = 0
let save = 0
let length = 0
let coinflip = 0
let keep = 0
let usage = 0
let insecure = false
class fuel{
    constructor(gamewidth,gameheight,height){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:0,y:0}
        this.speed={x:0,y:0}
        this.width=300
        this.height=height
    }
    draw(ctx){
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}
class Handler{
    constructor(dodger1) {
        document.addEventListener("keydown", event=> {
            switch (event.keyCode) {
                case 32:
                    if(insecure == true){
                        insecure=false
                        dodger1.jump()
                    }
                    if(insecure == false){
                        dodger1.jump()
                    }
                    break
                case 37:
                    dodger1.rotation1()
                    break
                case 39:
                    dodger1.rotation2()
                    break
            }
        });

        document.addEventListener("keyup", event=> {
            switch (event.keyCode) {
                case 32:
                    dodger1.decre()
                    break
                case 37:
                    dodger1.rotation=0
                    break
                case 39:
                    dodger1.rotation=0
                    break
            }
        });
    }
}
class dodger{
    constructor(gamewidth,gameheight,width,height,x,y){
        this.gameheight=gameheight
        this.gamewidth=gamewidth
        this.position={x:400,y:300}
        this.speed={x:0,y:0}
        this.size=20
        this.MaxSpeed=10
        this.maxSpeed={x:10,y:10}
        this.angle = 0;
        this.width = width;
        this.height = height;
        this.x=x
        this.y=y
        this.gh=0
        this.sense=3
        this.rotation=0
        this.relpoints=[
            {x:-this.size/2,y:-this.size/2},
            {x:this.size/2,y:-this.size/2},
            {x:this.size/2,y:this.size/2},
            {x:-this.size/2,y:this.size/2},
        ]
        this.points=[]
        var i
        for(i=0;i<this.relpoints.length;i++){
            this.points.push({x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y})
        }
    }
    draw(ctx){
        // NM_rotate(rem,this.position,this.size)
        var i
        for(i=0;i<this.points.length-1;i++){
            JTD(this.points[i],this.points[i+1])
        }
        JTD(this.points[this.points.length-1],this.points[0])
    }
    rotation1() {
        this.rotation=-1
    }
    rotation2() {
        this.rotation=1
    }
    jump(){
        fuel1.width -= 4
        thrust = thrust + speedup
        this.speed.x = this.speed.x + angularmov(rem,thrust).y/2
    }
    update() {
        if(insecure == false){
            rem+=this.rotation
            this.speed.y = 0
            gravity = grav
            accel -= gravity
            this.speed.y = this.speed.y -accel
            this.speed.y = this.speed.y - thrust/2
            this.speed.y-=angularmov(rem,thrust).x
        }
        if(insecure == true){
            this.speed.y=0
            this.speed.x=0
        }
        for(i=0;i<this.points.length;i++){
            this.relpoints[i]=rotate_point(this.relpoints[i],this.rotation)
        }
        for(i=0;i<this.points.length;i++){
            this.points[i]={x:this.position.x+this.relpoints[i].x,y:this.position.y+this.relpoints[i].y}
        }
        restr-=this.speed.y/this.sense
        restr2-=this.speed.x/this.sense
        bricks.forEach(brick => {
            brick.position.y-=this.speed.y/this.sense
            brick.position.x-=this.speed.x/this.sense
            scroll = this.speed.x
        })
        this.gh-=this.speed.y/this.sense
        document.getElementById('height from start').textContent=
            'height=' + this.gh
        county = 0
        if(gravity < 0){
            if(this.position.y < 0){
                this.position.y = 0
                this.speed.y = 1
            }
        }
    }
    decre(){
        thrust = thrust - speedup
    }
}
class brick{
    constructor(gamewidth,gameheight,x,y){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.width=2;
        this.height=800;
        this.speed = {
            x:0,
            y:0
        }
        this.position = {
            x:x,
            y:y
        }
    }
    draw(ctx){
        ctx.fillStyle = '#000000'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        if(detect_rotated_shape(dodger1.points,this.position)){
            if(rem>15){
                insecure = true
            }
            if(rem<-15){
                insecure = true
            }
            if(dodger1.speed.y>3){
                dead=true
            }
            if(dodger1.speed.x<3){
                dead=true
            }
            if(rem<15){
                if(rem>-15){
                    if(dodger1.speed.y<3){
                        if(dodger1.speed.x<3){
                            finish=true
                        }
                    }
                }
            }
        }
    }
}
function landscape(){
    for(length=-8000;length<8000 ;length++){
        if(flat == 0){
            for(counter2 = 0;counter2 < plane;counter2++){
                let new_brick = new brick(GAME_WIDTH,GAME_HEIGHT,length,land)
                bricks.push(new_brick)
                length ++
            }
            flat = Math.floor((Math.random() * 7) + 0)
        }
        if(flat > 0){
            plane = Math.floor((Math.random() * 25) + 0)
            coinflip = Math.floor((Math.random() * 2) + 1)
            flat = Math.floor((Math.random() * 7) + 0)
            let new_brick = new brick(GAME_WIDTH,GAME_HEIGHT,length,land)
            bricks.push(new_brick)
            if(coinflip == 1){
                rand += flat
            }
            if(coinflip == 2){
                rand -= flat
            }
            if(rand > -20){
                rand = rand * 0.7
            }
            if(land < 400){
                rand += 3
            }
            if(land > 600){
                rand += -3
            }
            land += rand
        }
    }
}
function rotate_point(point,ang){
    angle=ang*(Math.PI/180)
    let Matrix=[
        [Math.cos(angle),-Math.sin(angle)],
        [Math.sin(angle),Math.cos(angle)]
    ]
    let npoint={
        x:point.x*Matrix[0][0]+point.y*Matrix[0][1],
        y:point.x*Matrix[1][0]+point.y*Matrix[1][1]
    }
    return npoint
}
function xyswitch(coord){
    let ncoord={
        x:coord.y,
        y:coord.x
    }
    return ncoord
}
function detect_rotated_shape(points,p){
    pointnum=points.length
    var i
    sidetruecount=0
    for(i=0;i<pointnum-1;i++){
        if(angleline_detection(points[i],points[i+1],p,true)){
            sidetruecount++
        }
    }
    if(angleline_detection(points[pointnum-1],points[0],p,true)){
        sidetruecount++
    }
    if(sidetruecount==pointnum){
        return true
    }
    else{
        return false
    }
}
function angularmov(ang,speed){
    rang=ang*(Math.PI/180)
    xymot={
        x:0,
        y:0
    }
    xymot.y=speed*Math.sin(rang)
    xymot.x=speed*Math.cos(rang)
    return xymot
}
function diff(p1,p2){
    dist={x:0,y:0}
    if(p1.x>p2.x){
        dist.x=p1.x-p2.x
    }
    else{
        dist.x=p2.x-p1.x
        // dist.sector+=10
    }
    if(p1.y>p2.y){
        dist.y=p1.y-p2.y
    }
    else{
        dist.y=p2.y-p1.y
        // dist.sector++
    }
    return dist

}
function pndiff(p1,p2){
    dist={x:p1.x-p2.x,y:p1.y-p2.y}
    return dist
}
function anglefinder(p1,p2){
    dist=diff(p1,p2)
    rang=Math.atan(dist.y/dist.x)
    ang=rang/(Math.PI/180)
    switch(dist.sector){
        case 0:
            ang+=270
            break
        case 10:
            ang=360-ang
            break
        case 1:
            ang=180-ang
            break
        case 11:
            break

    }
    return ang
}
function pnanglefinder(p1,p2){
    dist=pndiff(p1,p2)
    rang=Math.atan(dist.y/dist.x)
    ang=rang/(Math.PI/180)
    return ang
}
function angleline_detection(lp1,lp2,p,inv){
    np={x:p.x-lp1.x,y:p.y-lp1.y}
    //y=mx+b
    let m=pndiff(lp1,lp2).y/pndiff(lp1,lp2).x
    if(np.x<0&&lp1.x<lp2.x){
        inv=!inv
    }
    if(np.x>=0&&lp1.x>=lp2.x){
        inv=!inv
    }
    if(np.y/np.x>m){
        if(!inv){
            return false
        }
        else{
            return true
        }
    }
    else{
        if(inv){
            return false
        }
        else{
            return true
        }
    }
}
function NM_rotate(rem,pos,size){
    var rot=rem*(Math.PI/180)
    ctx.save();
    ctx.translate(pos.x,pos.y);
    ctx.rotate(rot);
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(size / -2, size/ -2, size, size);
    ctx.restore();
}
function JTD(p1,p2){
    if(pndiff(p1,p2).x>=0){
        angle=pnanglefinder(p1,p2)+180
    }
    else{
        angle=pnanglefinder(p1,p2)
    }
    
    dist=Math.sqrt(Math.pow(diff(p1,p2).x,2)+Math.pow(diff(p1,p2).y,2))
    drawline(p1,angle,dist)
}
function drawline(origin,ang,length){
    for(i=0;i<length;i++){
        pos=angularmov(ang,i)
        ctx.fillStyle='#000'
        ctx.fillRect(origin.x+pos.x,origin.y+pos.y,2,2)
    }
}
let canvas = document.getElementById("gamescreen")
let ctx = canvas.getContext('2d')

const GAME_WIDTH=800
const GAME_HEIGHT=600
dodger1 = new dodger(GAME_WIDTH,GAME_HEIGHT,20,20,centerX,centerY)
fuel1 = new fuel(GAME_WIDTH,GAME_HEIGHT,20)

landscape()

let lastTime = 0
new Handler(dodger1)

function gameloop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0,0,800,600);
    if(fuel1.width <= 0){
        dodger1.speed.y=0
        dodger1.speed.x=0
    }
    if(insecure==true){
        document.getElementById('insecure landing').textContent=
            'insecure landing'
    }
    fuel1.draw(ctx)
    dodger1.draw(ctx)
    dodger1.update()
    bricks.forEach(element => {
        element.draw(ctx)
        element.update()
    })
    console.log(rem)
    if(!dead == true){
        if(!finish == true){
            requestAnimationFrame(gameloop)
        }
    }
    if(finish == true){
        document.getElementById('you have landed on the moon, well done!!!').textContent=
            'you have landed on the moon, well done!!!'
    }
    if(dead == true){
        document.getElementById('you suck!!!').textContent=
            'you suck!!!'
    }
}
requestAnimationFrame(gameloop)