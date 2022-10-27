/* contains some functions for animating circles in a box */

/* https://orangefreesounds.com */

var headerTitle = "Kinetische Erschöpfung"
var ball = null
var ballList = []
var ballfloorList = []
const gravity = 0.25
const friction = 0.98
const startDelaySeconds = 1
const newBallIntervalSeconds = 1
var bounceCounter = 1
var ballCounter = 0
var bounceCounterLimit = 10
var blopNoice = null
var bounceNoice = null
// the ball to remove
var removeBall = null
var intervalId = 0
var gameOver = false

function init() {
    var elHeaderTitle = document.querySelector("#titleHeader")
    elHeaderTitle.textContent = headerTitle
    elHeaderTitle.style.marginLeft = "200px"

    blopNoice = new Audio("Blop.mp3")
    bounceNoice = new Audio("Bounce.mp3")

    newBall()

    ballList.push(ball)
   
    drawCanvas()

    // delay the start of the animation
    window.setTimeout(startAnimation, startDelaySeconds * 1000)

    // fade out all balls after 5 seconds
    window.setTimeout(() => {
        console.log("*** game over ***")
        gameOver = true
        // Fadeout
        intervalId = window.setInterval(() => {
            console.log("*** fadeout ball ***")
            ballList.forEach(function (ball) {
                ball.alphaValue -= 0.1
                ball.color = "rgba(127, 127, 127, " + ball.alphaValue + ")"
                ball.border = "rgba(0, 0, 0, " + ball.alphaValue + ")"
            })
            drawCanvas()
            if (ballList[0].alphaValue <= 0) {
                window.clearInterval(intervalId)
            }
        }, 500)
    }, 5000)
}

function newBall() {
    console.log("*** new ball ***")
    ball = {
        bounce: 0.75,
        radius: 15,
        energy: 255,
        floorBounce: 0,
        border: "black",
        alphaValue: 1,
        x: canvas.width / 2,
        y: canvas.height / 2,
        velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
        velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
    }

    ballList.push(ball)
}

function updateBounceCounter() {
    bounceCounter++
    if (bounceCounter > bounceCounterLimit) {
        newBall()
        bounceCounter = 0
    }
    bounceNoice.play()
}

function startAnimation() {
    updateCanvas()
}

function getColor() {
    let colorList = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]
    let color = colorList[Math.floor(Math.random() * colorList.length)]
    return color
}

function getGradient(ctx, energy) {
    let redColorStops = ["FF0600", "FF0C00", "FF1F00", "FF3100", "FF4400", "FF5000"]
    let greenColorStops = ["001C00", "004600", "008C00", "00B600", "00FC00", "44FE44"]
    let blueColorStops = ["00007F", "00008D", "2424FF", "0000C5", "0C85FE", "52FFFF"]
    let grayColorStops = ["263238", "455A64", "78909C", "B0BEC5", "9E9E9E", "E0E0E0"]
    let colorStops = null
    let grd = ctx.createLinearGradient(ball.x, ball.y, ball.x + ball.radius, ball.y + ball.radius);
    switch(true) {
        case energy > 200:
            colorStops = redColorStops
            break
        case energy > 100:
            colorStops = greenColorStops
            break
        case energy > 50:
            colorStops = blueColorStops
            break
        default:
            colorStops = grayColorStops
    }

    for (var i = 0; i < colorStops.length; i++) {
        grd.addColorStop(i / colorStops.length, "#" + colorStops[i])
    }
    // grd.addColorStop(0, color1)
    // grd.addColorStop(1, color2)
    return grd

}

function drawCanvas () {
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ballList.forEach(function (ball) {
        ctx.beginPath()
        ctx.arc(
            ball.x,
            ball.y,
            ball.radius,
            0,
            Math.PI*2,
            true
        )
        ctx.fillStyle = getGradient(ctx, ball.energy)
        ctx.fill()
        ctx.strokeStyle = ball.border
        ctx.stroke()
    })
}

function updateBall(ball) {
    // console.log(`*** Updating ball mit velX=${ball.velX}, velY=${ball.velY}, energy=${ball.energy} und floorBounce=${ball.floorBounce} ***`)
    ball.energy -= (ball.energy > 20) ? 20 : 0

    if (ball.floorBounce > 5) {
        ball.energy = 0
    }
    if (ball.floorBounce > 5) {
        ballfloorList.push(ball)
    }

    /*
    if (ballList.length > 3 && ball.floorBounce > 3) {
        // remember the ball to remove
        removeBallIndex = ballList.indexOf(ball)
        removeBall = ballList[removeBallIndex]
        var intervalId = window.setInterval(() => {
            console.log(`*** fading out ball with alphaValue=${removeBall.alphaValue} ***`)
            fadeoutBall(removeBall)
            removeBall.alphaValue -= 0.1
            if (removeBall.alphaValue < 0) {
                // removeBall = ballfloorList[0]
                ballList.splice(removeBall, 1)
                ballfloorList.splice(removeBall, 1)
                console.log(`*** Removing ball with id=${removeBall.id} ***`)
                blopNoice.play()
                removeBall.floorBounce = 0
                window.clearInterval(intervalId)
            }
        }, 500)
    }
    */

}

function updateCanvas() {
    // queue the next update
    if (!gameOver) {
        intervalId = window.requestAnimationFrame(updateCanvas)
    }

    ball.velY += gravity
    ball.x += ball.velX
    ball.y += ball.velY

    // check for collision with right boundary
    if(ball.x + ball.radius >= canvas.width) {
        ball.velX *= -ball.bounce
        ball.x = canvas.width - ball.radius
        updateBounceCounter()
        updateBall(ball)
    }

    // check for collision with left boundary
    if(ball.x - ball.radius <= 0) {
        ball.velX *= -ball.bounce
        ball.x = ball.radius
        updateBounceCounter()
        updateBall(ball)
    }

    // check for collision with bottom boundary
    if (ball.y + ball.radius >= canvas.height) {
        ball.velY *= -ball.bounce
        ball.y = canvas.height - ball.radius
        ball.velX *= friction
        updateBounceCounter()
        ball.floorBounce++
        updateBall(ball)
    }

    // check for collision with top boundary
    if (ball.y + ball.radius <= 0) {
        ball.velY *= -ball.bounce
        ball.velX *= friction
        ball.y = ball.radius
        updateBounceCounter()
        updateBall(ball)
    }

    drawCanvas();
}