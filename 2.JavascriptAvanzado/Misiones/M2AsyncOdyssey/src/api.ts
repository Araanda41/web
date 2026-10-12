import type { PilotoApi, RespuestaApi } from "./tipos.ts";

const urlBase = "https://api.jolpi.ca/ergast/f1";

// pide la clasificacion de pilotos de una temporada
export async function pedirClasificacion(temporada: number): Promise<PilotoApi[]> {
    let respuesta: Response;

    // si no hay internet fetch lanza un error antes de llegar a la respuesta
    try {
        respuesta = await fetch(`${urlBase}/${temporada}/driverstandings.json?limit=100`);
    } catch {
        throw new Error("No se ha podido conectar con la API, revisa tu conexion");
    }

    if (!respuesta.ok) {
        throw new Error(`La API ha respondido con un error ${respuesta.status}`);
    }

    const datos: RespuestaApi = await respuesta.json();
    const listas = datos.MRData?.StandingsTable?.StandingsLists ?? [];

    // si la temporada no existe la lista llega vacia
    if (listas.length === 0) {
        return [];
    }

    return listas[0].DriverStandings ?? [];
}
