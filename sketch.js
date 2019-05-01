let speed
let yVel
let y
let onGround


let horizon
let obsArr = []


function setup () {
    createCanvas(600, 200)

    horizon = height - 40
    y = 20
    yVel = 0
    speed = 0
    onGround = false

}

function draw () {
    background(51)

    // draw horizon
    stroke(255)
    line(0, horizon, width, horizon)

    fill('#999999')
    ellipse(40, y, 40)

    // newObs()
    updateObs()
    handleTRex()

}

function updateObs(){

    for (let i = obsArr.length; i > 0; i--){
        if (obsArr[i].x > -30){
            // if its On Screen
            rect()
        } else{

        }
    }
}


function newObs(){

    obsArr.push("obs")
    
}

function handleTRex(){

    if (y + 20 < horizon) {
        // console.log('flag')
        yVel += 1
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