const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

/**
 * Adiciona eventos de click para cada botao, reconhece qual botao esta sendo clicado e chama sua respectiva funçao
 */
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        var buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText);
        }
        else {
            if (["+", "-", "x", "÷"].includes(buttonText)) {
                setOperator(buttonText);
            }
            else {
                switch (buttonText) {
                    case "%":
                        percentage();
                        break;

                    case "CE":
                        cancelEntry();
                        break;

                    case "C":
                        clear();
                        break;

                    case "⌫":
                        erase();
                        break;

                    case "n!":
                        factorial(currentNumber);
                        break;

                    case "x²":
                        squarePower();
                        break;

                    case "√x":
                        squareRoot();
                        break;

                    case "=":
                        calculate();
                        break;

                    case "±":
                        inverse();
                        break;

                    default:
                        return;
                }
            }
        }
    })
})

/**
 * Adiciona o próximo algarismo do valor numérico ao número atual
 * @param {string} digit - O digito a ser adicionado
 */
function addDigit(digit) {
    if (digit === "," && currentNumber.includes(",")) {
        return;
    }
    else {
        if (restart) {
            currentNumber = digit;
            restart = false;
        }
        else {
            currentNumber += digit;
        }
    }

    updateResult();
}

/**
 * Atualiza o display do resultado conforme usuário digita
 * @param {boolean} clear - Indica se o display deve ser limpo antes atualizar
 */
function updateResult(clear = false) {
    result.innerHTML = clear ? 0 : currentNumber.replace(",", ".");
}

/**
 * Reconhece o operador matemático clicado
 * @param {string} newOperator - Indica qual é o operador matemático básico
 */
function setOperator(newOperator) {
    if (currentNumber) {
        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
        operator = newOperator;
        updateResult();
    }
}

/**
 * Define o resultado da operação realizada
 */
function calculate() {
    if (operator == null || firstOperand == null) {
        return;
    }
    else {
        let secondOperand = parseFloat(currentNumber.replace(",", "."));
        let resultValue;
        switch (operator) {
            case "+":
                resultValue = firstOperand + secondOperand;
                break;

            case "-":
                resultValue = firstOperand - secondOperand;
                break;

            case "x":
                resultValue = firstOperand * secondOperand;
                break;

            case "÷":
                resultValue = firstOperand / secondOperand;
                break;

            default:
                return;
        }

        if (resultValue.toString().split(".")[1]?.length > 5) {
            currentNumber = parseFloat(resultValue.toFixed(5)).toString();
        }
        else {
            currentNumber = resultValue.toString();
        }

        firstOperand = null;
        operator = null;
        restart = true;
        updateResult();
    }
}

/**
 * Quando apertado o botao de porcentagem, o valor que aparece no display do resultado se torna um percentual
 * Se houver uma operaçao pendente e efetuado o calculo
 */
function percentage() {
    let auxPer = parseFloat(currentNumber.replace(",", ".")) / 100;
    if(operator) {
        switch (operator) {
            case "+":
                auxPer = firstOperand * auxPer;
                break;

            case "-":
                auxPer = firstOperand * auxPer;
        
            default:
                break;
        }
        currentNumber = auxPer.toString();
        calculate();
    }
    else{
        currentNumber = auxPer.toString();
        updateResult();
    }
}

/**
 * Apaga a numero digitado na calculadora
 */
function cancelEntry() {
    currentNumber = "";
    updateResult(true);
}

/**
 * Limpa todas as operaçoes da calculadora, restaura ao estado inicial
 */
function clear(){
    currentNumber = "";
    firstOperand = null;
    operator = null;
    restart = false;
    updateResult(true);
}

/**
 * Apaga o ultimo algarismo digitado na calculadora
 */
function erase() {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
    if(currentNumber == "") {
        updateResult(true);
    }
    else{
        updateResult();
    }
}

/**
 * Aplica o fatorial no número digitado na calculadora
 * @param {number} times - O número para calcular o fatorial
 * @return {number} O fatorial do número
 * @throws {Error} Se o número não for inteiro e positivo
 */
function factorial(times) {
    if(!times.includes(",")) {
        if(times > 0) {
            let auxFac = 1;
            for(cont=2; cont<=times; cont++) {
                auxFac *= cont;
            }
            currentNumber = auxFac.toString();
        }
        else {
            if(times == 0) {
                currentNumber = "1";
            }
        }
    }
    else {
        window.alert("Apenas números interiros e positivos tem fatorial!");
    }
    updateResult();
}

/**
 * Imprime a potência quadrada do número digitado na calculadora
 */
function squarePower() {
    let auxSqpr = parseFloat(currentNumber) ** 2;
    currentNumber = auxSqpr.toString();
    updateResult();
}

/**
 * Imprime a raiz quadrada do número digitado na calculadora
 */
function squareRoot(){
    let auxSqrt = parseFloat(currentNumber) ** (1/2);
    currentNumber = auxSqrt.toString();
    updateResult();
}

/**
 * Inverte o sinal do número digitado na calculadora
 */
function inverse() {
    let auxInv = parseFloat(currentNumber) * -1;
    currentNumber = auxInv.toString();
    updateResult();
}