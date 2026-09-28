const coche = document.getElementById("coche");

const posiciones = ["16.67%", "50%", "83.33%"];

let carrilActual = 1;
coche.style.left = posiciones[carrilActual];

document.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowLeft" || evento.key === "ArrowRight" || evento.key === "ArrowDown") {
        evento.preventDefault();
    }

    if (evento.repeat) {
        return;
    }

    if (evento.key === "ArrowLeft" && carrilActual > 0) {
        carrilActual--;
    } else if (evento.key === "ArrowRight" && carrilActual < 2) {
        carrilActual++;
    } else if (evento.key === "ArrowDown" || evento.key.toLowerCase() === "s") {
        document.body.classList.toggle("noche");
    }

    coche.style.left = posiciones[carrilActual];
});
