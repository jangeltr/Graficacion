const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function drawPoint(x, y, radius = 3, color = 'red') {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2, color = 'black', width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

function drawRectangle(x, y, width, height, color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color = 'black') {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawTriangle(x1, y1, x2, y2, x3, y3,  fillColor = null, strokeColor = 'black', width = 2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.lineWidth = width;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

function drawPolygon(points, fillColor = null, strokeColor = 'black', width = 2) {
    if (points.length < 3) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();

    ctx.lineWidth = width;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();

    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
}

function drawText(text, x, y, color = 'black', font = '20px Arial') {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
}

function drawImage(x, y, width, height) {
    const img = new Image();
    img.src = './images/imagen1.jpg';
    img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
    }
}