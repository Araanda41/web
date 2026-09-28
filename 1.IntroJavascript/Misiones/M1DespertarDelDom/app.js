const coche = document.querySelector("#coche");
const carretera = document.querySelector("#carretera");
const obstaculo = document.querySelector("#obstaculo");
const finPartida = document.querySelector("#fin-partida");
const botonReiniciar = document.querySelector("#reiniciar");
const puntuacion = document.querySelector("#puntuacion");
const puntuacionFinal = document.querySelector("#puntuacion-final");

const posiciones = ["16.67%", "50%", "83.33%"];

let carrilActual = 1;
let carrilObstaculo = 0;
let partidaTerminada = false;
let puntos = 0;
// la poongo alejada para que no se vea ya que esta encima de la carretera, si es 0 estara en el borde de arriba
let posicionObstaculo = -40;
coche.style.left = posiciones[carrilActual];

function controlarTeclado(evento) {
    if (evento.key === "ArrowLeft" || evento.key === "ArrowRight" || evento.key === "ArrowDown") {
        evento.preventDefault();
    }

    if (evento.repeat) {
        return;
    }

    if (evento.key === "ArrowLeft" && carrilActual > 0) {
        carrilActual--;
    } else if (evento.key === "ArrowRight" && carrilActual < 2) {
        carrilActual++;
    } else if (evento.key === "ArrowDown" || evento.key.toLowerCase() === "s") {
        document.body.classList.toggle("noche");
    }

    coche.style.left = posiciones[carrilActual];
    comprobarChoque();
}

document.addEventListener("keydown", controlarTeclado);

// pone la valla arriba y de forma random se elije un carril
function reiniciarObstaculo() {
    posicionObstaculo = -40;
    carrilObstaculo = Math.floor(Math.random() * 3);
    obstaculo.style.left = posiciones[carrilObstaculo];
    obstaculo.style.top = posicionObstaculo + "px";
}

function moverObstaculo() {
    // va bajando de 3 px en 3
    posicionObstaculo = posicionObstaculo + 3;

    // si llega a por debajo de la altura del bloque de carretera que vuelva arriba
    if (posicionObstaculo > carretera.clientHeight) {
        reiniciarObstaculo();
    }
    // muevo la valla a donde ha cambiado su posicion tras sumar 3 frames al contador de su posicionn
    obstaculo.style.top = posicionObstaculo + "px";
    // siempre que se mueva el coche comrpueba que no haya perdido
    comprobarChoque();
}

function sumarPunto() {
    puntos = puntos++;
    puntuacion.textContent = puntos;
}

// cuandod hay chcoque se para el tempo y se muestra el texto de que piuerdes
function comprobarChoque() {
    if (partidaTerminada) {
        return;
    }
    // parte de arriba del coche dejando 4 pixeles margenb
    const arribaCoche = coche.offsetTop + 4;
    // lo mismo con la parte de abajo
    const abajoCoche = coche.offsetTop + coche.offsetHeight - 4;
    // parte de abajo de la valla
    const abajoObstaculo = posicionObstaculo + obstaculo.offsetHeight;
    // hay choque si están en el mismo carril y sus alturas se solapan, osea mismo carril y que la parte de 
    // abajo de la valla toque la de arriba del coche y no atraviese el coche por debajo
    if ((carrilActual === carrilObstaculo) && (abajoObstaculo > arribaCoche) && (posicionObstaculo < abajoCoche)) {
        partidaTerminada = true;
        // paro el movimiento de la valla parando el intervalo
        clearInterval(bucleJuego);
        clearInterval(buclePuntos);
        puntuacionFinal.textContent = puntos;
        finPartida.hidden = false;
    }
}

// se prepara todo para empezar de 0
function reiniciarPartida() {
    clearInterval(bucleJuego);
    clearInterval(buclePuntos);
    partidaTerminada = false;
    finPartida.hidden = true;
    puntos = 0;
    puntuacion.textContent = puntos;
    puntuacionFinal.textContent = puntos;
    carrilActual = 1;
    coche.style.left = posiciones[carrilActual];
    reiniciarObstaculo();
    bucleJuego = setInterval(moverObstaculo, 20);
    buclePuntos = setInterval(sumarPunto, 1000);
}

botonReiniciar.addEventListener("click", reiniciarPartida);

reiniciarObstaculo();

// con setinterval va a moverse la valla cada 0.02 segundos
let bucleJuego = setInterval(moverObstaculo, 20);
// cada segundo se suma un punto
let buclePuntos = setInterval(sumarPunto, 1000);
