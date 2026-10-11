import type { ComponentType } from "react";
import Ejercicio01 from "./01-componentes/Ejercicio.tsx";
import Ejercicio02 from "./02-props-tripulacion/Ejercicio.tsx";
import Ejercicio03 from "./03-RankingArcade/Ejercicio.tsx";

export type EjercicioInfo = {
    id: string;
    titulo: string;
    Componente: ComponentType;
};

// para añadir un ejercicio crea subcarpeta y mete una linea de ese ejercicio aqui
export const ejercicios: EjercicioInfo[] = [
    { id: "01", titulo: "Componentes básicos", Componente: Ejercicio01 },
    { id: "02", titulo: "Props: tripulación", Componente: Ejercicio02 },
    { id: "03", titulo: "Map: Ranking Arcade", Componente: Ejercicio03 },
];
