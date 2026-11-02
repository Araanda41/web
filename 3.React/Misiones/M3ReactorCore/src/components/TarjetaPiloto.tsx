import type { CSSProperties } from "react";
import { colorEscuderia } from "../datos/colores.ts";
import type { Piloto } from "../datos/tipos.ts";

interface Props {
    piloto: Piloto;
    favorito: boolean;
    onAlternarFavorito: (id: string) => void;
}

export default function TarjetaPiloto({ piloto, favorito, onAlternarFavorito }: Props) {
    const estilo = { "--color-equipo": colorEscuderia(piloto.escuderiaId) } as CSSProperties;

    return (
        <article className="tarjeta" style={estilo}>
            <div className="tarjeta-cabecera">
                <span className="posicion">P{piloto.posicion}</span>
                <div className="tarjeta-acciones">
                    <span className="codigo">{piloto.codigo}</span>
                    <button
                        type="button"
                        className="favorito"
                        aria-pressed={favorito}
                        aria-label={favorito ? `Quitar a ${piloto.nombre} de favoritos` : `Añadir a ${piloto.nombre} a favoritos`}
                        onClick={() => onAlternarFavorito(piloto.id)}
                    >
                        {favorito ? "★" : "☆"}
                    </button>
                </div>
            </div>
            <h3 className="nombre">{piloto.nombre}</h3>
            <p className="escuderia">{piloto.escuderia}</p>
            <p className="nacionalidad">
                {piloto.numero ? `#${piloto.numero} · ${piloto.nacionalidad}` : piloto.nacionalidad}
            </p>
            <div className="tarjeta-datos">
                <span>{piloto.puntos} pts</span>
                <span>{piloto.victorias === 1 ? "1 victoria" : `${piloto.victorias} victorias`}</span>
            </div>
        </article>
    );
}
