var palabra = ["a", "u", "s", "e", "n", "t", "e"]
var cantidadDeLetras = palabra.length
var vidas = 9
var palabraAmostrar = ["_", "_", "_", "_", "_", "_","_"]
var letrasUsadas = []

function jugar(){
   
    var letraElegida = document.getElementById("letra").value
    intentar(letraElegida)
}


function intentar (letra) {
    var posiciones = estaLaLetraEnLaPalabra(letra, palabra)
    if (posiciones.length > 0 ) {
        completarPalabra(letra, posiciones, palabraAmostrar)
        var ganaste = true
    } else {
        vidas--
        letrasUsadas.push(letra)
        restarVida()
        var ganaste = false
    }
    if(vidas < 1){
        alert("Perdiste")
    }
    if(palabraAmostrar.join("") == palabra.join("")){
        alert("Ganaste")
    }
    mostrarResultado(ganaste)
}

function mostrarResultado(resultado) {
    if (resultado) {
    } else {
    }
}

function restarVida() {
    document.getElementById("vidas").innerHTML = "Te quedan: "+ vidas +" vidas"
    
}

function completarPalabra(letra, posiciones, palabraAmostrar) {
    for (var indice of posiciones) {
        palabraAmostrar[indice] = letra
    }
    var palabraJunta = palabraAmostrar.join("")
    document.getElementById("palabra").innerHTML = palabraJunta
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

