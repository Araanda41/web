import type { Escuderia, Piloto } from "./tipos.ts";

const estado = document.querySelector<HTMLElement>("#estado")!;
const mensajeEstado = document.querySelector<HTMLParagraphElement>("#mensaje-estado")!;
const botonReintentar = document.querySelector<HTMLButtonElement>("#reintentar")!;
const contenedorPilotos = document.querySelector<HTMLElement>("#pilotos")!;
const resumen = document.querySelector<HTMLElement>("#resumen")!;
const seccionEscuderias = document.querySelector<HTMLElement>("#escuderias")!;
const listaEscuderias = document.querySelector<HTMLOListElement>("#lista-escuderias")!;
const selectEscuderia = document.querySelector<HTMLSelectElement>("#escuderia")!;

// colores de las escuderias actuales y si no esta en la lista usa el acento de la pagina
const coloresEscuderias: Record<string, string> = {
    red_bull: "#3671c6",
    mclaren: "#ff8000",
    ferrari: "#e8002d",
    mercedes: "#27f4d2",
    aston_martin: "#229971",
    alpine: "#ff87bc",
    williams: "#64c4ff",
    rb: "#6692ff",
    sauber: "#52e252",
    audi: "#bb0a30",
    haas: "#b6babd",
    cadillac: "#c9a227"
};

function colorEscuderia(id: string): string {
    return coloresEscuderias[id] ?? "var(--acento)";
}

// crea una etiqueta con clase y texto para no repetir lo mismo todo el rato
function crearElemento(etiqueta: string, clase: string, texto: string): HTMLElement {
    const elemento = document.createElement(etiqueta);
    elemento.className = clase;
    elemento.textContent = texto;
    return elemento;
}

// oculta todo lo que tenga datos mientras se muestra un estado
function ocultarDatos() {
    contenedorPilotos.replaceChildren();
    resumen.hidden = true;
    seccionEscuderias.hidden = true;
}

export function mostrarCargando(temporada: number) {
    ocultarDatos();
    estado.hidden = false;
    estado.className = "estado cargando";
    mensajeEstado.textContent = `Cargando la temporada ${temporada}...`;
    botonReintentar.hidden = true;
}

export function mostrarError(mensaje: string) {
    ocultarDatos();
    estado.hidden = false;
    estado.className = "estado error";
    mensajeEstado.textContent = mensaje;
    botonReintentar.hidden = false;
}

export function mostrarVacio(mensaje: string) {
    contenedorPilotos.replaceChildren();
    estado.hidden = false;
    estado.className = "estado vacio";
    mensajeEstado.textContent = mensaje;
    botonReintentar.hidden = true;
}

export function ocultarEstado() {
    estado.hidden = true;
}

// rellena el desplegable con las escuderias de la temporada
export function pintarOpcionesEscuderias(escuderias: Escuderia[]) {
    const opciones = escuderias.map((escuderia) => {
        const opcion = document.createElement("option");
        opcion.value = escuderia.id;
        opcion.textContent = escuderia.nombre;
        return opcion;
    });

    const todas = document.createElement("option");
    todas.value = "";
    todas.textContent = "Todas";
    selectEscuderia.replaceChildren(todas, ...opciones);
}

export function pintarResumen(lider: Piloto, totalPilotos: number, puntos: number, victorias: number) {
    document.querySelector("#lider")!.textContent = lider.nombre;
    document.querySelector("#total-pilotos")!.textContent = String(totalPilotos);
    document.querySelector("#total-puntos")!.textContent = puntos.toLocaleString("es-ES");
    document.querySelector("#total-victorias")!.textContent = String(victorias);
    resumen.hidden = false;
}

// pinta las cinco mejores escuderias con una barra segun sus puntos
export function pintarEscuderias(escuderias: Escuderia[]) {
    const mejores = escuderias.slice(0, 5);
    const maximo = mejores.at(0)?.puntos ?? 0;

    const filas = mejores.map((escuderia) => {
        const fila = document.createElement("li");
        const porcentaje = maximo > 0 ? (escuderia.puntos / maximo) * 100 : 0;
        const barra = crearElemento("span", "barra", "");

        barra.style.width = `${porcentaje}%`;
        barra.style.background = colorEscuderia(escuderia.id);
        fila.append(
            crearElemento("span", "nombre-escuderia", escuderia.nombre),
            crearElemento("span", "puntos-escuderia", `${escuderia.puntos} pts`),
            barra
        );
        return fila;
    });

    listaEscuderias.replaceChildren(...filas);
    seccionEscuderias.hidden = mejores.length === 0;
}

function crearTarjeta(piloto: Piloto): HTMLElement {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.style.setProperty("--color-equipo", colorEscuderia(piloto.escuderiaId));

    const cabecera = crearElemento("div", "tarjeta-cabecera", "");
    cabecera.append(
        crearElemento("span", "posicion", `P${piloto.posicion}`),
        crearElemento("span", "codigo", piloto.codigo)
    );

    const datos = crearElemento("div", "tarjeta-datos", "");
    datos.append(
        crearElemento("span", "", `${piloto.puntos} pts`),
        crearElemento("span", "", `${piloto.victorias} victorias`)
    );

    tarjeta.append(
        cabecera,
        crearElemento("h3", "nombre", piloto.nombre),
        crearElemento("p", "escuderia", piloto.escuderia),
        crearElemento("p", "nacionalidad", piloto.numero ? `#${piloto.numero} · ${piloto.nacionalidad}` : piloto.nacionalidad),
        datos
    );
    return tarjeta;
}

export function pintarPilotos(pilotos: Piloto[]) {
    contenedorPilotos.replaceChildren(...pilotos.map(crearTarjeta));
}
