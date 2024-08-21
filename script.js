const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

//Adicionar eventos de click para cada botao, reconhecer qual botao esta sendo clicado e chamar sua respectiva funçao
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        var buttonText = button.innerText;
        if(/^[0-9,]+$/.test(buttonText)){
            addDigit(buttonText);
        }
        else{
            console.log(buttonText)
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
                case "÷":
                    console.log("division")
                    break;
                case "x":
                    console.log("multiplication")
                    break;
                case "-":
                    console.log("minus")
                    break;
                case "+":
                    console.log("plus")
                    break;
                case "=":
                    console.log("equal")
                    break;
                case "±":
                    console.log("inverse")
                    break;
            }
        }
    })
})

function addDigit(digit){
    if(digit === "," && currentNumber.includes(",")){
        return;
    }
    else{
        if(restart){
            currentNumber = digit;
            restart = false;
        }
        else{
            currentNumber += digit;
        }
        console.log(currentNumber)
    }
}
