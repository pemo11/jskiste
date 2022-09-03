
function drawCircle(elCanvas, x, y, r, color) {
    let ctx = elCanvas.getContext("2d")
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI, false)
    ctx.fillStyle = color
    ctx.fill()
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
}

function drawRect(elCanvas, x1, y1, w, h, color) {
    let ctx = elCanvas.getContext("2d")
    ctx.beginPath()
    ctx.rect(x1, y1, w, h)
    ctx.fillStyle = color
    ctx.fill()
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
}

function drawTriangle(elCanvas, x, y, w, h, color) {
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
