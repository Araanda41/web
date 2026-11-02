import { useEffect, useState } from "react";
import { pedirClasificacion } from "../datos/api.ts";
import { limpiarPilotos } from "../datos/logica.ts";
import type { Piloto } from "../datos/tipos.ts";

interface Resultado {
    clave: string;
    pilotos: Piloto[];
    error: string | null;
}

// pide los pilotos de una temporada
export function usePilotos(temporada: number) {
    const [intento, setIntento] = useState(0);
    const [resultado, setResultado] = useState<Resultado | null>(null);

    // la clave cambia si cambia la temporada o si se pulsa reintentar
    const clave = `${temporada}-${intento}`;

    useEffect(() => {
        let cancelado = false;

        pedirClasificacion(temporada)
            .then((datos) => {
                if (!cancelado) {
                    setResultado({ clave, pilotos: limpiarPilotos(datos), error: null });
                }
            })
            .catch((error) => {
                if (!cancelado) {
                    const mensaje = error instanceof Error ? error.message : "Ha ocurrido un error inesperado";
                    setResultado({ clave, pilotos: [], error: mensaje });
                }
            });

        // si cambia la temporada antes de que llegue la respuesta se ignora
        return () => {
            cancelado = true;
        };
    }, [temporada, clave]);

    // si el resultado guardado es de otra peticion sigue cargando
    const cargando = resultado?.clave !== clave;

    return {
        pilotos: cargando || resultado === null ? [] : resultado.pilotos,
        error: cargando ? null : resultado.error,
        cargando,
        reintentar: () => setIntento((n) => n + 1)
    };
}
