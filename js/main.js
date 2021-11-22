window.addEventListener('load', carga);


function menu_seleccion_desactivar(elementos) {
    Array.prototype.forEach.call(elementos, function (caja) {
        console.log("cosa " + caja.getAttribute('icn_no_pulsado'));
        caja.src = caja.getAttribute('icn_no_pulsado');
        caja.setAttribute('pulsado', false)

    });
    let subCajas = document.getElementsByClassName("sub_caja");
    Array.prototype.forEach.call(subCajas, function (caja) {
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
let imatge_forma;
let imatge_insertar;

const canvas = document.getElementById('area');
const context = canvas.getContext('2d');

const drawCanvas = document.getElementById('area2');
const drawCtx = drawCanvas.getContext("2d");

function carga() {

    WebFont.load({
        google: {
            families: ['Permanent Marker', 'Architects Daughter','Pacifico']
        }
      });

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
    
    document.getElementById("arxiu").addEventListener('change', function () {
        imatge_forma = document.getElementById("arxiu").files[0];
        console.log(imatge_forma);
    });
    /*document.getElementById("pujar_arxiu_seleccio").addEventListener('change', function (e) {
        imatge_insertar  = document.getElementById("pujar_arxiu_seleccio").files[0];
        console.log("Imaget a insertar: "+imatge_insertar);   
    });*/

    document.getElementById('icono_imagen').addEventListener('click', function (e) {
        console.log("aqui");

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
            dibujar_imagen_insertar();

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

        }

    });
    document.getElementById('icono_texto').addEventListener('click', function (e) {

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
            dibujar_texto_rectangulo();

        }
    });
    document.getElementById('icono_seleccion').addEventListener('click', function (e) {

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
            rotar_seleccio();

        }

    });
    document.getElementById("linea").addEventListener("click", dibujar_geometria_linea);
    document.getElementById("cuadrado").addEventListener("click", dibujar_geometria_cuadrado);
    document.getElementById("rectangulo").addEventListener("click", dibujar_geometria_rectangulo);
    document.getElementById("triangulo").addEventListener("click", dibujar_geometria_triangulo);
    document.getElementById("cercle").addEventListener("click", dibujar_geometria_circulo);
    //document.getElementById("rombe").addEventListener("click", dibujar_geometria_rombe);
    document.getElementById("negatiu").addEventListener("click", canvas_negatiu);
    document.getElementById("gris").addEventListener("click", canvas_gris);


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

    document.getElementById('enviar_nom_arxiu').addEventListener('click', function (e) {
        let link = document.createElement('a');
        let nomarxiu = document.getElementById('nom_arxiu_guardar').value;
        console.log(nomarxiu);
        link.download = nomarxiu + '.png';
        link.href = canvas.toDataURL();
        link.click();
        link.delete;
    });


}
function canvas_negatiu() {
    console.log("se pasa el canvas a negativo");
    var destX = 0;
    var destY = 0;

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;
    for (var i = 0; i < pixels.length; i += 4) {
        pixels[i] = 255 - pixels[i]; // red
        pixels[i+1] = 255 - pixels[i+1]; // green
        pixels[i+2] = 255 - pixels[i+2]; // blue
        // i+3 es alpha
    }
    // modifiquem original
    context.putImageData(imageData, 0, 0);


}
function canvas_gris() {
    console.log("se pasa el canvas a gris");
    var destX = 0;
    var destY = 0;

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;
    for (var i = 0; i < pixels.length; i += 4) {
        var med = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        // set it to each value (r = g = b = med)
        pixels[i] = pixels[i + 1] = pixels[i + 2] = med;


        // i+3 es alpha
    }
    // modifiquem original
    context.putImageData(imageData, 0, 0);


}

function dibujar_pincel() {
    console.log("se crea enventos de pincel")
    canvas.addEventListener('mousedown', dibujar_click);
    canvas.addEventListener('mousemove', dibujar_moviendo);
    canvas.addEventListener('mouseup', dibujar_levantar);

}
function dibujar_click(e) {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function dibujar_moviendo(e) {
    if (isDrawing === true) {
        dibujarLinea(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;

    }
}
function dibujar_levantar(e) {
    if (isDrawing === true) {
        dibujarLinea(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}
function dibujar_geometria_linea() {
    eliminar_eventos();
    console.log("se crea enventos de pincel")
    canvas.addEventListener('mousedown', dibujar_linea_click);
    canvas.addEventListener('mousemove', dibujar_linea_moviendo);
    canvas.addEventListener('mouseup', dibujar_linea_levantar);

}
function dibujar_linea_click(e) {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function dibujar_linea_moviendo(e) {
    if (isDrawing === true) {
        drawCtx.clearRect(0, 0, 1500, 900);
        dibujar_geometria_Linea(drawCtx, x, y, e.offsetX, e.offsetY);
        //x = e.offsetX;
        //y = e.offsetY;

    }
}
function dibujar_linea_levantar(e) {
    if (isDrawing === true) {
        drawCtx.clearRect(0, 0, 1500, 900);
        dibujar_geometria_Linea(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}

function dibujar_goma() {
    eliminar_eventos();
    console.log("se crea enventos de borrar linea")
    canvas.addEventListener('mousedown', goma_click);
    canvas.addEventListener('mousemove', goma_moviendo);
    canvas.addEventListener('mouseup', goma_levantar);

}
function goma_click(e) {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function goma_moviendo(e) {
    if (isDrawing === true) {
        borrarLinea(context, x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
}
function goma_levantar(e) {
    if (isDrawing === true) {
        borrarLinea(context, x, y, e.offsetX, e.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}


function dibujar_imagen_insertar() {
    eliminar_eventos();
    console.log("se crea enventos de geometria linea")
    canvas.addEventListener('mousedown', imagen_click);
    canvas.addEventListener('mousemove', imagen_moviendo);
    canvas.addEventListener('mouseup', imagen_levantar);

}
function imagen_click(e) {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function imagen_moviendo(e) {
    if (isDrawing === true) {
        drawCtx.clearRect(0, 0, 1500, 900);
        Seleecion_insertar_imagen(drawCtx, x, y, e.offsetX - x, e.offsetY - y, true);

    }
}
function imagen_levantar(e) {
    if (isDrawing === true) {
        Seleecion_insertar_imagen(context, x, y, e.offsetX - x, e.offsetY - y, false);
        drawCtx.clearRect(0, 0, 1500, 900);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}


function dibujar_geometria_cuadrado() {
    eliminar_eventos();
    console.log("se crea enventos de geometria linea")
    canvas.addEventListener('mousedown', cuadrado_click);
    canvas.addEventListener('mousemove', cuadrado_moviendo);
    canvas.addEventListener('mouseup', cuadrado_levantar);

}
function cuadrado_click(e) {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function cuadrado_moviendo(e) {
    if (isDrawing === true) {
        //drawCtx.setTransform(1,0,0,1,0,0);
        drawCtx.clearRect(0, 0, 1500, 900);
        dibujarCuadrado(drawCtx, x, y, e.offsetX - x, e.offsetY - y, false);

    }
}
function cuadrado_levantar(e) {
    if (isDrawing === true) {
        drawCtx.clearRect(0, 0, 1500, 900);
        dibujarCuadrado(context, x, y, e.offsetX - x, e.offsetY - y, true);

        x = 0;
        y = 0;
        isDrawing = false;
    }

}
function dibujar_geometria_rectangulo() {
    eliminar_eventos();
    console.log("se crea enventos de geometria linea")
    canvas.addEventListener('mousedown', rectangulo_click);
    canvas.addEventListener('mousemove', rectangulo_moviendo);
    canvas.addEventListener('mouseup', rectangulo_levantar);

}
function rectangulo_click(e) {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function rectangulo_moviendo(e) {
    if (isDrawing === true) {

        drawCtx.clearRect(0, 0, 1500, 900);
        dibujarRectangulo(drawCtx, x, y, e.offsetX - x, e.offsetY - y);

    }
}
function rectangulo_levantar(e) {
    if (isDrawing === true) {
        dibujarRectangulo(context, x, y, e.offsetX - x, e.offsetY - y);
        drawCtx.clearRect(0, 0, 1500, 900);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}
function dibujar_geometria_triangulo() {
    eliminar_eventos()
    console.log("se crea enventos de geometria linea")
    canvas.addEventListener('mousedown', triangulo_click);
    canvas.addEventListener('mousemove', triangulo_moviendo);
    canvas.addEventListener('mouseup', triangulo_levantar);

}
function triangulo_click(e) {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function triangulo_moviendo(e) {
    if (isDrawing === true) {

        drawCtx.clearRect(0, 0, 1500, 900);
        dibujarTriangulo(drawCtx, x, y, e.offsetX, e.offsetY);


    }
}
function triangulo_levantar(e) {
    if (isDrawing === true) {
        dibujarTriangulo(context, x, y, e.offsetX, e.offsetY);
        drawCtx.clearRect(0, 0, 1500, 900);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}
function dibujar_geometria_circulo() {
    eliminar_eventos()
    console.log("se crea enventos de geometria linea")
    canvas.addEventListener('mousedown', circulo_click);
    canvas.addEventListener('mousemove', circulo_moviendo);
    canvas.addEventListener('mouseup', circulo_levantar);

}
function circulo_click(e) {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function circulo_moviendo(e) {
    if (isDrawing === true) {

        drawCtx.clearRect(0, 0, 1500, 900);
        dibujarCirculo(drawCtx, x, y, e.offsetX, e.offsetY);


    }
}
function circulo_levantar(e) {
    if (isDrawing === true) {
        dibujarCirculo(context, x, y, e.offsetX, e.offsetY);
        drawCtx.clearRect(0, 0, 1500, 900);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}
/*
function dibujar_geometria_rombe() {
    eliminar_eventos()
    console.log("se crea enventos de geometria linea")
    canvas.addEventListener('mousedown', rombe_click);
    canvas.addEventListener('mousemove', rombe_moviendo);
    canvas.addEventListener('mouseup', rombe_levantar);

}
function rombe_click(e) {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
    let deg = Math.PI / 180;
    trasladar(drawCtx,document.getElementById("Rotar").value, x, y);

}
function rombe_moviendo(e) {
    if (isDrawing === true) {
        //trasladar(drawCtx, x*-1, y*-1);
        drawCtx.clearRect(-x, -y, 1500, 900);
        //trasladar(drawCtx, x, y);
        dibujarRombe(drawCtx, x, y, e.offsetX, e.offsetY);
    }
}

function rombe_levantar(e) {
    if (isDrawing === true) {
        let deg = Math.PI / 180;
        //trasladar(context, x, y);
        context.rotate(45 * deg);

        dibujarRombe(context, x, y, e.offsetX, e.offsetY);
        drawCtx.clearRect(0, 0, 200000, 200000);
        x = 0;
        y = 0;
        isDrawing = false;
        drawCtx.setTransform(1, 0, 0, 1, 0, 0);
        context.setTransform(1, 0, 0, 1, 0, 0);
    }

}*/
function dibujar_texto_rectangulo() {
    eliminar_eventos();
    console.log("se crea enventos de rectangulo texto")
    canvas.addEventListener('mousedown', rectangulo_texto_click);
    canvas.addEventListener('mousemove', rectangulo_text_moviendo);
    canvas.addEventListener('mouseup', rectangulo_texto_levantar);

}
function rectangulo_texto_click(e) {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}
function rectangulo_text_moviendo(e) {
    if (isDrawing === true) {

        drawCtx.clearRect(0, 0, 1500, 900);
        dibujartextoRectangulo(drawCtx, x - 20, y - 40, e.offsetX - x, e.offsetY - y, true);

    }
}
function rectangulo_texto_levantar(e) {
    if (isDrawing === true) {
        dibujartextoRectangulo(context, x - 20, y - 40, e.offsetX - x, e.offsetY - y, false);
        drawCtx.clearRect(0, 0, 1500, 900);
        x = 0;
        y = 0;
        isDrawing = false;
    }

}
/*
function rotar_seleccio() {
    console.log("se crea enventos de pincel")
    canvas.addEventListener('mousedown', rotar_click);
    canvas.addEventListener('mousemove', rotar_click_moviendo);
    canvas.addEventListener('mouseup', rotar_click_levantar);

}
function rotar_click(e) {
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
    
}
function rotar_click_moviendo(e) {
    if (isDrawing === true) {
        drawCtx.clearRect(0, 0, 1500, 900);
        Seleecio_rotar(drawCtx, x, y , e.offsetX - x, e.offsetY - y,e.offsetX,e.offsetY, true);

    }
}
function rotar_click_levantar(e) {
    if (isDrawing === true) {
        Seleecio_rotar(context, x, y , e.offsetX - x, e.offsetY - y,e.offsetX,e.offsetY, false);
        drawCtx.clearRect(0, 0, 1500, 900);
       
        x = 0;
        y = 0;
        isDrawing = false;
    }

}
*/
function eliminar_eventos() {
    console.log("se ejecuta eliminar eventos");

    canvas.removeEventListener('mousemove', dibujar_moviendo);
    canvas.removeEventListener('mousedown', dibujar_click);
    canvas.removeEventListener('mouseup', dibujar_levantar);

    canvas.removeEventListener('mousedown', dibujar_linea_click);
    canvas.removeEventListener('mousemove', dibujar_linea_moviendo);
    canvas.removeEventListener('mouseup', dibujar_linea_levantar);

    canvas.removeEventListener('mousedown', goma_click);
    canvas.removeEventListener('mousemove', goma_moviendo);
    canvas.removeEventListener('mouseup', goma_levantar);

    canvas.removeEventListener('mousedown', cuadrado_click);
    canvas.removeEventListener('mousemove', cuadrado_moviendo);
    canvas.removeEventListener('mouseup', cuadrado_levantar);

    canvas.removeEventListener('mousedown', rectangulo_click);
    canvas.removeEventListener('mousemove', rectangulo_moviendo);
    canvas.removeEventListener('mouseup', rectangulo_levantar);

    canvas.removeEventListener('mousedown', triangulo_click);
    canvas.removeEventListener('mousemove', triangulo_moviendo);
    canvas.removeEventListener('mouseup', triangulo_levantar);

    canvas.removeEventListener('mousedown', circulo_click);
    canvas.removeEventListener('mousemove', circulo_moviendo);
    canvas.removeEventListener('mouseup', circulo_levantar);

    /*
    canvas.removeEventListener('mousedown', rombe_click);
    canvas.removeEventListener('mousemove', rombe_moviendo);
    canvas.removeEventListener('mouseup', rombe_levantar);
    */

    canvas.removeEventListener('mousedown', rectangulo_texto_click);
    canvas.removeEventListener('mousemove', rectangulo_text_moviendo);
    canvas.removeEventListener('mouseup', rectangulo_texto_levantar);

    canvas.removeEventListener('mousedown', imagen_click);
    canvas.removeEventListener('mousemove', imagen_moviendo);
    canvas.removeEventListener('mouseup', imagen_levantar);

    /*
    canvas.removeEventListener('mousedown', rotar_click);
    canvas.removeEventListener('mousemove', rotar_click_moviendo);
    canvas.removeEventListener('mouseup', rotar_click_levantar);
    */


}
function hexToRgb(hex) { //funció per passar HEX a R G B
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function dibujar_geometria_Linea(context2, x1, y1, x2, y2) {
    console.log("cargas lineas");
    let rgbcolorVora = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitatVora = `rgba(${rgbcolorVora.r},${rgbcolorVora.g},${rgbcolorVora.b},${document.getElementById('opacitat_forma').value})`;
    let rgbcolorFons = hexToRgb(document.getElementById('selector_color2').value);
    let colorOpacitatFons = `rgba(${rgbcolorFons.r},${rgbcolorFons.g},${rgbcolorFons.b},${document.getElementById('opacitat_forma').value})`;
    let valores = document.getElementById('tipus_linea').options[document.getElementById('tipus_linea').selectedIndex].value;
    console.log(valores);
    valores = parseInt(valores);

    if (valores == 1) {
        console.log('punts');
        context2.setLineDash([]);
    } else if (valores == 2) {
        console.log('linies');
        context2.setLineDash([1, 1,]);
    }
    else if (valores == 3) {
        console.log('normal');
        context2.setLineDash([10, 10]);
    }
    else if (valores == 4) {
        console.log('normal');
        context2.setLineDash([20, 5]);
    }

    //console.log(colorOpacitat);
    context2.beginPath();
    context2.strokeStyle = colorOpacitatVora;
    //context.setLineDash([1,1]);
    context2.lineCap = 'round';
    context2.lineWidth = document.getElementById('grosor_forma_dif').value;
    context2.moveTo(x1, y1);
    context2.lineTo(x2, y2);
    context2.stroke();
    context2.closePath();
}


function dibujarLinea(context2, x1, y1, x2, y2) {
    console.log("cargas lineas");
    let rgbcolor = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitat = `rgba(${rgbcolor.r},${rgbcolor.g},${rgbcolor.b},${document.getElementById('opacitat_linea').value})`;
    let valores = document.getElementById('tipus_linea').options[document.getElementById('tipus_linea').selectedIndex].value;
    console.log(valores);
    valores = parseInt(valores);

    if (valores == 1) {
        console.log('punts');
        context2.setLineDash([]);
    } else if (valores == 2) {
        console.log('linies');
        context2.setLineDash([1, 1,]);
    }
    else if (valores == 3) {
        console.log('normal');
        context2.setLineDash([10, 10]);
    }
    else if (valores == 4) {
        console.log('normal');
        context2.setLineDash([20, 5]);
    }

    context2.beginPath();
    context2.strokeStyle = colorOpacitat;
    //context.setLineDash([1,1]);
    context2.lineCap = 'round';
    context2.lineWidth = document.getElementById('grosor_forma_dif_ma').value;
    context2.moveTo(x1, y1);
    context2.lineTo(x2, y2);
    context2.stroke();
    context2.closePath();
}
function borrarLinea(context2, x1, y1, x2, y2) {
    console.log("borrar");
    //context2.beginPath();
    let grosor = document.getElementById('grosor_forma_dif_goma').value;
    //context2.moveTo(x2, y2);
    //context2.closePath();
    context2.clearRect(x2, y2, grosor, grosor);


}
function dibujarCuadrado(context2, x1, y1, x2, y2, final) {

    console.log("cargas rectangulo");
    let rgbcolorVora = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitatVora = `rgba(${rgbcolorVora.r},${rgbcolorVora.g},${rgbcolorVora.b},${document.getElementById('opacitat_forma').value})`;
    let rgbcolorFons = hexToRgb(document.getElementById('selector_color2').value);
    let colorOpacitatFons = `rgba(${rgbcolorFons.r},${rgbcolorFons.g},${rgbcolorFons.b},${document.getElementById('opacitat_forma').value})`;
    //ontext2.setLineDash([]);

    context2.strokeStyle = colorOpacitatVora;
    context2.fillStyle = colorOpacitatFons;
    context2.lineWidth = document.getElementById('grosor_forma_dif').value;

    let valores = document.getElementById('tipus_linea').options[document.getElementById('tipus_linea').selectedIndex].value;
    console.log(valores);
    valores = parseInt(valores);


    if (valores == 1) {
        console.log('punts');
        context2.setLineDash([]);
    } else if (valores == 2) {
        console.log('linies');
        context2.setLineDash([1, 1,]);
    }
    else if (valores == 3) {
        console.log('normal');
        context2.setLineDash([10, 10]);
    }
    else if (valores == 4) {
        console.log('normal');
        context2.setLineDash([20, 5]);
    }

    context2.strokeStyle = colorOpacitatVora;
    context2.fillStyle = colorOpacitatFons;
    context2.lineWidth = document.getElementById('grosor_forma_dif').value;

    if (final) {
        let final_value;
        if (x2 >= y2) {
            final_value = x2;
        }
        else if (y2 >= x2) {
            final_value = y2;
        }
        if (document.getElementById('forma_plena').checked == true) {
            context2.fillRect(x1, y1, final_value, final_value);
            context2.strokeRect(x1, y1, final_value, final_value);

        } else if (document.getElementById('forma_imatge').checked == true) {
            console.log(imatge_forma.name);
            let imatge = new Image();
            imatge.src = URL.createObjectURL(imatge_forma);
            imatge.onload = function () {
                let patktern = context2.createPattern(imatge, 'repeat');
                context2.fillStyle = pattern;
                context2.fillRect(x1, y1, final_value, final_value);
            }
            context2.strokeRect(x1, y1, final_value, final_value);

        } else {
            context2.moveTo(x1, y1);
            context2.strokeRect(x1, y1, final_value, final_value);
        }
        return;

    }

    if (document.getElementById('forma_plena').checked == true) {
        context2.fillRect(x1, y1, x2, y2);
        context2.strokeRect(x1, y1, x2, y2);

    } else {
        context2.moveTo(x1, y1);
        context2.strokeRect(x1, y1, x2, y2);
    }
    console.log(x1, y1, x2, y2)
}
function dibujarRectangulo(context2, x1, y1, x2, y2) {

    console.log("cargas rectangulo");
    let rgbcolorVora = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitatVora = `rgba(${rgbcolorVora.r},${rgbcolorVora.g},${rgbcolorVora.b},${document.getElementById('opacitat_forma').value})`;
    let rgbcolorFons = hexToRgb(document.getElementById('selector_color2').value);
    let colorOpacitatFons = `rgba(${rgbcolorFons.r},${rgbcolorFons.g},${rgbcolorFons.b},${document.getElementById('opacitat_forma').value})`;
    let valores = document.getElementById('tipus_linea').options[document.getElementById('tipus_linea').selectedIndex].value;
    console.log(valores);
    valores = parseInt(valores);

    if (valores == 1) {
        console.log('punts');
        context2.setLineDash([]);
    } else if (valores == 2) {
        console.log('linies');
        context2.setLineDash([1, 1,]);
    }
    else if (valores == 3) {
        console.log('normal');
        context2.setLineDash([10, 10]);
    }
    else if (valores == 4) {
        console.log('normal');
        context2.setLineDash([20, 5]);
    }

    context2.strokeStyle = colorOpacitatVora;
    context2.fillStyle = colorOpacitatFons;
    context2.lineWidth = document.getElementById('grosor_forma_dif').value;

    if (document.getElementById('forma_plena').checked == true) {
        context2.fillRect(x1, y1, x2, y2);
        context2.strokeRect(x1, y1, x2, y2);

    } else if (document.getElementById('forma_imatge').checked == true) {
        console.log(imatge_forma.name);
        let imatge = new Image();
        imatge.src = URL.createObjectURL(imatge_forma);
        imatge.onload = function(){
            let pattern = context2.createPattern(imatge, 'repeat');
            context2.fillStyle = pattern;
            context2.fillRect(x1, y1, x2, y2);
        }
        context2.strokeRect(x1, y1, x2, y2);
    } else {
        context2.moveTo(x1, y1);
        context2.strokeRect(x1, y1, x2, y2);
    }
    console.log(x1, y1, x2, y2)
}
function dibujarTriangulo(context2, x1, y1, x2, y2) {

    console.log("cargas lineas triangulo");
    let rgbcolorVora = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitatVora = `rgba(${rgbcolorVora.r},${rgbcolorVora.g},${rgbcolorVora.b},${document.getElementById('opacitat_forma').value})`;
    let rgbcolorFons = hexToRgb(document.getElementById('selector_color2').value);
    let colorOpacitatFons = `rgba(${rgbcolorFons.r},${rgbcolorFons.g},${rgbcolorFons.b},${document.getElementById('opacitat_forma').value})`;
    let valores = document.getElementById('tipus_linea').options[document.getElementById('tipus_linea').selectedIndex].value;
    console.log(valores);
    valores = parseInt(valores);

    if (valores == 1) {
        console.log('punts');
        context2.setLineDash([]);
    } else if (valores == 2) {
        console.log('linies');
        context2.setLineDash([1, 1,]);
    }
    else if (valores == 3) {
        console.log('normal');
        context2.setLineDash([10, 10]);
    }
    else if (valores == 4) {
        console.log('normal');
        context2.setLineDash([20, 5]);
    }

    context2.strokeStyle = colorOpacitatVora;
    context2.fillStyle = colorOpacitatFons;

    context2.beginPath();
    context2.lineWidth = document.getElementById('grosor_forma_dif').value;


    context2.moveTo(x1 + (x2 - x1) / 2, y1);
    context2.lineTo(x1, y2);

    //context2.moveTo(x1+(x2-x1)/2, y1);
    context2.lineTo(x2, y2);

    //context2.moveTo(x1+(x2-x1)/2, y1);
    context2.lineTo(x1 + (x2 - x1) / 2, y1);


    context2.closePath();
    if (document.getElementById('forma_plena').checked == true) {
        context2.stroke();
        context2.fill();
    } else if (document.getElementById('forma_imatge').checked == true) {
        context2.stroke();let imatge = new Image();
        imatge.src = URL.createObjectURL(imatge_forma);
        imatge.onload = function(){
            let pattern = context2.createPattern(imatge, 'repeat');
            context2.fillStyle = pattern;
            context2.fill();
        }
        context2.stroke();
    } else {
        context2.stroke();
    }
    
}
function dibujarCirculo(context2, x1, y1, x2, y2) {

    console.log("cargas circulo");
    let rgbcolorVora = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitatVora = `rgba(${rgbcolorVora.r},${rgbcolorVora.g},${rgbcolorVora.b},${document.getElementById('opacitat_forma').value})`;
    let rgbcolorFons = hexToRgb(document.getElementById('selector_color2').value);
    let colorOpacitatFons = `rgba(${rgbcolorFons.r},${rgbcolorFons.g},${rgbcolorFons.b},${document.getElementById('opacitat_forma').value})`;
    let valores = document.getElementById('tipus_linea').options[document.getElementById('tipus_linea').selectedIndex].value;
    console.log(valores);
    valores = parseInt(valores);

    if (valores == 1) {
        console.log('punts');
        context2.setLineDash([]);
    } else if (valores == 2) {
        console.log('linies');
        context2.setLineDash([1, 1,]);
    }
    else if (valores == 3) {
        console.log('normal');
        context2.setLineDash([10, 10]);
    }
    else if (valores == 4) {
        console.log('normal');
        context2.setLineDash([20, 5]);
    }

    context2.strokeStyle = colorOpacitatVora;
    context2.fillStyle = colorOpacitatFons;
    context2.lineWidth = document.getElementById('grosor_forma_dif').value;

    context2.beginPath();
    let radio = Math.sqrt(((y2 - y1) * (y2 - y1)) + ((x2 - x1) * (x2 - x1)));
    let diferenciaX = (x2 - x1) + x1;
    let diferenciaY = (y2 - y1) + y1;
    context2.arc(diferenciaX, diferenciaY, radio, 0, 2 * Math.PI, false);

    if (document.getElementById('forma_plena').checked == true) {
        context2.stroke();
        context2.fill();
    } else if (document.getElementById('forma_imatge').checked == true) {
        context2.stroke();let imatge = new Image();
        imatge.src = URL.createObjectURL(imatge_forma);
        imatge.onload = function(){
            let pattern = context2.createPattern(imatge, 'repeat');
            context2.fillStyle = pattern;
            context2.fill();
        }
        context2.stroke();
    } else {
        context2.stroke();
    }

    console.log(x1, y1, x2, y2)
}
/*
function dibujarRombe(context2, x1, y1, x2, y2) {


    console.log("cargas rombo");
    let rgbcolorVora = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitatVora = `rgba(${rgbcolorVora.r},${rgbcolorVora.g},${rgbcolorVora.b},${document.getElementById('opacitat_forma').value})`;
    let rgbcolorFons = hexToRgb(document.getElementById('selector_color2').value);
    let colorOpacitatFons = `rgba(${rgbcolorFons.r},${rgbcolorFons.g},${rgbcolorFons.b},${document.getElementById('opacitat_forma').value})`;
    let valores = document.getElementById('tipus_linea').options[document.getElementById('tipus_linea').selectedIndex].value;
    console.log(valores);
    valores = parseInt(valores);

    if (valores == 1) {
        console.log('punts');
        context2.setLineDash([]);
    } else if (valores == 2) {
        console.log('linies');
        context2.setLineDash([1, 1,]);
    }
    else if (valores == 3) {
        console.log('normal');
        context2.setLineDash([10, 10]);
    }
    else if (valores == 4) {
        console.log('normal');
        context2.setLineDash([20, 5]);
    }


    let width = Math.abs(x2 - x1) * (x2 < x1 ? -1 : 1);
    let height = Math.abs(width) * (y2 < y1 ? -1 : 1);

    //trasladar(context2, x1, y1, x2, y2)
    context2.rect(0, 0, width, height);
    context2.fill();


    console.log(x1, y1, x2, y2)
}
*/
function dibujartextoRectangulo(context2, x1, y1, x2, y2, estado) {

    console.log("cargas rectangulo");
    let rgbcolorVora = hexToRgb(document.getElementById('selector_color').value);
    let colorOpacitatVora = `rgba(${rgbcolorVora.r},${rgbcolorVora.g},${rgbcolorVora.b},${document.getElementById('opacitat_forma').value})`;
    let rgbcolorFons = hexToRgb(document.getElementById('selector_color2').value);
    let colorOpacitatFons = `rgba(${rgbcolorFons.r},${rgbcolorFons.g},${rgbcolorFons.b},${document.getElementById('opacitat_forma').value})`;
    let valores = document.getElementById('tipus_linea').options[document.getElementById('tipus_linea').selectedIndex].value;
    console.log(valores);
    valores = parseInt(valores);



    console.log('normal');
    context2.setLineDash([10, 10]);


    context2.strokeStyle = colorOpacitatVora;
    context2.fillStyle = "black";
    context2.lineWidth = document.getElementById('grosor_forma_dif').value;

    let text = document.getElementById('text').value;
     //= 'italic 50px Pacifico ';
    let lineHeight = 40;
    let font = document.getElementById('mida_font').value;
    let tipus_font = document.getElementById('select_font').options[document.getElementById('select_font').selectedIndex].value;
    let sub_tipus = document.querySelector('input[name="subtipus_font"]:checked').value;

    context2.font = `${sub_tipus} ${font}px ${tipus_font}`


    x2 = x2 || 0;

    if (x2 <= 0) {
        context.fillText(text, x1, y1);
        return;
    }
    var words = text.split(/[\s,\r\n]+/);
    var currentLine = 0;
    var idx = 1;
    while (words.length > 0 && idx <= words.length) {
        var str = words.slice(0, idx).join(' ');
        var w = context2.measureText(str).width;
        if (w > x2) {
            if (idx == 1) {
                idx = 2;
            }
            context2.fillText(words.slice(0, idx - 1).join(' '), x, y + (lineHeight * currentLine), x2);
            currentLine++;
            words = words.splice(idx - 1);
            idx = 1;
        }
        else { idx++; }
    }
    if (idx > 0)
        context2.fillText(words.join(' '), x, y + (lineHeight * currentLine), x2);

    if (estado) {
            context2.moveTo(x1, y1);
            context2.strokeRect(x1, y1, x2, y2);

    }

    console.log(x1, y1, x2, y2)
}
function Seleecion_insertar_imagen(context2, x1, y1, x2, y2,estado) {

    console.log("cargas imagen");
  

    let imatge_source = document.getElementById('imatge_precarregade').options[document.getElementById('imatge_precarregade').selectedIndex].value;

    context2.setLineDash([10, 10]);
    if (estado) {
        context2.strokeRect(x1, y1, x2, y2);

    }
    context2.stroke();
    let imatge = new Image();
    imatge.src = imatge_source;
    imatge.onload = function(){
        context2.drawImage(imatge, x1, y1 , x2,y2);
    }



}
/*
function Seleecio_rotar(context2, x1, y1, x2, y2,x3,y3,estado) {

    console.log("cargas imagen");
  

    let imatge_source = document.getElementById('imatge_precarregade').options[document.getElementById('imatge_precarregade').selectedIndex].value;

    context2.setLineDash([10, 10]);
    if (estado) {
        console.log("nada");
        context2.strokeRect(x1, y1, x2, y2);
        return

    }

    context2.save();
    var imageData = context.getImageData(x1, y1, x2, y2);
    
    context2.clearRect(x1,y1,x2, y2);
    console.log("Hace la intencion "+x1,y1,x2, y2)
    
    let xmedia = (x1+x3)/2;
    let ymedia = (y1+y3)/2;
    console.log("Puntos medios: "+xmedia+" "+ymedia);
    //trasladar(context2,document.getElementById("Rotar").value, xmedia, ymedia)

    let angulo = document.getElementById("Rotar").value
    
    context.translate(x1, y1);
    context.rotate(45 * Math.PI / 180);
    
    console.log(x1,y1,angulo)

    context.putImageData(imageData, 0,0);

    

    context.setTransform(1, 0, 0, 1, 0, 0);

}
function trasladar(context2,angulo, x1, y1) {
    
    
    
    context2.translate(x1, y1);
    context2.rotate(Number.parseInt(angulo) * (Math.PI / 180));
    console.log(x1,y1,Number.parseInt(angulo))

}
*/

