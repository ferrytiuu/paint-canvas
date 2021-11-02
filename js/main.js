window.addEventListener('load', dibujo_canvas);

let dibujo = false;

function dibujo_canvas() {



    document.getElementById('icono_pincel').addEventListener('click', function (e) {

        let estado = this.getAttribute("pulsado");

        if (estado === 'true') {
            this.setAttribute("pulsado", "false");
            document.getElementById('editor_linea').style.visibility = "hidden";
            this.src = "imatges/paintbrush.png";
            console.log("se desactiva");
            dibujo = false;
           
        }
        else {
            this.setAttribute("pulsado", "true");
            document.getElementById('editor_linea').style.visibility = "visible";
            this.src = "imatges/clicked_paintbrush.png";
            console.log("Se hace clickS");
            dibujo = true;
        }

    });

    let isDrawing = false;
    let x = 0;
    let y = 0;

    const myPics = document.getElementById('area');
    const context = myPics.getContext('2d');



    // event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

    // Add the event listeners for mousedown, mousemove, and mouseup
    myPics.addEventListener('mousedown', e => {
        if(dibujo === true){
            x = e.offsetX;
            y = e.offsetY;
            isDrawing = true;
        }

    });

    myPics.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            drawLine(context, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
    });

    window.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            drawLine(context, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });

    function drawLine(context, x1, y1, x2, y2) {
        let colorOpacitat = "rgba({},1)"
        context.beginPath();
        context.strokeStyle = (document.getElementById('selector_color').value),(document.getElementById('opacitat').value);
        console.log((document.getElementById('selector_color').value),(document.getElementById('opacitat').value));
        //context.setLineDash([1,1]);
        context.lineWidth = document.getElementById('grosor_linea_dif').value;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }








}