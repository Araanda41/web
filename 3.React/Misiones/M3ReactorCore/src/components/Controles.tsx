import type { Escuderia } from "../datos/tipos.ts";

interface Props {
    temporadas: number[];
    temporada: number;
    onTemporada: (temporada: number) => void;
    escuderias: Escuderia[];
    escuderiaId: string;
    onEscuderia: (id: string) => void;
    busqueda: string;
    onBusqueda: (texto: string) => void;
    soloFavoritos: boolean;
    onSoloFavoritos: (valor: boolean) => void;
    totalFavoritos: number;
}

// los valores vienen de App y aqui solo se avisa de los cambios
export default function Controles({
    temporadas,
    temporada,
    onTemporada,
    escuderias,
    escuderiaId,
    onEscuderia,
    busqueda,
    onBusqueda,
    soloFavoritos,
    onSoloFavoritos,
    totalFavoritos
}: Props) {
    return (
        <section className="controles" aria-label="Filtros">
            <label>
                Temporada
                <select value={temporada} onChange={(e) => onTemporada(Number(e.target.value))}>
                    {temporadas.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </label>
            <label>
                Escudería
                <select value={escuderiaId} onChange={(e) => onEscuderia(e.target.value)}>
                    <option value="">Todas</option>
                    {escuderias.map((escuderia) => (
                        <option key={escuderia.id} value={escuderia.id}>{escuderia.nombre}</option>
                    ))}
                </select>
            </label>
            <label className="buscador">
                Buscar piloto
                <input
                    type="search"
                    value={busqueda}
                    onChange={(e) => onBusqueda(e.target.value)}
                    placeholder="Nombre o código, por ejemplo ALO"
                    autoComplete="off"
                />
            </label>
            <label className="solo-favoritos">
                <input
                    type="checkbox"
                    checked={soloFavoritos}
                    onChange={(e) => onSoloFavoritos(e.target.checked)}
                />
                Solo favoritos ({totalFavoritos})
            </label>
        </section>
    );
}
