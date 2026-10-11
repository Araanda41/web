import "./FichaTripulante.css";

type FichaTripulanteProps = {
    nombre: string;
    rol: string;
    especie?: string;
};

export default function FichaTripulante({ nombre, rol, especie = "humana" }: FichaTripulanteProps) {
    return (
        <article className="ficha">
            <h2>{nombre}</h2>
            <p><span className="ficha-etiqueta">Rol:</span> {rol}</p>
            <p><span className="ficha-especie">{especie}</span></p>
        </article>
    );
}
