import { useState } from "react";
import Controles from "./components/Controles.tsx";
import EstadoCarga from "./components/EstadoCarga.tsx";
import ListaPilotos from "./components/ListaPilotos.tsx";
import Resumen from "./components/Resumen.tsx";
import TablaEscuderias from "./components/TablaEscuderias.tsx";
import { calcularEscuderias, calcularResumen, filtrarPilotos } from "./datos/logica.ts";
import { useLocalStorage } from "./hooks/useLocalStorage.ts";
import { usePilotos } from "./hooks/usePilotos.ts";


const primeraTemporada = 1950;
const temporadaActual = new Date().getFullYear();
const temporadas = Array.from({ length: temporadaActual - primeraTemporada + 1 }, (_, i) => temporadaActual - i);

export default function App() {
    // solo guardo en estado lo que cambia el usuario
    const [temporada, setTemporada] = useState(temporadaActual);
    const [escuderiaId, setEscuderiaId] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [soloFavoritos, setSoloFavoritos] = useState(false);
    const [favoritos, setFavoritos] = useLocalStorage<string[]>("parrilla-f1-favoritos", []);

    const { pilotos, cargando, error, reintentar } = usePilotos(temporada);

    // lo demas se calcula en cada render asi que no hace falta estado
    const escuderias = calcularEscuderias(pilotos);
    const { puntos, victorias } = calcularResumen(pilotos);
    const filtrados = filtrarPilotos(pilotos, escuderiaId, busqueda).filter(
        (piloto) => !soloFavoritos || favoritos.includes(piloto.id)
    );

    function manejarTemporada(nueva: number) {
        setTemporada(nueva);
        // la escuderia elegida puede no existir en la otra temporada
        setEscuderiaId("");
    }

    function manejarFavorito(id: string) {
        if (favoritos.includes(id)) {
            // ya era favorito asi que lo quito, filter crea un array nuevo
            setFavoritos(favoritos.filter((f) => f !== id));
        } else {
            // si no lo era lo aniado con spread para no mutar el estado
            setFavoritos([...favoritos, id]);
        }
    }

    return (
        <main>
            <header className="cabecera">
                <p className="etiqueta">Clasificación de pilotos</p>
                <h1>Parrilla <span>F1</span></h1>
            </header>

            <Controles
                temporadas={temporadas}
                temporada={temporada}
                onTemporada={manejarTemporada}
                escuderias={escuderias}
                escuderiaId={escuderiaId}
                onEscuderia={setEscuderiaId}
                busqueda={busqueda}
                onBusqueda={setBusqueda}
                soloFavoritos={soloFavoritos}
                onSoloFavoritos={setSoloFavoritos}
                totalFavoritos={favoritos.length}
            />

            {cargando && <EstadoCarga tipo="cargando" mensaje={`Cargando la temporada ${temporada}...`} />}
            {error && <EstadoCarga tipo="error" mensaje={error} onReintentar={reintentar} />}
            {!cargando && !error && pilotos.length === 0 && (
                <EstadoCarga tipo="vacio" mensaje={`Todavía no hay resultados para la temporada ${temporada}`} />
            )}

            {pilotos.length > 0 && (
                <>
                    <Resumen lider={pilotos[0].nombre} totalPilotos={pilotos.length} puntos={puntos} victorias={victorias} />
                    <TablaEscuderias escuderias={escuderias} />
                    {filtrados.length === 0 ? (
                        <EstadoCarga tipo="vacio" mensaje="Ningún piloto coincide con los filtros" />
                    ) : (
                        <ListaPilotos pilotos={filtrados} favoritos={favoritos} onAlternarFavorito={manejarFavorito} />
                    )}
                </>
            )}
        </main>
    );
}
