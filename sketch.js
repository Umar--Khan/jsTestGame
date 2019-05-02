let speed
let yVel
let y
let onGround
let score

let horizon
let obstacles = []


function setup () {
    createCanvas(600, 200)
    reset()

    // textAlign(CENTER)

    // horizon = height - 40
    // y = 20
    // score = yVel = 0
    // speed = 6
    // onGround = false
}

function reset () {

    textAlign(CENTER)

    horizon = height - 40
    y = 20
    score = yVel = 0
    speed = 6
    onGround = false
}

function mousePressed(){
    if (keyIsDown(32)) {
        reset()
    }
}


function draw () {
    background(51)

    // draw horizon
    stroke(255)
    line(0, horizon, width, horizon)

    fill('#999999')
    ellipse(40, y, 40)

    if (frameCount % 120 === 0) {
        speed *= 1.05
    }

    if (frameCount % 30 === 0) {
        let n = noise(frameCount)
        if (n > 0.5) {
            newObstacle(n)
        }
    }

    score++
    noStroke()
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
            fill(obstacles[i].color)
            rect(x, horizon - size, size , size)
            let x1 = x + s2
            let y1 = horizon - s2

            if (dist(x1, y1, 40, y) < s2 + 20) {
                //collision
                // noStroke()
                // fill(255)
                textSize(40)
                text("Game Over", width/2, height/2)
                textSize(20)
                text("Press F5 to restart", width/2, height/2 + 20)
            
                noLoop()
            }
        } else{
            // Delete from Array
            obstacles.splice(i, 1)
        }
    }
}


function newObstacle(n){
    let obs = new Obstacle(n * 50, color(random(255), random(255), random(255)))
    obstacles.push(obs)
}

function handleTRex(){

    if (y + 20 + yVel < horizon) {
        // console.log('flag')
        yVel += map(frameCount, 0 , 3600, 0.7, 2)
        onGround = false
    } else {
        yVel = 0
        onGround = true
    }


    if (mouseIsPressed || keyIsDown(UP_ARROW) || keyIsDown(32)) {
        
        if (onGround){
            yVel -= map(frameCount, 0 , 3600, 11, 15)
            // console.log(yVel)
            onGround = false
        }
    }

    // movement
    y += yVel

}