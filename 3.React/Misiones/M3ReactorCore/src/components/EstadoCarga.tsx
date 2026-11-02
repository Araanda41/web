interface Props {
    tipo: "cargando" | "error" | "vacio";
    mensaje: string;
    onReintentar?: () => void;
}

export default function EstadoCarga({ tipo, mensaje, onReintentar }: Props) {
    return (
        <section className={`estado ${tipo}`} aria-live="polite">
            {tipo === "cargando" && (
                <div className="semaforo" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span>
                </div>
            )}
            <p>{mensaje}</p>
            {tipo === "error" && onReintentar && (
                <button type="button" onClick={onReintentar}>Reintentar</button>
            )}
        </section>
    );
}
