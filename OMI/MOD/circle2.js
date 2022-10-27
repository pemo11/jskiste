/* contains some functions for animating circles in a box */

const ballRadius = 15
var ballList = []
var ballCounter = 0
var intervalId = 0

var headerTitle = "Kinetische Erschöpfung"
var ballList = []
const gravity = 0.25
const friction = 0.98
const startDelaySeconds = 1

var blopNoice = null
var bounceNoice = null
var intervalId = 0
var stopNewBall = false
var stopMovement = false
var stopFading = false
var x, y

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getCtx() {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    return ctx
}

function drawCanvas () {
    let ctx = getCtx()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ballList.forEach((ball) =>  {
        ctx.beginPath()
        ctx.arc(
            ball.x,
            ball.y,
            ball.radius,
            0,
            Math.PI * 2,
            true
        )
        ctx.fillStyle = ball.gradColor
        ctx.fill()
        // ctx.strokeStyle = ball.border
        ctx.stroke()
    })
}

function getColor() {
    let colorList = ["#008000", "#DDC43C", "#008080", "#FF1493", "#FF4500", "#00BFFF"]
    let color = colorList[Math.floor(Math.random() * colorList.length)]
    return color
}

function checkCoordinates(x, y) {
    let okFlag = true
    ballList.forEach( ball =>  {
        const dx = Math.abs(ball.x - x)
        const dy = Math.abs(ball.y - y)
        const distance = Math.sqrt(dx * dx + dy * dy)
        okFlag &= !(distance < ballRadius)
    })
    return okFlag

}

function getGradient(color, x, y) {
    let ctx = getCtx()
    let grd = ctx.createLinearGradient(x, y, x + ballRadius, y + ballRadius);
    grd.addColorStop(0, color)
    grd.addColorStop(1, "white")
    return grd
}

function newBall(color, x, y) {
    console.log("*** new ball ***")
    ball = {
        bounce: 0.75,
        radius: ballRadius,
        energy: 255,
        color: color,
        gradColor: getGradient(color, x ,y),
        aRgbHex: color.substring(1).match(/.{1,2}/g).map((x) => parseInt(x, 16)),
        border: "white",
        alphaValue: 1,
        x: x,
        y: y,
        velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
        velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
    }
    ballList.push(ball)
}

async function init() {
    var elHeaderTitle = document.querySelector("#titleHeader")
    elHeaderTitle.textContent = headerTitle
    elHeaderTitle.style.marginLeft = "200px"

    blopNoice = new Audio("Blop.mp3")
    bounceNoice = new Audio("Bounce.mp3")

    x = canvas.width / 2
    y = canvas.height / 2
    newBall("#FF0000", x, y)
    drawCanvas()

    await sleep(500)

    startAnimation()
}

async function startAnimation() {
    console.log("*** start animation ***")
    // delay the start of the animation
    window.setTimeout(() => {
        stopNewBall = true
        window.setTimeout(() => {
            stopMovement = true
            window.setTimeout(() => {
                stopFading = true
            }, 1000)
        }, 2000)
    }, 2000)

    console.log("*** start new ball ***")
    while(!stopNewBall) {
        let color = getColor()
        newBall(color, x, y)
        drawCanvas()
        await sleep(250)
        let abbruch = false
        while(!abbruch) {
            x = Math.random() * (canvas.width - ballRadius) + ballRadius
            y = Math.random() * (canvas.height / 2 - ballRadius) + ballRadius
            abbruch = checkCoordinates(x, y )
        }
    }

    console.log("*** start movement ***")
    while(!stopMovement) {

        // Positionen aktualisieren
        ballList.forEach( ball =>  {
            ball.velY += gravity
            ball.x += ball.velX
            ball.y += ball.velY
        
            // check for collision with right boundary
            if(ball.x + ball.radius >= canvas.width) {
                ball.velX *= -ball.bounce
                ball.x = canvas.width - ball.radius
                bounceNoice.play()
            }
        
            // check for collision with left boundary
            if(ball.x - ball.radius <= 0) {
                ball.velX *= -ball.bounce
                ball.x = ball.radius
                bounceNoice.play()
            }
        
            // check for collision with bottom boundary
            if (ball.y + ball.radius >= canvas.height) {
                ball.velY *= -ball.bounce
                ball.y = canvas.height - ball.radius
                ball.velX *= friction
                bounceNoice.play()
            }
        
            // check for collision with top boundary
            if (ball.y + ball.radius <= 0) {
                ball.velY *= -ball.bounce
                ball.velX *= friction
                ball.y = ball.radius
                bounceNoice.play()
            }
        
        })

        drawCanvas()
        await sleep(10)
    }

    console.log("*** start fading ***")
    intervalId = window.setInterval(() => {
        ballList.forEach(ball => {
            ball.alphaValue -= 0.2
            ball.gradColor = ball.color
            // ball.border = ball.color
            console.log("*** change alpha to " + ball.alphaValue + " ***")
            ball.color = "rgba(" + ball.aRgbHex[0] + "," + ball.aRgbHex[1] + "," + ball.aRgbHex[2] + "," + ball.alphaValue + ")"
        })
        drawCanvas()
        if (stopFading) {
            clearInterval(intervalId)
            x = canvas.width / 2
            y = canvas.height / 2
            newBall("#FF0000", x, y)
            drawCanvas()
        }
    }, 60)


}

