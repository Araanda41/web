const coche = document.querySelector("#coche");
const carretera = document.querySelector("#carretera");
const obstaculo = document.querySelector("#obstaculo");

const posiciones = ["16.67%", "50%", "83.33%"];

let carrilActual = 1;
let carrilObstaculo = 0;
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
}

reiniciarObstaculo();

// con setinterval va a moverse la valla cada 0.02 segundos
const bucleJuego = setInterval(moverObstaculo, 20);
