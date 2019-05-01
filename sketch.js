let speed
let yVel
let y
let onGround
let score

let horizon
let obstacles = []


function setup () {
    createCanvas(600, 200)

    textAlign(CENTER)

    horizon = height - 40
    y = 20
    score = yVel = 0
    speed = 4
    onGround = false


}

function draw () {
    background(51)

    // draw horizon
    stroke(255)
    line(0, horizon, width, horizon)

    fill('#999999')
    ellipse(40, y, 40)

    if (frameCount % 120 === 0) {
        speed *= 1.1
    }

    if (frameCount % 45 === 0) {
        if (random(0, 1) > 0.3) {
            newObstacle();
        }
    }
   

    score++
    textSize(20)
    text("Score: " + score, width/2, 30)

    // newObs()
    updateObstacles()
    handleTRex()

}

function updateObstacles(){

    for (let i = obstacles.length-1; i >= 0; i--){
        obstacles[i].x -= speed
        let x = obstacles[i].x
        let size = obstacles[i].size
        let s2 = size/2

        if (x > -30){
            // if its On Screen
            rect(x, horizon - size, size , size)
            let x1 = x + s2
            let y1 = horizon - s2

            if (dist(x1, y1, 40, y) < s2 + 20) {
                //collision
                textSize(40)
                text("Game Over", width/2, height/2)
                textSize(20)
                text("Press F5 to restart", width/2, height/2 + 40)
                noLoop()
            }
        } else{
            // Delete from Array
            obstacles.splice(i, 1)
        }
    }
}


function newObstacle(){
    let obs = new Obstacle(random(20, 40), null)
    obstacles.push(obs)
}

function handleTRex(){

    if (y + 20 + yVel < horizon) {
        // console.log('flag')
        yVel += 0.6
        onGround = false
    } else {
        yVel = 0
        onGround = true
    }


    if (mouseIsPressed || keyIsDown(UP_ARROW) || keyIsDown(32)) {
        
        if (onGround){
            yVel -= 10
            // console.log(yVel)
            onGround = false
        }
    }

    // movement
    y += yVel

}