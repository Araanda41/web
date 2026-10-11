import FichaTripulante from "./FichaTripulante.tsx";

export default function Ejercicio02() {
    return (
        <section className="tripulacion">
            <FichaTripulante nombre="Alberto" rol="Capitan" especie="Marciano" />
            <FichaTripulante nombre="Paula" rol="Vicecapitana" especie="vulcano" />
            <FichaTripulante nombre="Ruben" rol="Oficial" especie="Venusiano" />
            <FichaTripulante nombre="Adrian" rol="Cientifico" />
        </section>
    );
}
