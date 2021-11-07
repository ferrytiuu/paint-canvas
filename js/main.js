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

const drawCanvas = document.getElementById('area2');
const drawCtx = drawCanvas.getContext("2d");

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
            dibujar_pincel();
            //crear eventos
            


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
            dibujar_goma();
            
        }
    });
    document.getElementById('icono_forma').addEventListener('click', function (e) {

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
            


        }

    });
    document.getElementById("rectangulo").addEventListener("click", dibujar_geometria_cuadrado);
    document.getElementById("triangulo").addEventListener("click", dibujar_geometria_triangulo);


    document.getElementById('icono_cruz').addEventListener('click', function (e) {
        if (confirm('Vols netejar el canvas?')) {
            context.clearRect(0, 0, 1500, 900);
        }
    });


}

function dibujar_pincel(){
    console.log("se crea enventos de pincel")
    canvas.addEventListener('mousedown',dibujar_click);
    canvas.addEventListener('mousemove', dibujar_moviendo);
    canvas.addEventListener('mouseup',dibujar_levantar);
    
}
function dibujar_click(e){
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function dibujar_moviendo (e){
    if (isDrawing === true) {
        dibujarLinea(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
        
    }
}
function dibujar_levantar(e){
    if (isDrawing === true) {
        dibujarLinea(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}

function dibujar_goma(){
    console.log("se crea enventos de borrar linea")
    canvas.addEventListener('mousedown',goma_click);
    canvas.addEventListener('mousemove', goma_moviendo);
    canvas.addEventListener('mouseup',goma_levantar);
    
}
function goma_click(e){
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function goma_moviendo (e){
    if (isDrawing === true) {
        borrarLinea(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
}
function goma_levantar(e){
    if (isDrawing === true) {
        borrarLinea(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}
function dibujar_geometria_cuadrado(){
    eliminar_eventos();
    console.log("se crea enventos de geometria linea")
    canvas.addEventListener('mousedown',cuadrado_click);
    canvas.addEventListener('mousemove', cuadrado_moviendo);
    canvas.addEventListener('mouseup',cuadrado_levantar);
    
}
function cuadrado_click(e){
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function cuadrado_moviendo (e){
    if (isDrawing === true) {
       
        drawCtx.clearRect(0,0,1500,900);
        dibujarCuadrado(drawCtx,x ,y,e.offsetX-x, e.offsetY-y);
 
    }
}
function cuadrado_levantar(e){
    if (isDrawing === true) {
        dibujarCuadrado(context,x ,y,e.offsetX-x, e.offsetY-y);
        drawCtx.clearRect(0,0,1500,900);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}
function dibujar_geometria_triangulo(){
    eliminar_eventos()
    console.log("se crea enventos de geometria linea")
    canvas.addEventListener('mousedown',triangulo_click);
    canvas.addEventListener('mousemove', triangulo_moviendo);
    canvas.addEventListener('mouseup',triangulo_levantar);
    
}
function triangulo_click(e){
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function triangulo_moviendo (e){
    if (isDrawing === true) {
       
        drawCtx.clearRect(0,0,1500,900);
        dibujarTriangulo(drawCtx,x ,y,e.offsetX, e.offsetY);
        
 
    }
}
function triangulo_levantar(e){
    if (isDrawing === true) {

        /*
        dibujarLinea(context,x ,e.offsetY,e.offsetX, e.offsetY);
        dibujarLinea(context,x+(e.offsetX-x)/2 ,y,x ,e.offsetY);
        dibujarLinea(context,x+(e.offsetX-x)/2 ,y,e.offsetX, e.offsetY);
        */
        dibujarTriangulo(context,x ,y,e.offsetX, e.offsetY);
        drawCtx.clearRect(0,0,1500,900);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}
function eliminar_eventos(){
    console.log("se ejecuta eliminar eventos");

    canvas.removeEventListener('mousemove', dibujar_moviendo);
    canvas.removeEventListener('mousedown',dibujar_click);
    canvas.removeEventListener('mouseup',dibujar_levantar);

    canvas.removeEventListener('mousedown',goma_click);
    canvas.removeEventListener('mousemove', goma_moviendo);
    canvas.removeEventListener('mouseup',goma_levantar);

    canvas.removeEventListener('mousedown',cuadrado_click);
    canvas.removeEventListener('mousemove', cuadrado_moviendo);
    canvas.removeEventListener('mouseup',cuadrado_levantar);

    canvas.removeEventListener('mousedown',triangulo_click);
    canvas.removeEventListener('mousemove', triangulo_moviendo);
    canvas.removeEventListener('mouseup',triangulo_levantar);



}
function hexToRgb(hex) { //funció per passar HEX a R G B
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function dibujarLinea(context2, x1, y1, x2, y2) {
    console.log("cargas lineas");
    let rgbcolor = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitat = `rgba(${rgbcolor.r},${rgbcolor.g},${rgbcolor.b},${document.getElementById('opacitat_linea').value})`;
    if(document.getElementById('disc_punts').checked == true){
        console.log('punts');
        context2.setLineDash([3, 3]);
    }else if(document.getElementById('disc_linies').checked == true){
        console.log('linies');
        context2.setLineDash([20, 5,]);
    }else{
        console.log('normal');
        context2.setLineDash([]);
    }
    //console.log(colorOpacitat);
    context2.beginPath();
    context2.strokeStyle = colorOpacitat;
    //context.setLineDash([1,1]);
    context2.lineWidth = document.getElementById('grosor_linea_dif').value;
    context2.moveTo(x1, y1);
    context2.lineTo(x2, y2);
    context2.stroke();
    context2.closePath();
}
function borrarLinea(context2, x1, y1, x2, y2) {
    console.log("borrar");
    context2.beginPath();
    context2.lineWidth = document.getElementById('grosor_goma_dif').value;
    context2.moveTo(x1, y1);
    context2.closePath();
    context2.clearRect(x2, y2, 40, 40);ç
    

}
function dibujarCuadrado(context2, x1, y1, x2, y2) {
    
    console.log("cargas rectangulo");
    let rgbcolorVora = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitatVora = `rgba(${rgbcolorVora.r},${rgbcolorVora.g},${rgbcolorVora.b},${document.getElementById('opacitat_forma').value})`;
    let rgbcolorFons = hexToRgb(document.getElementById('selector_color2').value);
    let colorOpacitatFons = `rgba(${rgbcolorFons.r},${rgbcolorFons.g},${rgbcolorFons.b},${document.getElementById('opacitat_forma').value})`;
    context2.setLineDash([]);

    context2.strokeStyle = colorOpacitatVora;
    context2.fillStyle = colorOpacitatFons;
    context2.lineWidth = document.getElementById('grosor_forma_dif').value;
    
    if(document.getElementById('forma_plena').checked == true){
        context2.fillRect(x1, y1, x2, y2);
        context2.strokeRect(x1, y1, x2, y2);

    }else{
        context2.moveTo(x1, y1);
        context2.strokeRect(x1, y1, x2, y2);
    }
    console.log(x1, y1, x2, y2)
}
function dibujarTriangulo(context2, x1, y1, x2, y2){
        
    console.log("cargas lineas triangulo");
    let rgbcolorVora = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitatVora = `rgba(${rgbcolorVora.r},${rgbcolorVora.g},${rgbcolorVora.b},${document.getElementById('opacitat_forma').value})`;
    let rgbcolorFons = hexToRgb(document.getElementById('selector_color2').value);
    let colorOpacitatFons = `rgba(${rgbcolorFons.r},${rgbcolorFons.g},${rgbcolorFons.b},${document.getElementById('opacitat_forma').value})`;
    context2.setLineDash([]);

    context2.strokeStyle = colorOpacitatVora;
    context2.fillStyle = colorOpacitatFons;
   
    context2.beginPath(); 
    context2.lineWidth = document.getElementById('grosor_forma_dif').value;
    

    

    /*
    context2.moveTo(x1, y2);
    context2.lineTo(x2, y2);

    //context2.moveTo(x1+(x2-x1)/2, y1);
    context2.lineTo(x1, y2);

    //context2.moveTo(x1+(x2-x1)/2, y1);
    context2.lineTo(x2, y2);
    */
    

    context2.moveTo(x1+(x2-x1)/2, y1);
    context2.lineTo(x1, y2);

    //context2.moveTo(x1+(x2-x1)/2, y1);
    context2.lineTo(x2, y2);

    //context2.moveTo(x1+(x2-x1)/2, y1);
    context2.lineTo(x1+(x2-x1)/2, y1);


    context2.closePath();
    if(document.getElementById('forma_plena').checked == true){
        context2.stroke();
        context2.fill();
    }else{
        context2.stroke();
    }
     

    
    
    
}
