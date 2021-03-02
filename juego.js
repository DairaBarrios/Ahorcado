var palabra  //TODO: agregar mas palabras. Elegir palabra de manera aleatoria 
var vidas = 9
var palabraAmostrar //TODO:generar automaticamente 
var palabras = ["Groot", "Thor", "Nebula", "Loki", "Vision"]
var letrasUsadas = []
var jugador 


function inicializar() {
        //getJugador()
        abrirModal("#modal")
        getPalabras()
        generarPalabras()
        generarBotones()

}

function guardarJugadores() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    jugador = {
        "nombre": nombre, 
        "apellido" : apellido
    }
    sessionStorage.setItem("jugador", JSON.stringify(jugador))
}
function getJugador() { 
    var posibleJugador = sessionStorage.getItem("jugador")
    if (posibleJugador == null) {
        var nombre = prompt("Ingresa tu nombre");
        var apellido = prompt("Ingresa tu apellido")
        jugador = {
        "nombre": nombre, 
        "apellido" : apellido
        }
        sessionStorage.setItem("jugador", JSON.stringify(jugador))
    }else{
         jugador = posibleJugador;
    }

}

function jugar(){ 
    var letraElegida = document.getElementById("letra").value
    intentar(letraElegida)
}


function intentar (letra) {
    var ganaste = false
    var perdiste = false
    $("#"+letra).prop('disabled', true)
    var posiciones = estaLaLetraEnLaPalabra(letra, palabra)
    if (posiciones.length > 0 ) {
        completarPalabra(letra, posiciones, palabraAmostrar)
    } else {
        vidas--
        letrasUsadas.push(letra)
        restarVida()
    }
    if(vidas < 3){
        M.toast({html:'¡Sr. Stark, no quiero morir!'})
    }
    if(vidas < 1){
        perdiste = true
    }
    if(palabraAmostrar.join("") == palabra){
        ganaste = true
    }
    mostrarResultado(ganaste, perdiste)
}

function mostrarResultado(ganaste, perdiste) {
    if (ganaste) {
        abrirModal("#modalVictoria")
    } 
    if (perdiste) {
        abrirModal("#modalPerdiste")
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
function generarPalabras() {
    var palabrasAUsar = palabras
    palabra = palabrasAUsar[Math.floor(Math.random()* palabrasAUsar.length)].toUpperCase()
    palabraAmostrar = ocultarPalabra(palabra).split("")
    document.getElementById("palabra").innerHTML = palabraAmostrar.join("")
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
  return `<input id="`+ letra +`" class="btn-floating btn-large waves-effect waves-light  yellow darken-3" type="button" onclick="intentar('`+ letra +`')" value= "`+ letra +`">`
}

function completarArray(value, len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
      arr.push(value);
    }
    return arr;
  }

  function ocultarPalabra(palabra) {
      var palabras = palabra.split(" ")
      var resultado = []
      for (const p of palabras) {
          resultado.push("_".repeat(p.length))
      }
      return resultado.join(" ")
  }

    function getPalabras() {
        
        $.ajax({
            type:"GET",
            dataType: "json",
            url:"https://603ab935f1d6aa0017a10f5f.mockapi.io/Characters",
            success:function(nombres)
        {
            for (const nombre of nombres) {
                palabras.push(nombre.name)
            }
        }
        });
    }



    //modal
    
     function abrirModal(id) {
        $(document).ready(function(){
            $(id).modal();
            $(id).modal('open'); 
         });
    
     }

  //ahorcado animación
 

//aviso de pocas vidas


[]
//M.toast({html:'¡Sr. Stark, no quiero morir!'})