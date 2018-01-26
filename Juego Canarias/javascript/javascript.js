var dificultadIslas;
var dificultadImagenes;
var arrayIslas = ["img/palma.gif", "img/hierro.gif", "img/grancanaria.gif", "img/lanzarote.gif", "img/gomera.gif", "img/fuerteventura.gif", "img/tenerife.gif"];
var arrayPaisajes = ["img/palma_1.jpg", "img/gomera_1.jpg", "img/fuerteventura_1.jpg", "img/grancanaria_1.jpg", "img/grancanaria_2.jpg", "img/hierro_1.jpg", "img/tenerife_1.jpg", "img/tenerife_2.jpg", "img/lanzarote_1.jpg"];
var arrayImagenes = [];
var arrayIslasRepetido = [];
var arrayIslasJugadas = [];
var puntuacion=0;
var puntos=0;

/**
 * Carga la caja del nombre y la hace redimensionable. Hace que la ventana modal se abra con el botón empezar.
 */
$(document).ready(function() {
    $(function() {$("#nombre").resizable()});
    $("#nombre").val(localStorage.getItem("Nombre"));

    $("#empezar").on("click", function() {
        if($("#nombre").val() != "") {
            $("#vModal").dialog("open");
        }
        else {
            toastr.error("Introduce tu nombre",'Error');
        }
    });

    $("#comprobar").on("click", function() {
        $("#vTerminar").dialog("option", "width", 700);
        $("#vTerminar").dialog("open");
    });
});

/**
 * Ventana modal de dificultad
 */
$(function() {
    $("#vModal").dialog({
        title:"Seleccione dificultad",
        autoOpen:false,
        modal:true,
        show:"clip",
        hide:"clip",
        buttons: {
            "Fácil": function() {
                dificultadIslas=3;
                dificultadImagenes=3;
                arrayIslasRepetido.length = dificultadIslas;
                repartir();
                repartirPaisajes();
                $(this).dialog("close");
            },
            "Medio": function() {
                dificultadIslas=4;
                dificultadImagenes=6;
                arrayIslasRepetido.length = dificultadIslas;
                repartir();
                repartirPaisajes();
                $(this).dialog("close"); 
            },
            "Difícil": function() {
                dificultadIslas=6;
                dificultadImagenes=8;
                arrayIslasRepetido.length = dificultadIslas;
                repartir();
                repartirPaisajes();
                $(this).dialog("close");
            }
        }
    })  
});

$(function(){
    $("#playAgain").dialog({
        title:"¿Quieres jugar otra vez?",
        autoOpen:false,
        modal:true,
        show:"clip",
        hide:"clip",
        buttons: {
            "Sí": function() {
                localStorage.setItem("Nombre", $("#nombre").val());
                location.reload(true);
            },
            "No": function() {
                localStorage.removeItem("Nombre");
                $(this).dialog("close");
                location.reload(true);
            }
        }
    });
})

/**
 * Crea la ventana modal para gestinar el final del juego
 */
$(function() {
    $("#vTerminar").dialog({
        title:"¿Seguro que quiere terminar el juego?",
        autoOpen: false,
        modal:true,
        show:"fold",
        hide:"fold",
        buttons: {
            "Sí": function() {
                alert($("#nombre").val() + " tu puntuación fue de " + puntos + " puntos");
                $("#playAgain").dialog("open");
                $(this).dialog("close");
            },
            "No": function() {
                $(this).dialog("close");
            },
        }
    })
})

/**
 * Coloca elementos ne función a los datos elegidos
 */
function repartir() {
    $("#empezar").attr("disabled", true); 

    arrayIslas = arrayIslas.sort(function() {return Math.random() - 0.5});

    for (var i = dificultadIslas; i >= 0; i--) {
        
        //$("#islas").append($('<img>',{ id:recortar(arrayIslas[i]), src:arrayIslas[i] }));

        $("#islas").append($("<img id='"+recortar(arrayIslas[i])+"' src='"+arrayIslas[i]+"'>"+ +"</img>"));
            
        arrayIslasJugadas.push(arrayIslas[i].substr(4, arrayIslas[i].length));
    }
}

/**
 * recoge el nombre del elemento del array y lo recorta según la preferencias
 * @param {string} isla 
 */
function recortar(isla) {
    var isla_recorte_1 = isla.substr(4, isla.length);
    var islaNoComa = isla_recorte_1.split(".gif");
    return islaNoComa[0];
}

/**
 * Genera los paisajes para colocarlos en las islas
 */
function repartirPaisajes() {

    var recorte;

    for (var i = arrayIslasJugadas.length-1; i >= 0; i--) {
        for (var j = arrayPaisajes.length-1; j >= 0; j--) {

            recorte = arrayPaisajes[j].substr(4, arrayPaisajes[j].length);

            if (recorte.substr(0,2) == arrayIslasJugadas[i].substr(0,2)) {
                $("#fotos").append($('<img>', { id:recortar(arrayPaisajes[j]), src:arrayPaisajes[j] }));
            }
        }
    }

    //Que carge las funciones de las imágenes
    $(function(){ $("#fotos").children().draggable()} );

    $(function() {
        $("#tenerife").droppable({
            accept:$("#fotos").children(),
            drop:function(event, ui) {
                compruebaIsla($(this)[0].id, ui.draggable.context.id);
            }
        });

        $("#grancanaria").droppable({
            accept:$("#fotos").children(),
            drop:function(event, ui) {
                compruebaIsla($(this)[0].id, ui.draggable.context.id);
            }
        });

        $("#lanzarote").droppable({
            accept:$("#fotos").children(),
            drop:function(event, ui) {
                compruebaIsla($(this)[0].id, ui.draggable.context.id);
            }
        });

        $("#fuerteventura").droppable({
            accept:$("#fotos").children(),
            drop:function(event, ui) {
                compruebaIsla($(this)[0].id, ui.draggable.context.id);
            }
        });

        $("#palma").droppable({
            accept:$("#fotos").children(),
            drop:function(event, ui) {
                compruebaIsla($(this)[0].id, ui.draggable.context.id);
            }
        });

        $("#gomera").droppable({
            accept: "#fotos > img",
            drop: function(event, ui) {
                compruebaIsla($(this)[0].id, ui.draggable.context.id);
            }
        });

        $("#hierro").droppable({
            accept: "#fotos > img",
            drop: function(event, ui) {
                compruebaIsla($(this)[0].id, ui.draggable.context.id);
            }
        });
    });
}
   
/**
 * 
 * @param {string} isla 
 * @param {string} paisaje 
 */
function compruebaIsla(isla, paisaje) {

    if (isla.substr(0,3) == paisaje.substr(0,3)) {
        notificaciones("bien");
    }
    else {
        notificaciones("mal");
    }
    /*$("#empezar").on("click", function() {
        $("#vComprobacion").dialog("open");
    });

    //.eq()
    
}

/**
 * Notificaciones con toastr
 */
function notificaciones(estado) {
        if (estado == "bien") {
            puntos++;
            $("#puntuacion").text("Tu puntuación es:  " + puntos);
            toastr.success("Sumas un punto",'<i>¡Acertaste!</i>');
        }
        else {
            puntos -=2;
            $("#puntuacion").text("Tu puntuación es:  " + puntos);
            toastr.error("¡oh oh isla equivocada!",'Error');
        }
    }
}





