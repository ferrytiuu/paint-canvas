window.addEventListener('load', carga);


function menu_seleccion_desactivar(elementos) {
    Array.prototype.forEach.call(elementos, function (caja) {
        // Do stuff here
        console.log("cosa " + caja.getAttribute('icn_no_pulsado'));
        caja.src = caja.getAttribute('icn_no_pulsado');
        caja.setAttribute('pulsado',false)

    });
    let subCajas = document.getElementsByClassName("sub_caja");
    Array.prototype.forEach.call(subCajas, function (caja) {
        // Do stuff here
        caja.style.display = "none";
        caja.style.visibility = "hidden";

    });
}
function menu_seleccion_activar(elemento) {

    let id_submenu = elemento.getAttribute("submenu");

    document.getElementById(id_submenu).style.display = "block";
    document.getElementById(id_submenu).style.visibility = "visible";

    elemento.src = elemento.getAttribute("icn_pulsado");

    elemento.setAttribute("pulsado", "true");
    console.log("llega");
}

let isDrawing = false;
let x = 0;
let y = 0;

const canvas = document.getElementById('area');
const context = canvas.getContext('2d');

function carga () {



    document.getElementById('icono_pincel').addEventListener('click', function (e) {

        let estado = this.getAttribute("pulsado");

        if (estado === 'true') {

            menu_seleccion_desactivar(document.getElementsByClassName("icono"));
            this.setAttribute("pulsado", "false");
            eliminar_eventos();
        }
        else {
            eliminar_eventos();
            menu_seleccion_desactivar(document.getElementsByClassName("icono"));
            menu_seleccion_activar(this);

            //crear eventos
            dibujar_pincel();


        }

    });
    document.getElementById('icono_goma').addEventListener('click', function (e) {

        let estado = this.getAttribute("pulsado");

        if (estado === 'true') {

            menu_seleccion_desactivar(document.getElementsByClassName("icono"));
            this.setAttribute("pulsado", "false");
            eliminar_eventos();
        }
        else {
            eliminar_eventos();
            menu_seleccion_desactivar(document.getElementsByClassName("icono"));
            menu_seleccion_activar(this);
            
        }
    });

    document.getElementById('icono_cruz').addEventListener('click', function (e) {
        if (confirm('Vols netejar el canvas?')) {
            context.clearRect(0, 0, 1500, 900);
        }
    });


}
function dibujar_pincel(){
    canvas.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    });
    canvas.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            dibujarLinea(context, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
            

        }
    });
    window.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            dibujarLinea(context, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });
    
}
function eliminar_eventos(){
    console.log("se ejecuta");
    canvas.removeEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    });
    canvas.removeEventListener('mousemove', e => {
        if (isDrawing === true) {
            dibujarLinea(context, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
            

        }
    });
    window.removeEventListener('mouseup', e => {
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
