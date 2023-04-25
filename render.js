const wnd = document.getElementById('cnv');
const ctx = wnd.getContext('2d');

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false)
    ctx.closePath();
    ctx.fill();
}

function drawText(x, y, text, color) {
    ctx.fillStyle = color
    ctx.font = "40px serif";
    ctx.fillText(text, x, y);
}