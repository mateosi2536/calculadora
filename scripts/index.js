const input = document.querySelector('input');
let num1 = null;
let num2 = null;
let sig1 = null;
let state = false; // true si el ultimo dijito es un signo, false si es un numero

function guardarNum1(num){
    num1 = parseFloat(num);
}

function guardarNum2(num){
    num2 = parseFloat(num);
}

function guardarSig1(sig){
    sig1 = sig;
}

function limpiarVar(){
    num1 = null;
    num2 = null;
    sig1 = null;
    sig2 = null;
}

function limpiarInput(){
    let j = input.value[input.value.length - 1];
    clear();
    input.value = j;
}

function testInput(){
    const regex = /[^0-9.]/g;
    const regexPlus = /[^+\-*/()r^]/g;

    let i = input.value[input.value.length - 1];
    input.value = input.value.replace(regex, '');

    if (!regexPlus.test(i)){ //es un signo
        if (sig1 != null && num1 !=null){ //num1 y sig1 tienen datos, es decir toca calcular, pero solo si el ulitimo dijito es un numero
            validarEnter();
            sig1 = i;
        }
        else if (sig1 == null && num1 != null){ // num1 tiene data y sig1 no, es decir despues de un "enter"
            guardarSig1(i);
        }
        else if (sig1 != null && num1 == null){ // num1 no tiene data y sig1 si, no deberia existir este caso

        }
        else{   // no hay nada de data
            if (input.value.length > 0){ // me aseguro de que haya datos en el input para continuar
                guardarNum1(input.value);
                guardarSig1(i);
            }
        }
        state = true;
    }
    else { //es un numero
        if (state == true){
            state = false;
            limpiarInput();
        }
    }
}

input.addEventListener('keydown', function(event) { // evento enter en el teclado
    if (event.key === 'Enter') {
        event.preventDefault();
        validarEnter();
    }
});

function validarEnter(){
    if (sig1 != null && state == false){ // valida que todo este ok para un enter
        guardarNum2(input.value);
        enter(sig1);
    }
    else return;
}

function bt(caracter) {
    input.value = input.value + caracter;
    testInput()
}

function enter(operation){
    let resultado = 0;
    switch (operation) {
        case '+':
          resultado = num1 + num2;
          break;
        case '-':
          resultado = num1 - num2;
          break;
        case '*':
          resultado = num1 * num2;
          break;
        case '/':
          if (num2 != 0) {
            resultado = num1 / num2;
          } else {
            resultado = 'Error: División por cero';
          }
          break;
        case '^':
            resultado = Math.pow(num1, num2);
            break;
        case 'r':
            if (num2 != 0) {98
                resultado = Math.pow(num2, (1 / num1));
            }   else {
                resultado = 'Error: Índice de raíz no puede ser cero';
            }
        default:
          resultado = input.value[input.value.length - 1];
          resultado = operation;
          break;
        }
    input.value = resultado;
    sig1 = null;
    num1 = resultado;
    num2 = null;
}

function del(){
    input.value = null;
}

function clear(){
    input.value = null;
}