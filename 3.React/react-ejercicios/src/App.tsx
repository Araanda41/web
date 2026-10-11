import { useEffect, useState } from "react";
import { ejercicios } from "./ejercicios/index.ts";
import "./App.css";

// El ejercicio activo se guarda en la URL (#02) para que no se pierda al recargar.
function idDesdeUrl(): string {
    const id = window.location.hash.slice(1);
    const existe = ejercicios.some((e) => e.id === id);
    return existe ? id : ejercicios[ejercicios.length - 1].id;
}

export default function App() {
    const [activo, setActivo] = useState(idDesdeUrl);

    // Cuando cambia la URL (al pulsar un enlace del menú), actualizamos el ejercicio activo.
    useEffect(() => {
        const alCambiar = () => setActivo(idDesdeUrl());
        window.addEventListener("hashchange", alCambiar);
        return () => window.removeEventListener("hashchange", alCambiar);
    }, []);

    const ejercicio = ejercicios.find((e) => e.id === activo)!;

    return (
        <>
            <nav className="menu">
                {ejercicios.map((e) => (
                    <a
                        key={e.id}
                        href={`#${e.id}`}
                        className={e.id === activo ? "activo" : ""}
                    >
                        {e.id} · {e.titulo}
                    </a>
                ))}
            </nav>

            <main>
                <h1>{ejercicio.id} · {ejercicio.titulo}</h1>
                <ejercicio.Componente />
            </main>
        </>
    );
}
