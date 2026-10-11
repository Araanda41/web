type BotonProps = {
    texto?: string;
};

export default function Boton({ texto = "Pulsa aqui" }: BotonProps) {
    return <button>{texto}</button>;
}
