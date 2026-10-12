import "./styles.css";
import { pedirClasificacion } from "./api.ts";
import { calcularEscuderias, calcularResumen, filtrarPilotos, limpiarPilotos } from "./logica.ts";
import {
    mostrarCargando,
    mostrarError,
    mostrarVacio,
    ocultarEstado,
    pintarEscuderias,
    pintarOpcionesEscuderias,
    pintarPilotos,
    pintarResumen
} from "./render.ts";
import type { Piloto } from "./tipos.ts";

const selectTemporada = document.querySelector<HTMLSelectElement>("#temporada")!;
const selectEscuderia = document.querySelector<HTMLSelectElement>("#escuderia")!;
const inputBusqueda = document.querySelector<HTMLInputElement>("#busqueda")!;
const botonReintentar = document.querySelector<HTMLButtonElement>("#reintentar")!;

// la primera temporada de la f1 fue en 1950
const primeraTemporada = 1950;
const temporadaActual = new Date().getFullYear();

let pilotos: Piloto[] = [];
// cuenta las peticiones para ignorar las respuestas que lleguen tarde
let ultimaPeticion = 0;

// crea las opciones de temporadas de la mas nueva a la mas antigua
function prepararTemporadas() {
    const temporadas = Array.from({ length: temporadaActual - primeraTemporada + 1 }, (_, i) => temporadaActual - i);

    const opciones = temporadas.map((temporada) => {
        const opcion = document.createElement("option");
        opcion.value = String(temporada);
        opcion.textContent = String(temporada);
        return opcion;
    });

    selectTemporada.replaceChildren(...opciones);
}

// pinta los pilotos que cumplen los filtros
function actualizarPilotos() {
    const filtrados = filtrarPilotos(pilotos, selectEscuderia.value, inputBusqueda.value);

    if (filtrados.length === 0) {
        mostrarVacio("Ningún piloto coincide con la búsqueda");
        return;
    }

    ocultarEstado();
    pintarPilotos(filtrados);
}

async function cargarTemporada() {
    const temporada = Number(selectTemporada.value);
    const peticion = ++ultimaPeticion;

    mostrarCargando(temporada);

    try {
        const pilotosApi = await pedirClasificacion(temporada);

        // si el usuario ya ha elegido otra temporada no pinto esta
        if (peticion !== ultimaPeticion) {
            return;
        }

        pilotos = limpiarPilotos(pilotosApi);

        if (pilotos.length === 0) {
            pintarOpcionesEscuderias([]);
            mostrarVacio(`Todavía no hay resultados para la temporada ${temporada}`);
            return;
        }

        const escuderias = calcularEscuderias(pilotos);
        const { puntos, victorias } = calcularResumen(pilotos);

        selectEscuderia.value = "";
        pintarOpcionesEscuderias(escuderias);
        pintarResumen(pilotos[0], pilotos.length, puntos, victorias);
        pintarEscuderias(escuderias);
        actualizarPilotos();
    } catch (error) {
        if (peticion !== ultimaPeticion) {
            return;
        }
        pilotos = [];
        mostrarError(error instanceof Error ? error.message : "Ha ocurrido un error inesperado");
    }
}

selectTemporada.addEventListener("change", cargarTemporada);
selectEscuderia.addEventListener("change", actualizarPilotos);
inputBusqueda.addEventListener("input", actualizarPilotos);
botonReintentar.addEventListener("click", cargarTemporada);

prepararTemporadas();
cargarTemporada();
