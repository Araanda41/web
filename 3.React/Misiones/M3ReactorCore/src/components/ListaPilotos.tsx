import type { Piloto } from "../datos/tipos.ts";
import TarjetaPiloto from "./TarjetaPiloto.tsx";

interface Props {
    pilotos: Piloto[];
    favoritos: string[];
    onAlternarFavorito: (id: string) => void;
}

export default function ListaPilotos({ pilotos, favoritos, onAlternarFavorito }: Props) {
    return (
        <section className="pilotos" aria-label="Pilotos">
            {pilotos.map((piloto) => (
                <TarjetaPiloto
                    key={piloto.id}
                    piloto={piloto}
                    favorito={favoritos.includes(piloto.id)}
                    onAlternarFavorito={onAlternarFavorito}
                />
            ))}
        </section>
    );
}
