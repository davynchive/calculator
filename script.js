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
    if(b === 0){
        return "Undefined.";
    }

    return a / b;
}

let firstNumber = null;
let operator = null;
let secondNumber = null;
let waitingForSecondNumber = false;
let resultDisplayed = false;

function operate(operator, a, b) {
    let result;

    if (operator === "+") {
        result = add(a, b);
    } else if (operator === "-") {
        result = subtract(a, b);
    } else if (operator === "*") {
        result = multiply(a, b);
    } else if (operator === "/") {
        result = divide(a, b);
    }

    if (typeof result === "number") {
        return Math.round(result * 100000000) / 100000000;
    }

    return result;
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
    if (firstNumber === null || operator === null || waitingForSecondNumber) {
        return;
    }

    secondNumber = Number(display.textContent);

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

const decimalButton = document.querySelector("#decimal");

decimalButton.addEventListener("click", () => {
    if (resultDisplayed) {
        display.textContent = "0.";
        resultDisplayed = false;
        firstNumber = null;
        operator = null;
        secondNumber = null;
        waitingForSecondNumber = false;
        return;
    }

    if (waitingForSecondNumber) {
        display.textContent = "0.";
        waitingForSecondNumber = false;
        return;
    }

    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
});

const backspaceButton = document.querySelector("#backspace");

backspaceButton.addEventListener("click", () => {
    if(resultDisplayed){
        return;
    }

    if(display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = "0";
    }
});