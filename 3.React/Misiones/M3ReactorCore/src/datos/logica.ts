import type { Escuderia, Piloto, PilotoApi } from "./tipos.ts";

// convierte un texto a numero y si viene algo raro devuelve 0
function aNumero(texto: string | undefined): number {
    const numero = Number(texto);
    return Number.isFinite(numero) ? numero : 0;
}

// quita los pilotos sin datos y los deja con una forma mas comoda
export function limpiarPilotos(pilotosApi: PilotoApi[]): Piloto[] {
    return pilotosApi
        .filter((piloto) => piloto?.Driver)
        .map((piloto, indice) => {
            const conductor = piloto.Driver ?? {};
            const escuderias = piloto.Constructors ?? [];
            // si cambio de equipo a mitad de temporada me quedo con el ultimo
            const escuderia = escuderias.at(-1) ?? {};
            const nombre = `${conductor.givenName ?? ""} ${conductor.familyName ?? ""}`.trim();

            return {
                id: conductor.driverId ?? `piloto-${indice}`,
                posicion: aNumero(piloto.position) || indice + 1,
                nombre: nombre || "Piloto desconocido",
                // los pilotos antiguos no tienen codigo asi que uso las tres primeras letras del apellido
                codigo: conductor.code ?? (conductor.familyName ?? "???").slice(0, 3).toUpperCase(),
                numero: conductor.permanentNumber ?? "",
                nacionalidad: conductor.nationality ?? "Desconocida",
                escuderia: escuderia.name ?? "Sin escudería",
                escuderiaId: escuderia.constructorId ?? "sin-escuderia",
                puntos: aNumero(piloto.points),
                victorias: aNumero(piloto.wins)
            };
        });
}

// filtra por escuderia y por texto del buscador
export function filtrarPilotos(pilotos: Piloto[], escuderiaId: string, busqueda: string): Piloto[] {
    const texto = busqueda.trim().toLowerCase();

    return pilotos
        .filter((piloto) => escuderiaId === "" || piloto.escuderiaId === escuderiaId)
        .filter((piloto) => piloto.nombre.toLowerCase().includes(texto) || piloto.codigo.toLowerCase().includes(texto));
}

// agrupa los pilotos por escuderia suma sus puntos y las ordena de mas a menos puntos
export function calcularEscuderias(pilotos: Piloto[]): Escuderia[] {
    const grupos = Object.groupBy(pilotos, (piloto) => piloto.escuderiaId);

    return Object.values(grupos)
        .filter((grupo) => grupo !== undefined)
        .map((grupo) => ({
            nombre: grupo[0].escuderia,
            id: grupo[0].escuderiaId,
            puntos: grupo.reduce((total, piloto) => total + piloto.puntos, 0),
            pilotos: grupo.length
        }))
        .toSorted((a, b) => b.puntos - a.puntos);
}

// suma los puntos y las victorias de todos los pilotos
export function calcularResumen(pilotos: Piloto[]): { puntos: number; victorias: number } {
    return pilotos.reduce(
        (total, piloto) => ({ puntos: total.puntos + piloto.puntos, victorias: total.victorias + piloto.victorias }),
        { puntos: 0, victorias: 0 }
    );
}
