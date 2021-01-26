var palabra = ["a", "u", "s", "e", "n", "t", "e"]
var cantidadDeLetras = palabra.length
var nDeIntento = 0
var palabraAmostrar = ["_", "_", "_", "_", "_", "_","_"]
var letrasUsadas = []

// var letra = prompt(palabraAmostrar
// + "\n Ingresa una letra")

var resultado = obtenerResultado(palabra, palabraAmostrar, letra, nDeIntento, cantidadDeLetras, letrasUsadas)

palabraAmostrar = resultado[0]
nDeIntento = resultado[1]
cantidadDeLetras = resultado[2]
letrasUsadas = resultado[3]
var esta = resultado[4]

mostrarResultado(esta)
/*
function mostrarResultado(resultado) {
    if (resultado) {
        alert("ganaste")
    } else {
        alert("perdiste")
    }
}*/


// Lo que devuelve 
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