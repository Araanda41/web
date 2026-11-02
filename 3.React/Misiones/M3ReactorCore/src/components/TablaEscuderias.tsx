import { colorEscuderia } from "../datos/colores.ts";
import type { Escuderia } from "../datos/tipos.ts";

interface Props {
    escuderias: Escuderia[];
}

// las cinco mejores escuderias con una barra segun sus puntos
export default function TablaEscuderias({ escuderias }: Props) {
    const mejores = escuderias.slice(0, 5);
    const maximo = mejores.at(0)?.puntos ?? 0;

    if (mejores.length === 0) {
        return null;
    }

    return (
        <section className="escuderias" aria-label="Clasificación de escuderías">
            <h2>Escuderías</h2>
            <ol>
                {mejores.map((escuderia) => (
                    <li key={escuderia.id}>
                        <span className="nombre-escuderia">{escuderia.nombre}</span>
                        <span className="puntos-escuderia">{escuderia.puntos} pts</span>
                        <span
                            className="barra"
                            style={{
                                width: `${maximo > 0 ? (escuderia.puntos / maximo) * 100 : 0}%`,
                                background: colorEscuderia(escuderia.id)
                            }}
                        />
                    </li>
                ))}
            </ol>
        </section>
    );
}
