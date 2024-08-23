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
                        console.log("percentage")
                        break;

                    case "CE":
                        console.log("cancel entry")
                        break;

                    case "C":
                        console.log("clear")
                        break;

                    case "⌫":
                        console.log("erase")
                        break;

                    case "n!":
                        console.log("factorial")
                        break;

                    case "x²":
                        console.log("square power")
                        break;

                    case "√x":
                        console.log("square root")
                        break;

                    case "=":
                        calculate();
                        break;

                    case "±":
                        console.log("inverse")
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
 */
function updateResult(clear = false) {
    result.innerHTML = clear ? 0 : currentNumber.replace(",", ".");
}

/**
 * Reconhece o operador matemático clicado
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