window.addEventListener('load', dibujo_canvas);

let dibujo = false;

function menu_seleccion_desactivar(elementos) {
    Array.prototype.forEach.call(elementos, function (caja) {
        // Do stuff here
        console.log("cosa " + caja.icn_no_pulsado);
        caja.src = caja.getAttribute("icn_no_pulsado");

    });
    let subCajas = document.getElementsByClassName("sub_caja");
    Array.prototype.forEach.call(subCajas, function (caja) {
        // Do stuff here
        caja.style.display = "none";

    });
}
function menu_seleccion_activar(elemento) {

    let id_submenu = elemento.getAttribute("submenu");

    document.getElementById(id_submenu).style.display = "block";

    elemento.src = elemento.getAttribute("icn_pulsado");

    elemento.setAttribute("pulsado", "true");
}

function dibujo_canvas() {

    document.getElementById('icono_pincel').addEventListener('click', function (e) {

        let estado = this.getAttribute("pulsado");

        if (estado === 'true') {

            menu_seleccion_desactivar(document.getElementsByClassName("icono"));
            this.setAttribute("pulsado", "false");
        }
        else {

            menu_seleccion_activar(this);

            dibujo = true;
            menuActual = this.id;
            console.log(menuActual);
        }

    });
    document.getElementById('icono_goma').addEventListener('click', function (e) {

        let estado = this.getAttribute("pulsado");

        if (estado === 'true') {
            this.setAttribute("pulsado", "false");
            document.getElementById('editor_goma').style.visibility = "hidden";
            this.src = "imatges/rubber.png";
            console.log("se desactiva");
            dibujo = false;

        }
        else {
            this.setAttribute("pulsado", "true");
            let subCajas = document.getElementsByClassName("sub_caja");
            Array.prototype.forEach.call(subCajas, function (caja) {
                // Do stuff here
                caja.style.visibility = "hidden";

            });
            document.getElementById('editor_goma').style.visibility = "visible";
            this.src = "imatges/clicked_rubber.png";
            dibujo = true;
            menuActual = this.id;
            console.log(menuActual);
        }
    });

    document.getElementById('icono_cruz').addEventListener('click', function (e) {
        if (confirm('Vols netejar el canvas?')) {
            context.clearRect(0, 0, 1500, 900);
        }
    });


    let isDrawing = false;
    let x = 0;
    let y = 0;
    let menuActual = null;

    const myPics = document.getElementById('area');
    const context = myPics.getContext('2d');




    function opcion_seleccionada(e) {
        switch (menuActual) {
            case "icono_pincel":
                dibujarLinea(context, x, y, e.offsetX, e.offsetY);
                break;
            case "icono_goma":
                borrarLinea(context, x, y, e.offsetX, e.offsetY);
                break;
            case "icono_forma":
                dibujarCuadrado(context, x, y, e.offsetX, e.offsetY);
                break;
            case "icono_clip":

                break;
            case "icono_cruz":

                break;
            default:
                break;
        }

    }
    myPics.addEventListener('mousedown', e => {
        if (dibujo === true) {
            x = e.offsetX;
            y = e.offsetY;
            isDrawing = true;
        }

    });

    myPics.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            opcion_seleccionada(e);
            x = e.offsetX;
            y = e.offsetY;
        }
    });

    window.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            opcion_seleccionada(e);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });

    function hexToRgb(hex) { //funció per passar HEX a R G B
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function dibujarLinea(context, x1, y1, x2, y2) {
        console.log();
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
    function borrarLinea(context, x1, y1, x2, y2) {
        console.log();

        context.beginPath();
        //context.setLineDash([1,1]);
        context.moveTo(x1, y1);
        context.closePath();
        context.clearRect(x2, y2, 40, 40);
        context.lineWidth = document.getElementById('grosor_goma_dif').value;

    }

}