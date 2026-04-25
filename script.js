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

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarPlanoCartesiano() {
    // Ejes X y Y
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    // Cuadricula
    ctx.beginPath();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 10) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
    }
    for (let i = 0; i < canvas.height; i += 10) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    ctx.stroke();
    // Nombre de los ejes
    ctx.fillStyle = 'blue';
    ctx.font = '12px Arial';
    ctx.fillText('Y', canvas.width / 2, 10);
    ctx.fillText('X', 490, canvas.height / 2);
}

function drawLineFromAtoB() {
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;
    let x1 = parseInt(document.getElementById('x1').value);
    let y1 = parseInt(document.getElementById('y1').value);
    let x2 = parseInt(document.getElementById('x2').value);
    let y2 = parseInt(document.getElementById('y2').value);
    y1*=-1;
    y2*=-1;
    drawLine(xCenter + x1, yCenter + y1, xCenter + x2, yCenter + y2);
}

let puntosStar = [];
function drawStar() {
    dibujarPlanoCartesiano();
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;
    const height = canvas.height;
    const width = canvas.width;
    for (let i = 10; i < 260; i+=10) {
        //Lineas del cuadrante inferior derecho
        drawLine(xCenter+i, yCenter, xCenter, height - i)
        //Lineas del cuadrante inferior izquierdo
        drawLine(xCenter-i, yCenter, xCenter, height - i)
        //Lineas del cuadrante superior derecho
        drawLine(xCenter+i, yCenter, xCenter, 0 + i) 
        //Lineas del cuadrante superior izquierdo
        drawLine(xCenter-i, yCenter, xCenter, 0 + i)
    }
}

function rotateStar() {
    dibujarPlanoCartesiano();

}
//Funcion para dibujar un circulo con la formula matematica de la circunferencia
function drawCircleWithMath() {
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;
    const x = parseInt(document.getElementById('x').value) + xCenter;
    let y = parseInt(document.getElementById('y').value);
    y*=-1;
    y+=yCenter;
    const radius = parseInt(document.getElementById('radius').value);
    for (let i = 0; i < 360; i+=10) {
        drawLineFromCircleWithDegrees(i, x, y, radius, 'red', 2);
    }
}

//Funcion para dibujar una linea del circulo con la formula matematica de la circunferencia usando numero de grados para el angulo
function drawLineFromCircleWithDegrees(degrees, x, y, radius, color = 'red', width = 2) {
    //Dibuja una linea desde el centro del circulo hasta el punto en el circulo
    const angle = degrees * 2 * Math.PI / 360;
    const x1 = x + radius * Math.cos(angle);
    const y1 = y + radius * Math.sin(angle);
    drawLine(x, y, x1, y1, color, width);
    //Dibuja una linea del punto de la circunferencia hasta el siguiente punto de la circunferencia
    const x2 = x + radius * Math.cos(angle + 10 * 2 * Math.PI / 360);
    const y2 = y + radius * Math.sin(angle + 10 * 2 * Math.PI / 360);
    drawLine(x1, y1, x2, y2, color, width);
}

let clockInterval = null;
function drawClock() {
    //Muestra el reloj en el centro del canvas
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;
    const width  = canvas.width;
    const height = canvas.height;
    const radiusSeconds = width / 2-30;
    const radiusMinutes = width / 2-75;
    const widthLine = 2;
    const x = xCenter;
    const y = yCenter;
    const img = new Image();
    img.src = './images/reloj2.jpg';
    img.onload = () => {
        let degreesSeconds = 270;
        let degreesMinutes = 270;
        clockInterval = setInterval(() => {
            ctx.drawImage(img, xCenter - width / 2, yCenter - height / 2, width, height);
            angleSeconds = degreesSeconds * 2 * Math.PI / 360;
            x1 = x + radiusSeconds * Math.cos(angleSeconds);
            y1 = y + radiusSeconds * Math.sin(angleSeconds);
            drawLine(x, y, x1, y1, 'green', widthLine);
        
            angleMinutes = degreesMinutes * 2 * Math.PI / 360;
            x1 = x + radiusMinutes * Math.cos(angleMinutes);
            y1 = y + radiusMinutes * Math.sin(angleMinutes);
            drawLine(x, y, x1, y1, "red", 4);

            degreesSeconds+=6;
            if (degreesSeconds == 270) degreesMinutes += 6;
            if (degreesSeconds == 360) degreesSeconds = 0;
            if (degreesMinutes == 360) degreesMinutes = 0;
        }, 1000);
    }
}

function stopClock() {
    clearInterval(clockInterval);
}

function drawSineWave() {
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;
    const frequency = parseInt(document.getElementById('frequency').value);
    const amplitude = parseInt(document.getElementById('amplitude').value);
    const phase = parseInt(document.getElementById('phase').value);
    for (let i = 0; i < canvas.width; i+=5) {
        const x = i;
        const y = yCenter + amplitude * Math.sin(frequency * x + phase);
        drawPoint(x, y);
    }
}