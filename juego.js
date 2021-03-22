var palabra;
var vidas = 10;
var palabraAmostrar;
var palabrasAUsar;
var palabras = ["Groot", "Thor", "Nebula", "Loki", "Vision"];
var jugador;

function inicializar() {
  canvas();
  abrirModal("#modal");
  getPalabras();
  generarBotones();
}

function guardarJugadores() {
  jugador = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
  };
  sessionStorage.setItem("jugador", JSON.stringify(jugador));
  generarModales();
}

function getJugador() {
  return sessionStorage.getItem("jugador");
}

function intentar(letra) {
  var estadoDeJuego = {
    ganaste: false,
    perdiste: false,
  };
  $("#" + letra).prop("disabled", true); // Deshabilita boton
  var posiciones = estaLaLetraEnLaPalabra(letra, palabra);
  if (posiciones.length > 0) {
    completarPalabra(letra, posiciones, palabraAmostrar);
  } else {
    restarVida();
    animate();
  }
  if (vidas < 3) {
    M.toast({ html: "¡Sr. Stark, no quiero morir!" });
  }
  if (vidas < 1) {
    estadoDeJuego.perdiste = true;
  }
  if (palabraAmostrar.join("") == palabra) {
    estadoDeJuego.ganaste = true;
  }
  mostrarResultado(estadoDeJuego);
}

function mostrarResultado(estadoDeJuego) {
  if (estadoDeJuego.ganaste) {
    abrirModal("#modalVictoria");
  }
  if (estadoDeJuego.perdiste) {
    abrirModal("#modalPerdiste");
  }
}

function restarVida() {
  vidas--;
  document.getElementById("vidas").innerHTML = "Vidas: " + vidas;
}

function completarPalabra(letra, posiciones, palabraAmostrar) {
  for (var indice of posiciones) {
    palabraAmostrar[indice] = letra;
  }
  document.getElementById("palabra").innerHTML = palabraAmostrar.join("");
}

// Devuelve un array con las posiciones de la letra en la palabra, si no se encuentra, devuelve un array vacio
function estaLaLetraEnLaPalabra(letra, palabra) {
  var resultado = [];
  var indiceABuscar = 0;
  var posicion;
  while (indiceABuscar != -1) {
    posicion = palabra.indexOf(letra, indiceABuscar);

    if (posicion != -1) {
      resultado.push(posicion);
      indiceABuscar = posicion + 1;
    } else {
      indiceABuscar = posicion;
    }
  }
  return resultado;
}

function generarPalabras() {
  palabrasAUsar = palabras;
  palabra = palabrasAUsar[
    Math.floor(Math.random() * palabrasAUsar.length)
  ].toUpperCase();
  palabraAmostrar = ocultarPalabra(palabra).split("");
  document.getElementById("palabra").innerHTML = palabraAmostrar.join("");
}

function generarBotones() {
  var alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  var divBotonesIzq = document.getElementById("botonesIzq");
  var divBotonesDer = document.getElementById("botonesDer");

  // Se crean los divs de row que van a contener a los botones creados dinamicamente
  var divBotonesIzqCol1 = document.createElement("div");
  divBotonesIzqCol1.classList.add("col");
  divBotonesIzqCol1.classList.add("s6");
  divBotonesIzq.appendChild(divBotonesIzqCol1);

  var divBotonesIzqCol2 = document.createElement("div");
  divBotonesIzqCol2.classList.add("col");
  divBotonesIzqCol2.classList.add("s6");
  divBotonesIzq.appendChild(divBotonesIzqCol2);

  var divBotonesDerCol1 = document.createElement("div");
  divBotonesDerCol1.classList.add("col");
  divBotonesDerCol1.classList.add("s6");
  divBotonesDer.appendChild(divBotonesDerCol1);

  var divBotonesDerCol2 = document.createElement("div");
  divBotonesDerCol2.classList.add("col");
  divBotonesDerCol2.classList.add("s6");
  divBotonesDer.appendChild(divBotonesDerCol2);


  for (let letra of alf) {
    var divboton = document.createElement("div");
    divboton.classList.add("boton");
    divboton.innerHTML = crearBoton(letra);
    if ("ABCDEFG".includes(letra)){
      divBotonesIzqCol1.appendChild(divboton)
    }
    if ("HIJKLM".includes(letra)){
      divBotonesIzqCol2.appendChild(divboton)
    }
    if ("NOPQRS".includes(letra)){
      divBotonesDerCol1.appendChild(divboton)
    }
    if ("TUVWXYZ".includes(letra)){
      divBotonesDerCol2.appendChild(divboton)
    }
  }
}

function resetear() {
  var alf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  for (let letra of alf) {
    $("#" + letra).prop("disabled", false);
  }
}

function crearBoton(letra) {
  return (
    `<input id="` +
    letra +
    `" class="btn-floating btn-large waves-effect waves-light  yellow darken-3" type="button" onclick="intentar('` +
    letra +
    `')" value= "` +
    letra +
    `">`
  );
}

function completarArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

function ocultarPalabra(palabra) {
  var palabras = palabra.split(" ");
  var resultado = [];
  for (const p of palabras) {
    resultado.push("_".repeat(p.length));
  }
  return resultado.join(" ");
}

function getPalabras() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://603ab935f1d6aa0017a10f5f.mockapi.io/Characters",
    success: function (nombres) {
      for (const nombre of nombres) {
        palabras.push(nombre.name);
      }
      generarPalabras();
    },
    fail: generarPalabras(),
  });
}

function abrirModal(id) {
  $(document).ready(function () {
    $(id).modal();
    $(id).modal("open");
  });
}

function generarModales() {
  generarModal("ganaste", "modalVictoria", "victoria", "Ganaste");
  generarModal("perdiste", "modalPerdiste", "perdiste", "Perdiste");
}

function generarModal(idContenedor, id, clase, texto) {
  var contenedor = document.getElementById(idContenedor);
  var jugadorJSON = JSON.parse(getJugador());
  contenedor.innerHTML =
    `
  <div id="` +
    id +
    `"
       class="modal ` +
    clase +
    `">
      <div class="modal-content center-align">
          <div class="row center-align ganaste">
                  <h4 class="deep-purple-text text-lighten-5 box">¡` +
    texto +
    ` ` +
    jugadorJSON.nombre +
    `!</h4>
          </div>
      </div>
      <div class="modal-footer transparent">
          <div class="row">
              <div class="col s6 push-s2">
                  <a href="#!"
                     class="modal-action modal-close btn  deep-purple lighten-2"
                     onClick="window.location.reload();">Volver a jugar</a>
              </div>
          </div>
      </div>
  </div>`;
}

// Animacion
function animate() {
  var drawMe = vidas;
  drawArray[drawMe]();
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

head = function () {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
};

draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
};

frame1 = function () {
  draw(0, 150, 150, 150);
};

frame2 = function () {
  draw(10, 0, 10, 600);
};

frame3 = function () {
  draw(0, 5, 70, 5);
};

frame4 = function () {
  draw(60, 5, 60, 15);
};

torso = function () {
  draw(60, 36, 60, 70);
};

rightArm = function () {
  draw(60, 46, 100, 50);
};

leftArm = function () {
  draw(60, 46, 20, 50);
};

rightLeg = function () {
  draw(60, 70, 100, 100);
};

leftLeg = function () {
  draw(60, 70, 20, 100);
};

drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1,
];
