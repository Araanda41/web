const boton = document.querySelector("#boton");
const contadorIntentos = document.querySelector("#contador");
const input = document.querySelector("#intento");
const secreto = Math.floor(Math.random()*100 + 1);

let cuenta = 0;

boton.addEventListener("click", comprobarNumero)
console.log("Psst..... el secreto es", secreto);
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

    if(numValor < secreto){
        alert("El número es más alto");
    }

    else if(numValor>secreto){
        alert("El número es más bajo");
    }

    else {
        boton.disabled= true;
        alert("!Has acertado! Has hecho " + cuenta + " intentos");
    }



}