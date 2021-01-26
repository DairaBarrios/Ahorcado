var palabra = ["a", "u", "s", "e", "n", "t", "e"]
var cantidadDeLetras = palabra.length
var vidas = 0
var palabraAmostrar = ["_", "_", "_", "_", "_", "_","_"]
var letrasUsadas = []

function jugar(){
   
    var letraElegida = document.getElementById("letra").value
    intentar(letraElegida)
}


function intentar (letra) {
    var posiciones = estaLaLetraEnLaPalabra(letra, palabra)
    if (posiciones.length > 0 ) {
        //completar palabra
        var ganaste = true

    } else {
        //resta una vida

        vidas--
        letrasUsadas.push(letra)

        var ganaste = false
    }

    mostrarResultado(ganaste)
}

function mostrarResultado(resultado) {
    if (resultado) {
        alert("ganaste")
    } else {
        alert("perdiste")
    }
}


// Devuelve un array con las posiciones de la letra en la palabra, si no se encuentra, devuelve un array vacio 
function estaLaLetraEnLaPalabra(letra, palabra){
    var resultado = []
    var indiceABuscar = 0
    var posicion 

    while (indiceABuscar != -1) {

        posicion = palabra.indexOf(letra, indiceABuscar)

        if (posicion != -1) {
            
            resultado.push(posicion)
            indiceABuscar = posicion + 1
        } else {
            indiceABuscar = posicion
        }
        
    }
    return resultado
}

