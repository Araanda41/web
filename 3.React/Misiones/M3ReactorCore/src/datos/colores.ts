// colores de las escuderias actuales y si no esta en la lista usa el acento de la pagina
const coloresEscuderias: Record<string, string> = {
    red_bull: "#3671c6",
    mclaren: "#ff8000",
    ferrari: "#e8002d",
    mercedes: "#27f4d2",
    aston_martin: "#229971",
    alpine: "#ff87bc",
    williams: "#64c4ff",
    rb: "#6692ff",
    sauber: "#52e252",
    audi: "#bb0a30",
    haas: "#b6babd",
    cadillac: "#c9a227"
};

export function colorEscuderia(id: string): string {
    return coloresEscuderias[id] ?? "var(--acento)";
}
