interface Props {
    lider: string;
    totalPilotos: number;
    puntos: number;
    victorias: number;
}

export default function Resumen({ lider, totalPilotos, puntos, victorias }: Props) {
    return (
        <section className="resumen" aria-label="Resumen de la temporada">
            <article>
                <p className="etiqueta">Campeón o líder</p>
                <p className="dato">{lider}</p>
            </article>
            <article>
                <p className="etiqueta">Pilotos</p>
                <p className="dato">{totalPilotos}</p>
            </article>
            <article>
                <p className="etiqueta">Puntos repartidos</p>
                <p className="dato">{puntos.toLocaleString("es-ES")}</p>
            </article>
            <article>
                <p className="etiqueta">Victorias</p>
                <p className="dato">{victorias}</p>
            </article>
        </section>
    );
}
