# Driftea y aguanta

Misión M1: El Despertar del DOM. Web Development I.

Un minijuego de conducción hecho con HTML, CSS y JavaScript, sin frameworks, librerías ni servicios externos. El objetivo es cambiar entre tres carriles, esquivar las vallas y aguantar el máximo tiempo posible.

## Cómo probarlo

Descarga el proyecto conservando su estructura de carpetas y abre `index.html` en un navegador de escritorio. No hay que instalar nada ni iniciar un servidor. La partida comienza al abrir la página y se juega con teclado.

| Control | Acción |
| --- | --- |
| Flecha izquierda | Mover el coche un carril a la izquierda. |
| Flecha derecha | Mover el coche un carril a la derecha. |
| Flecha abajo o S | Alternar entre el modo día y el modo noche. |
| Botón «Volver a jugar» | Empezar otra partida después de chocar. |

Cada pulsación mueve el coche un carril. Mantener una tecla pulsada no repite la acción. La tecla S funciona tanto en mayúscula como en minúscula.

## Cómo funciona el juego

- Bajan dos filas de obstáculos, separadas 260 píxeles. Cuando una sale por abajo, vuelve a aparecer por arriba.
- Cada fila puede tener una o dos vallas, elegidas al azar. Siempre queda al menos un carril libre.
- Un temporizador mueve las filas cada 20 milisegundos y otro suma un punto cada 1000 milisegundos.
- La velocidad empieza en 3 píxeles por movimiento y aumenta cada 10 puntos hasta un máximo de 6. Al llegar a 30 puntos deja de aumentar.
- Si una valla visible coincide con el carril del coche y se solapan verticalmente, termina la partida. Se detienen los dos temporizadores, aparece el resultado y se enciende un resplandor rojo.
- Al reiniciar se restauran los puntos, la velocidad y las posiciones. Se conserva el tema que se estuviera utilizando.

## Archivos

- `index.html`: estructura de la carretera, coche, vallas, marcador y botón.
- `styles.css`: diseño, colores de los dos temas y transición del resplandor rojo.
- `app.js`: teclado, movimiento, obstáculos, colisiones, puntos y reinicio.
- `AE86 car/Single frame/AE86 f1.PNG`: imagen del coche.
- `AE86 car/icon.PNG`: favicon de la pestaña.

## Manipulación del DOM

Uso `querySelector` y `querySelectorAll` para acceder a los elementos. Cambio `style.left` y `style.top` para mover el coche y las vallas, `textContent` para actualizar los puntos y `hidden` para mostrar u ocultar obstáculos y el resultado.

Los eventos se registran con `addEventListener`: `keydown` controla las teclas y `click` reinicia la partida. `classList.toggle`, `add` y `remove` activan el tema y el efecto de derrota. Los colores y la animación están definidos en CSS.

## Uso de IA

He utilizado ChatGPT/Codex durante el desarrollo sobre todo para poder editar los estilos que es en lo que menos soltura tengo y gracias a la ayuda he conseguido recordar y conocer funciones que no recordaba o concía para poder estilar la página con más soltura y velocidad como yo quería.

También la he utilizado para comprobar casos de movimiento, colisión y reinicio, para revisar la presentación en el navegador y editar el Readme de erratas, fallos de estructura o forma de explicarme.

## Autopsia: decisiones de programación

1. **Reutilizar dos filas de vallas.** Cada fila guarda una referencia a su elemento HTML y su posición en una lista de objetos. Un bucle `for` recorre ambas. En lugar de crear elementos continuamente, cambio su posición y uso `hidden` para elegir qué vallas se ven. Esto mantiene pequeño el número de elementos y simplifica el código.

2. **Comprobar carril y altura para detectar los choques.** El coche cambia de carril de forma instantánea. Por eso basta con comprobar si hay una valla visible en ese carril y si su intervalo vertical coincide con el del coche. Uso `offsetTop` y `offsetHeight`, dejando cuatro píxeles de margen arriba y abajo del coche. No necesito comprobar los píxeles de las imágenes.

3. **Separar el movimiento y los puntos en dos temporizadores.** El movimiento necesita actualizarse con frecuencia, mientras que el marcador cambia una vez por segundo. Guardo los identificadores para detener ambos al perder. Antes de reiniciar también los detengo, evitando que se acumulen temporizadores y el juego se acelere por error.

## Recursos gráficos

El coche y el favicon proceden de [Car animation (AE86), de Neo.Bomb-studio](https://neobomb-studio.itch.io/car-animation), publicado en itch.io. Las vallas, los paneles y los efectos de luz están hechos con CSS.
