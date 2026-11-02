import { useEffect, useState } from "react";

// igual que useState pero guarda el valor en localStorage
export function useLocalStorage<T>(clave: string, inicial: T) {
    const [valor, setValor] = useState<T>(() => {
        try {
            const texto = localStorage.getItem(clave);
            return texto === null ? inicial : (JSON.parse(texto) as T);
        } catch {
            // si el json esta roto o no hay localStorage uso el inicial
            return inicial;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(clave, JSON.stringify(valor));
        } catch {
            // si esta lleno no se guarda
        }
    }, [clave, valor]);

    return [valor, setValor] as const;
}
