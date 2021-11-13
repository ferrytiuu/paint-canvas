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
    document.getElementById("cercle").addEventListener("click", dibujar_geometria_circulo);
    document.getElementById("rombe").addEventListener("click", dibujar_geometria_rombe);

    document.getElementById('icono_guardar').addEventListener('click', function (e) {

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
function dibujar_geometria_circulo(){
    eliminar_eventos()
    console.log("se crea enventos de geometria linea")
    canvas.addEventListener('mousedown',circulo_click);
    canvas.addEventListener('mousemove', circulo_moviendo);
    canvas.addEventListener('mouseup',circulo_levantar);
    
}
function circulo_click(e){
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function circulo_moviendo (e){
    if (isDrawing === true) {
       
        drawCtx.clearRect(0,0,1500,900);
        dibujarCirculo(drawCtx,x ,y,e.offsetX, e.offsetY);
        
 
    }
}
function circulo_levantar(e){
    if (isDrawing === true) {

        /*
        dibujarLinea(context,x ,e.offsetY,e.offsetX, e.offsetY);
        dibujarLinea(context,x+(e.offsetX-x)/2 ,y,x ,e.offsetY);
        dibujarLinea(context,x+(e.offsetX-x)/2 ,y,e.offsetX, e.offsetY);
        */
        dibujarCirculo(context,x ,y,e.offsetX, e.offsetY);
        drawCtx.clearRect(0,0,1500,900);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}
function dibujar_geometria_rombe(){
    eliminar_eventos()
    console.log("se crea enventos de geometria linea")
    canvas.addEventListener('mousedown',rombe_click);
    canvas.addEventListener('mousemove', rombe_moviendo);
    canvas.addEventListener('mouseup',rombe_levantar);
    
}
function rombe_click(e){

    //drawCtx.save();
    
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
    let deg = Math.PI/180;
    trasladar(drawCtx, x, y);
    drawCtx.rotate(45 * deg);
    
    

    

    
}
function rombe_moviendo (e){
    if (isDrawing === true) {
        //trasladar(drawCtx, x*-1, y*-1);
        drawCtx.clearRect(-x, -y,1500,900);
        //trasladar(drawCtx, x, y);
        dibujarRombe(drawCtx,x ,y,e.offsetX, e.offsetY);
    }
}
function rombe_levantar(e){
    if (isDrawing === true) {

        /*
        dibujarLinea(context,x ,e.offsetY,e.offsetX, e.offsetY);
        dibujarLinea(context,x+(e.offsetX-x)/2 ,y,x ,e.offsetY);
        dibujarLinea(context,x+(e.offsetX-x)/2 ,y,e.offsetX, e.offsetY);
        */

        let deg = Math.PI/180;
        //trasladar(context, x, y);
        context.rotate(45 * deg);

        dibujarRombe(context,x ,y,e.offsetX, e.offsetY);
        drawCtx.clearRect(0,0,200000,200000);
        x = 0;
        y = 0;
        isDrawing = false;
        drawCtx.setTransform(1,0,0,1,0,0);
        context.setTransform(1,0,0,1,0,0);
        
        

    
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

    canvas.removeEventListener('mousedown',circulo_click);
    canvas.removeEventListener('mousemove', circulo_moviendo);
    canvas.removeEventListener('mouseup',circulo_levantar);

    canvas.removeEventListener('mousedown',rombe_click);
    canvas.removeEventListener('mousemove', rombe_moviendo);
    canvas.removeEventListener('mouseup',rombe_levantar);



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
        context2.setLineDash([20, 20,]);
    }else{
        console.log('normal');
        context2.setLineDash([]);
    }
    //console.log(colorOpacitat);
    context2.beginPath();
    context2.strokeStyle = colorOpacitat;
    //context.setLineDash([1,1]);
    context2.lineCap = 'round';
    context2.lineWidth = document.getElementById('grosor_linea_dif').value;
    context2.moveTo(x1, y1);
    context2.lineTo(x2, y2);
    context2.stroke();
    context2.closePath();
}
function borrarLinea(context2, x1, y1, x2, y2) {
    console.log("borrar");
    //context2.beginPath();
    let grosor = document.getElementById('grosor_goma_dif').value;
    //context2.moveTo(x2, y2);
    //context2.closePath();
    context2.clearRect(x2, y2, grosor, grosor);
    

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
function dibujarCirculo(context2, x1, y1, x2, y2) {
    
    console.log("cargas circulo");
    let rgbcolorVora = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitatVora = `rgba(${rgbcolorVora.r},${rgbcolorVora.g},${rgbcolorVora.b},${document.getElementById('opacitat_forma').value})`;
    let rgbcolorFons = hexToRgb(document.getElementById('selector_color2').value);
    let colorOpacitatFons = `rgba(${rgbcolorFons.r},${rgbcolorFons.g},${rgbcolorFons.b},${document.getElementById('opacitat_forma').value})`;
    context2.setLineDash([]);

    context2.strokeStyle = colorOpacitatVora;
    context2.fillStyle = colorOpacitatFons;
    context2.lineWidth = document.getElementById('grosor_forma_dif').value;

    context2.beginPath();
    let radio = Math.sqrt(((y2-y1)*(y2-y1))+((x2-x1)*(x2-x1)));
    let diferenciaX = (x2-x1)+x1;
    let diferenciaY =  (y2-y1)+y1;
    context2.arc(diferenciaX,diferenciaY, radio, 0, 2 * Math.PI, false);
    
    context2.strokeStyle = '#003300';
    if(document.getElementById('forma_plena').checked == true){
        context2.stroke();
        context2.fill();
    }else{
        context2.stroke();
    }
    
    console.log(x1, y1, x2, y2)
}
function dibujarRombe(context2, x1, y1, x2, y2) {
    
    
    console.log("cargas rombo");
    let rgbcolorVora = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitatVora = `rgba(${rgbcolorVora.r},${rgbcolorVora.g},${rgbcolorVora.b},${document.getElementById('opacitat_forma').value})`;
    let rgbcolorFons = hexToRgb(document.getElementById('selector_color2').value);
    let colorOpacitatFons = `rgba(${rgbcolorFons.r},${rgbcolorFons.g},${rgbcolorFons.b},${document.getElementById('opacitat_forma').value})`;

    
    let width = Math.abs(x2 - x1) * (x2 < x1 ? -1 : 1);
    let height = Math.abs(width) * (y2 < y1 ? -1 : 1);
    
    //trasladar(context2, x1, y1, x2, y2)
    context2.rect(0, 0, width, height);
    context2.fill();
    

    console.log(x1, y1, x2, y2)
}
function trasladar(context2, x1, y1){
    /*
    let width = Math.abs(x2 - x1) * (x2 < x1 ? -1 : 1);
    let height = Math.abs(width) * (y2 < y1 ? -1 : 1);

    let diferenciaX = (x1+height)/2;
    let diferenciaY =  (y1+width)/2;

    */

    
    context2.translate(x1, y1);
    
    //console.log("diferenciaX: "+diferenciaX+"diferenciaY: "+diferenciaY);
    
    
}

function guardar(){
    let link = document.createElement('a');
    let nomarxiu = document.getElementById('nom_arxiu_guardar').value;
    console.log(nomarxiu);
    link.download = nomarxiu+'.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
}


document.getElementById('enviar_nom_arxiu').addEventListener('click', function (e) {
    guardar();
});