var palabra = "ausente".toUpperCase().split("")  //TODO: agregar mas palabras. Elegir palabra de manera aleatoria 
var cantidadDeLetras = palabra.length
var vidas = 9
var palabraAmostrar = ["_", "_", "_", "_", "_", "_","_"] //TODO:generar automaticamente 
var letrasUsadas = []


    var posibleJugador = localStorage.getItem("jugador")
    if (posibleJugador == null) {
        var nombre = prompt("Ingresa tu nombre");
        var apellido = prompt("Ingresa tu apellido")
        var jugador = {
        "nombre": nombre, 
        "apellido" : apellido
        }
        localStorage.setItem("jugador", JSON.stringify(jugador))
    }else{
        var jugador = posibleJugador;
    }


function jugar(){
   
    var letraElegida = document.getElementById("letra").value
    intentar(letraElegida)
}


function intentar (letra) {
    $("#"+letra).prop('disabled', true)
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
        alert("Perdiste " + jugador.nombre)
    }
    if(palabraAmostrar.join("") == palabra.join("")){
        alert("Ganaste " + jugador.nombre)
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

function generarBotones() {
    var alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    var divBotones = document.getElementById("botones")
    // Se crean los divs de row que van a contener a los botones creados dinamicamente
    var divBotonesFila1 = document.createElement("div")
    divBotonesFila1.classList.add('row')
    divBotonesFila1.classList.add('valign-wrapper')
    divBotones.appendChild(divBotonesFila1)
    var divBotonesFila2 = document.createElement("div")
    divBotonesFila2.classList.add('row')
    divBotonesFila2.classList.add('valign-wrapper')
    divBotones.appendChild(divBotonesFila2)
    for (let letra of alf) {
        var divboton = document.createElement("div")
        divboton.classList.add('boton')
        divboton.innerHTML = crearBoton(letra)
        "ABCDEFGHIJKLM".includes(letra) ? divBotonesFila1.appendChild(divboton) : divBotonesFila2.appendChild(divboton)
        // divBotones.appendChild(divAAgregar)
        
    }
}
function resetear() {
    var alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    for (let letra of alf) {
        $("#"+letra).prop('disabled', false)
    }
}
function crearBoton(letra) {
  return `<input id="`+ letra +`" class="btn-floating btn-large waves-effect waves-light red" type="button" onclick="intentar('`+ letra +`')" value= "`+ letra +`">`
}


