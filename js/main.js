import { pulsar_raton as pulsar_raton_dibujo_pincel,movimiento_raton as movimiento_raton_dibujo_pincel,levantar_raton as levantar_raton_dibujo_pincel  }  from './dibujo_pincel.js';
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


function carga () {

    
    
    let isDrawing = false;
    let x = 0;
    let y = 0;

    const canvas = document.getElementById('area');
    const context = canvas.getContext('2d');


    document.getElementById('icono_pincel').addEventListener('click', function (e) {

        let estado = this.getAttribute("pulsado");

        if (estado === 'true') {

            menu_seleccion_desactivar(document.getElementsByClassName("icono"));
            this.setAttribute("pulsado", "false");
        }
        else {
            menu_seleccion_desactivar(document.getElementsByClassName("icono"));
            menu_seleccion_activar(this);

            //crear eventos
            pulsar_raton_dibujo_pincel(isDrawing,x,y,canvas);
            movimiento_raton_dibujo_pincel(isDrawing,x,y,canvas,context);
            levantar_raton_dibujo_pincel(isDrawing,x,y,canvas,context);


        }

    });
    document.getElementById('icono_goma').addEventListener('click', function (e) {

        let estado = this.getAttribute("pulsado");

        if (estado === 'true') {

            menu_seleccion_desactivar(document.getElementsByClassName("icono"));
            this.setAttribute("pulsado", "false");
        }
        else {
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
