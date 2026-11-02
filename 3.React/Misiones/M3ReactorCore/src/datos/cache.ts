import type { PilotoApi } from "./tipos.ts";

const prefijo = "parrilla-f1-";
// la temporada actual cambia despues de cada carrera asi que solo dura una hora
const duracionTemporadaActual = 60 * 60 * 1000;

interface EntradaCache {
    fecha: number;
    pilotos: PilotoApi[];
}

// devuelve los pilotos guardados o null si no hay nada valido
export function leerCache(temporada: number): PilotoApi[] | null {
    try {
        const texto = localStorage.getItem(prefijo + temporada);
        if (texto === null) {
            return null;
        }

        const entrada: EntradaCache = JSON.parse(texto);
        if (!Array.isArray(entrada.pilotos)) {
            return null;
        }

        const caducada = Date.now() - entrada.fecha > duracionTemporadaActual;
        if (temporada === new Date().getFullYear() && caducada) {
            return null;
        }

        return entrada.pilotos;
    } catch {
        // si el json esta roto o no hay acceso a localStorage se hace la peticion normal
        return null;
    }
}

export function guardarCache(temporada: number, pilotos: PilotoApi[]) {
    const entrada: EntradaCache = { fecha: Date.now(), pilotos };

    try {
        localStorage.setItem(prefijo + temporada, JSON.stringify(entrada));
    } catch {
        // si el almacenamiento esta lleno simplemente no se guarda
    }
}
