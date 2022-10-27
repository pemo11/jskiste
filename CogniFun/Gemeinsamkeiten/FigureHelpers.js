
function clearCanvas(canvas) {
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// Draw a circle
// t is just a dummy parameter because there is no height/width
function drawCircle(elCanvas, x, y, r, t, color) {
    clearCanvas(elCanvas)
    let ctx = elCanvas.getContext("2d")
    ctx.beginPath()
    ctx.arc(x + r / 2 + 2, y + r / 2 + 2, r / 2, 0, 2 * Math.PI, false)
    ctx.fillStyle = color
    ctx.fill()
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
}

// Draw a rect
function drawRect(elCanvas, x1, y1, w, h, color) {
    clearCanvas(elCanvas)
    let ctx = elCanvas.getContext("2d")
    ctx.beginPath()
    ctx.rect(x1, y1, w, h)
    ctx.fillStyle = color
    ctx.fill()
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
}

// Draw a rect with left half filled
function drawRectLeft(elCanvas, x1, y1, w, h, color) {
    clearCanvas(elCanvas)
    let ctx = elCanvas.getContext("2d")
    ctx.beginPath()
    ctx.rect(x1, y1, w / 2, h)
    ctx.fillStyle = color
    ctx.fill()
    ctx.rect(x1 + w / 2, y1, w / 2, h)
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
}

// Draw a rect with right half filled
function drawRectRight(elCanvas, x1, y1, w, h, color) {
    clearCanvas(elCanvas)
    let ctx = elCanvas.getContext("2d")
    ctx.beginPath()
    ctx.rect(x1, y1, w / 2, h)
    ctx.fillStyle = color
    ctx.fill()
    ctx.rect(x1 + w / 2, y1, w / 2, h)
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
}

// Draw a rect with top half filled
function drawRectTop(elCanvas, x1, y1, w, h, color) {
    clearCanvas(elCanvas)
    let ctx = elCanvas.getContext("2d")
    ctx.beginPath()
    ctx.rect(x1, y1, w, h / 2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.rect(x1, y1 + h / 2, w, h / 2)
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
}

// Draw a rect with bottom half filled
function drawRectBottom(elCanvas, x1, y1, w, h, color) {
    clearCanvas(elCanvas)
    let ctx = elCanvas.getContext("2d")
    ctx.beginPath()
    ctx.rect(x1, y1, w, h / 2)
    ctx.rect(x1, y1 + h / 2, w, h / 2)
    ctx.lineWidth = 5
    ctx.fillStyle = color
    ctx.fill()

    ctx.stroke()
    ctx.closePath()
}

// Draw a triangle
function drawTriangle(elCanvas, x, y, w, h, color) {
    clearCanvas(elCanvas)
    let ctx = elCanvas.getContext("2d")
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.moveTo(x, y)
    ctx.lineTo(x-w, y+h)
    ctx.lineTo(x+w, y+h)
    ctx.lineTo(x, y)
    ctx.fillStyle = color
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

function getRandomColor() {
    let letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}