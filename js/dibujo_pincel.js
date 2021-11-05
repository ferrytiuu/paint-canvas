export function pulsar_raton(isDrawing,x,y,canvas){
    canvas.addEventListener('mousedown', e => {
            x = e.offsetX;
            y = e.offsetY;
            isDrawing = true;
    });
}

export function movimiento_raton(isDrawing,x,y,canvas,context){
    canvas.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            dibujarLinea(context, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
            

        }
    });
}

export function levantar_raton(isDrawing,x,y,context) {
    window.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            dibujarLinea(context, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });
}
function hexToRgb(hex) { //funció per passar HEX a R G B
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function dibujarLinea(context, x1, y1, x2, y2) {
    console.log("cargas");
    let rgbcolor = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitat = `rgba(${rgbcolor.r},${rgbcolor.g},${rgbcolor.b},${document.getElementById('opacitat').value})`;
    //console.log(colorOpacitat);
    context.beginPath();
    context.strokeStyle = colorOpacitat;
    //context.setLineDash([1,1]);
    context.lineWidth = document.getElementById('grosor_linea_dif').value;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}