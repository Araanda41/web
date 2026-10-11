import "./Ranking.css";

type Jugador = {
    id: string;
    jugador: string;
    puntos: number;
};

type RankingProps = {
    jugadores: Jugador[];
};

export default function Ranking({ jugadores }: RankingProps) {
    return (
        <ol className="ranking">
            {jugadores.map((j) => (
                <li key={j.id}>
                    <span className="ranking-jugador">{j.jugador}</span> —{" "}
                    <span className="ranking-puntos">{j.puntos}</span> {j.puntos > 8000 && "🏅"}
                </li>
            ))}
        </ol>
    );
}
