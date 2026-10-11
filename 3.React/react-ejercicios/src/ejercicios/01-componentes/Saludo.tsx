type SaludoProps = {
    nombre: string;
};

export default function Saludo({ nombre }: SaludoProps) {
    return <p>Hola, {nombre}</p>;
}
