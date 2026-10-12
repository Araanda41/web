import { guardarCache, leerCache } from "./cache.ts";
import type { PilotoApi, RespuestaApi } from "./tipos.ts";

const urlBase = "https://api.jolpi.ca/ergast/f1";

// pide la clasificacion de pilotos de una temporada mirando antes la cache
export async function pedirClasificacion(temporada: number): Promise<PilotoApi[]> {
    const guardados = leerCache(temporada);
    if (guardados !== null) {
        return guardados;
    }

    let respuesta: Response;

    // si no hay internet fetch lanza un error antes de llegar a la respuesta
    try {
        respuesta = await fetch(`${urlBase}/${temporada}/driverstandings.json?limit=100`);
    } catch {
        throw new Error("No se ha podido conectar con la API, revisa tu conexión");
    }

    if (!respuesta.ok) {
        throw new Error(`La API ha respondido con un error ${respuesta.status}`);
    }

    let datos: RespuestaApi;

    // por si la api devuelve algo que no es json
    try {
        datos = await respuesta.json();
    } catch {
        throw new Error("La API ha devuelto datos que no se pueden leer");
    }

    const listas = datos.MRData?.StandingsTable?.StandingsLists ?? [];

    // si la temporada no existe la lista llega vacia y no se guarda
    if (listas.length === 0) {
        return [];
    }

    const pilotos = listas[0].DriverStandings ?? [];
    guardarCache(temporada, pilotos);
    return pilotos;
}
