import Ranking from "./Ranking.tsx";

const RANKING = [
    { id: "a1", jugador: "NOVA", puntos: 9800 },
    { id: "b2", jugador: "PIXEL", puntos: 8650 },
    { id: "c3", jugador: "KIRA", puntos: 7400 },
    { id: "d4", jugador: "BYTE", puntos: 5200 },
];

export default function Ejercicio03() {
    return <Ranking jugadores={RANKING} />;
}
