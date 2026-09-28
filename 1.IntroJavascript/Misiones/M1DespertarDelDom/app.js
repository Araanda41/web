const coche = document.querySelector("#coche");
const carretera = document.querySelector("#carretera");
const elementosFilas = document.querySelectorAll(".fila-obstaculos");
const finPartida = document.querySelector("#fin-partida");
const botonReiniciar = document.querySelector("#reiniciar");
const puntuacion = document.querySelector("#puntuacion");
const puntuacionFinal = document.querySelector("#puntuacion-final");

const posiciones = ["16.67%", "50%", "83.33%"];
// separacion entre grupos de vallas
const separacion = 260;
const filas = [
    { elemento: elementosFilas[0], posicion: 0 },
    { elemento: elementosFilas[1], posicion: 0 }
];

let carrilActual = 1;
let partidaTerminada = false;
let puntos = 0;
let velocidad = 3;
coche.style.left = posiciones[carrilActual];

function controlarTeclado(evento) {
    if (evento.key === "ArrowLeft" || evento.key === "ArrowRight" || evento.key === "ArrowDown") {
        evento.preventDefault();
    }

    if (evento.repeat) {
        return;
    }

    if (evento.key === "ArrowLeft" && carrilActual > 0 && !partidaTerminada) {
        carrilActual--;
    } else if (evento.key === "ArrowRight" && carrilActual < 2 && !partidaTerminada) {
        carrilActual++;
    } else if (evento.key === "ArrowDown" || evento.key.toLowerCase() === "s") {
        document.body.classList.toggle("noche");
    }

    coche.style.left = posiciones[carrilActual];
    comprobarChoque();
}

document.addEventListener("keydown", controlarTeclado);

// elige al azar si esta fila lleva una o dos vallas y en que carriles
function prepararFila(fila) {
    const vallas = fila.elemento.querySelectorAll(".valla");
    const carrilElegido = Math.floor(Math.random() * 3);
    const cantidadVallas = Math.floor(Math.random() * 2) + 1;

    for (let i = 0; i < vallas.length; i++) {
        vallas[i].style.left = posiciones[i];
        if (cantidadVallas === 1) {
            vallas[i].hidden = (i !== carrilElegido);
        } else {
            vallas[i].hidden = (i === carrilElegido);
        }
    }

    fila.elemento.style.top = fila.posicion + "px";
}

// coloca las dos filas fuera de la carretera, separadas entre si
function prepararObstaculos() {
    for (let i = 0; i < filas.length; i++) {
        filas[i].posicion = -40 - i * separacion;
        prepararFila(filas[i]);
    }
}

function moverObstaculos() {
    for (let i = 0; i < filas.length; i++) {
        const fila = filas[i];
        fila.posicion = fila.posicion + velocidad;

        // al salir, vuelve arriba conservando la distancia con la otra fila
        if (fila.posicion > carretera.clientHeight) {
            fila.posicion = fila.posicion - separacion * filas.length;
            prepararFila(fila);
        }

        fila.elemento.style.top = fila.posicion + "px";
    }

    comprobarChoque();
}

function sumarPunto() {
    puntos++;
    puntuacion.textContent = puntos;
    // con dos filas dejamos el limite en 6 para dar tiempo a cambiar de carril
    if (puntos % 10 === 0 && velocidad < 6) {
        velocidad = velocidad + 1;
    }
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

    // compuebo ccada fila por separado
    for (let i = 0; i < filas.length; i++) {
        const fila = filas[i];
        const vallas = fila.elemento.querySelectorAll(".valla");
        const abajoObstaculo = fila.posicion + fila.elemento.offsetHeight;

        if (!vallas[carrilActual].hidden && (abajoObstaculo > arribaCoche) && (fila.posicion < abajoCoche)) {
            partidaTerminada = true;
            // paro el movimiento de la valla parando el intervalo
            clearInterval(bucleJuego);
            clearInterval(buclePuntos);
            puntuacionFinal.textContent = puntos;
            finPartida.hidden = false;
            return;
        }
    }
}

// se prepara todo para empezar de 0
function reiniciarPartida() {
    clearInterval(bucleJuego);
    clearInterval(buclePuntos);
    partidaTerminada = false;
    finPartida.hidden = true;
    puntos = 0;
    velocidad = 3;
    puntuacion.textContent = puntos;
    puntuacionFinal.textContent = puntos;
    carrilActual = 1;
    coche.style.left = posiciones[carrilActual];
    prepararObstaculos();
    bucleJuego = setInterval(moverObstaculos, 20);
    buclePuntos = setInterval(sumarPunto, 1000);
}

botonReiniciar.addEventListener("click", reiniciarPartida);

prepararObstaculos();

// con setinterval va a moverse la valla cada 0.02 segundos
let bucleJuego = setInterval(moverObstaculos, 20);
// cada segundo se suma un punto
let buclePuntos = setInterval(sumarPunto, 1000);
