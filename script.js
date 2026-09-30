function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstNumber = null;
let operator = null;
let secondNumber = null;
let waitingForSecondNumber = false;
let resultDisplayed = false;

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    }
}

const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");

digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if(resultDisplayed){
            display.textContent = button.textContent;
            resultDisplayed = false;
            firstNumber = null;
            operator = null;
            secondNumber = null;
        }
        else if(waitingForSecondNumber) {
            display.textContent = button.textContent;
            waitingForSecondNumber = false;
        }
        else if(display.textContent === "0") {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }
    });
});

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const currentNumber = Number(display.textContent);

        if (resultDisplayed) {
            firstNumber = currentNumber;
            resultDisplayed = false;
        } else if (firstNumber === null) {
            firstNumber = currentNumber;
        } else if (operator !== null && !waitingForSecondNumber) {
            secondNumber = currentNumber;

            const result = operate(operator, firstNumber, secondNumber);

            display.textContent = result;
            firstNumber = result;
        }

        operator = button.textContent;
        waitingForSecondNumber = true;
    });
});

const equalsButton = document.querySelector("#equals");

equalsButton.addEventListener("click", () => {
    secondNumber = Number(display.textContent);

    if(firstNumber === null || operator === null || secondNumber === null) {
        return;
    }

    const result = operate(operator, firstNumber, secondNumber);
    
    display.textContent = result;
    resultDisplayed = true;
});

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => {
    display.textContent = "0";

    firstNumber = null;
    operator = null;
    secondNumber = null;
    waitingForSecondNumber = false;
    resultDisplayed = false;
});