const probarBoton = document.querySelector("#probar");
const reiniciarBoton = document.querySelector("#reiniciar");
const contadorIntentos = document.querySelector("#contador");
const input = document.querySelector("#intento");
const historial = document.querySelector("#historial");
const arrayIntentos = [];
let secreto = generarNumeroSecreto();
let cuenta = 0;


probarBoton.addEventListener("click", comprobarNumero);

reiniciarBoton.addEventListener("click", reiniciarJuego);

console.log("Psst..... el secreto es", secreto);

function generarNumeroSecreto() {
    return Math.floor(Math.random() * 100 + 1);
}

function reiniciarJuego(){
    probarBoton.disabled = false;
    secreto = generarNumeroSecreto();
    console.log("Psst..... el secreto es", secreto);
    cuenta = 0;
    contadorIntentos.textContent = "Intentos: 0";
    historial.textContent = "Todavía no has probado ningún número.";
    arrayIntentos.length = 0;
}

function comprobarNumero(){
    // quito los espacios 
    const valor = input.value.trim();

    if(valor===""){
        alert("Has dejado el campo vacio, escribe un numero");  
        return;  
    }

    // si el valor es un cararacter o varios sera NaN
    const numValor = Number(valor);

    if(Number.isNaN(numValor)){
        alert("No es un numero");
        return;
    }

    if(numValor > 100 || numValor <= 0){
        alert("El numero debe ser entre 1 y 100 incluyendolos");
        return;
    }
    
    cuenta++;
    contadorIntentos.textContent = "Intentos:" + cuenta ;
    arrayIntentos.push(numValor);
    // el join convierte todos los elementos en una cadena de texto y puedes añadirle un separador por cada elemento como aquii que pongo la coma y el espacio
    historial.textContent = "Has probado el: " + arrayIntentos.join(", ");

    if(numValor === secreto){
        probarBoton.disabled= true;
        alert("!Has acertado! Has hecho " + cuenta + " intentos");
        return;
    }    

    if (cuenta >= 7) {
        probarBoton.disabled = true;
        alert("Has llegado al límite de intentos, has perdido");
        return;
    }

    if (numValor < secreto) {
        alert("El número es más alto");
    } else {
        alert("El número es más bajo");
    }


}
