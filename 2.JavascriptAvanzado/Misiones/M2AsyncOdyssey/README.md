# Misión M2: Async Odyssey

Web Development I.

Una app hecha con Vite y TypeScript que enseña la clasificación de pilotos de F1 de cualquier temporada, desde 1950 hasta la actual. Los datos salen de la [Jolpica F1 API](https://github.com/jolpica/jolpica-f1), que es gratis y no necesita clave.

## Cómo probarlo

```bash
npm install
npm run dev
```

Eliges una temporada y salen el resumen, las mejores escuderías y una tarjeta por piloto. Se puede filtrar por escudería o buscar un piloto por nombre o por código, por ejemplo `ALO`.

## Archivos

- `src/api.ts`: la petición a la API.
- `src/cache.ts`: guarda en `localStorage` las temporadas ya pedidas.
- `src/logica.ts`: limpia y transforma los datos.
- `src/render.ts`: pinta todo en el DOM.
- `src/main.ts`: une lo anterior y gestiona los eventos.
- `src/tipos.ts`: las interfaces de los datos.
- `src/styles.css`: los estilos.

## Qué he tenido en cuenta

- Mientras carga sale un semáforo de F1, si falla aparece el error con un botón para reintentar y si no hay datos se avisa.
- `fetch` va con `async/await`, `try/catch` y comprobando `response.ok`, porque un 404 no lanza error por sí solo.
- Los datos se transforman con `map`, `filter`, `reduce`, `Object.groupBy` y `toSorted` antes de pintarlos.
- Si a la API le falta algún campo o manda algo raro, se pone un valor por defecto en vez de romper la página.

## Uso de IA

He utilizado Claude Code sobre todo para los estilos y con dudas de como tratar los datos que recibo de la API para poder hacer la idea que tenia. Me ha ido dando ideas mas complejas y simples pero en resumen he tendido a las más simples para no morir en la defensa oral.

## Autopsia

1. **API, lógica y render separados.** Cada archivo hace una sola cosa, así puedo cambiar el diseño sin tocar las peticiones.
2. **Limpiar los datos nada más llegar.** La API manda números como texto y campos que a veces faltan. Los convierto una vez a un objeto `Piloto` sencillo y el resto del código ya trabaja tranquilo.
3. **Ignorar respuestas que llegan tarde.** Si cambias de temporada rápido, una respuesta antigua podría pisar a la nueva, así que cada petición lleva un número y solo pinto la última.
