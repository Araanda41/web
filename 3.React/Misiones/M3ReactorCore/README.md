# Misión M3: Reactor Core

Web Development I.

La app de la misión M2 pasada a React 19 con Vite y TypeScript. Enseña la clasificación de pilotos de F1 de cualquier temporada, desde 1950 hasta la actual, con los datos de la [Jolpica F1 API](https://github.com/jolpica/jolpica-f1).

## Cómo probarlo

```bash
npm install
npm run dev
```

Eliges una temporada y salen el resumen, las mejores escuderías y una tarjeta por piloto. Se puede filtrar por escudería o buscar por nombre o código, por ejemplo `ALO`. Lo nuevo respecto al M2 es que cada piloto tiene una estrella para marcarlo como favorito y un filtro para ver solo los favoritos. Se guardan aunque recargues la página.

## Archivos

- `src/App.tsx`: guarda el estado y junta todos los componentes.
- `src/components/`: `Controles`, `Resumen`, `TablaEscuderias`, `ListaPilotos`, `TarjetaPiloto` y `EstadoCarga`.
- `src/hooks/usePilotos.ts`: pide los pilotos de una temporada y dice si está cargando o ha fallado.
- `src/hooks/useLocalStorage.ts`: un `useState` que se guarda en `localStorage`.
- `src/datos/`: la API, la caché, la lógica, los tipos y los colores, casi igual que en el M2.
- `src/styles.css`: los estilos.

## Qué he tenido en cuenta

- Cada componente hace una sola cosa. Los hijos reciben props y avisan al padre con funciones como onTemporada o onAlternarFavorito.
- En App solo hay estado de lo que cambia el usuario. Las escuderías, el resumen y la lista filtrada se calculan en cada render.
- Al cambiar de temporada la escudería elegida se reinicia en el manejador del evento y no en un useEffect.
- Los useEffect son solo dos, uno para pedir los datos y otro para guardar en localStorage.
- Las listas usan`key con el id del piloto o de la escudería, nunca el índice.
- El estado se actualiza sin mutarlo, con filter y spread.

## Uso de IA

He usado claude sobre todo para poder saber que cambiaba al pasar de vyte con ts puro a react porque me liaba bastante con que podia reutilizar y que no y que tenia que cambiar y como, sobre todo también con que me ayudase a entender los usestates useeffect y custom hooks

## Autopsia

1. **Los datos separados de React.** La API, la caché y la lógica las copié tal cual del M2 porque no saben nada del DOM. Lo único que he cambiado es render.ts por componentes.
2. **Estado mínimo.** Solo guardo lo que cambia el usuario. cargando tampoco es un estado, sale de comparar una clave, así no hay que sincronizarlo a mano.
3. **El cleanup del efecto.** En el M2 usaba un contador para ignorar las respuestas que llegaban tarde. Ahora el efecto devuelve una función que marca la petición como cancelada y hace lo mismo con menos código.
