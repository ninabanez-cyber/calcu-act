
let currentInput = "0";
let previousInput = "";
let operator = "";
let resetNext = false;

const result = document.getElementById("result");
const previous = document.getElementById("previous");

function updateDisplay() {
    result.value = currentInput;

    result.classList.remove("pop");
    void result.offsetWidth;
    result.classList.add("pop");
}

function appendNumber(number) {

    if (currentInput === "Error") {
        currentInput = "0";
    }

    if (resetNext) {
        currentInput = "0";
        resetNext = false;
    }

    if (number === "." && currentInput.includes(".")) {
        return;
    }

    if (currentInput === "0" && number !== ".") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}

function appendOperator(op) {

    if (currentInput === "Error") return;

    if (operator !== "" && !resetNext) {
        calculate();
    }

    previousInput = currentInput;
    operator = op;

    previous.textContent = previousInput + " " + op;

    resetNext = true;
}

function calculate() {

    if (operator === "" || previousInput === "") return;

    const first = parseFloat(previousInput);
    const second = parseFloat(currentInput);

    let answer;

    switch (operator) {

        case "+":
            answer = first + second;
            break;

        case "-":
            answer = first - second;
            break;

        case "*":
            answer = first * second;
            break;

        case "/":
            answer = second === 0 ? "Error" : first / second;
            break;

        case "%":
            answer = first % second;
            break;
    }

    if (typeof answer === "number" && Number.isFinite(answer)) {
        answer = Number(answer.toPrecision(12));
    }

    if (typeof answer === "number" && !Number.isFinite(answer)) {
        answer = "Error";
    }

    previous.textContent =
        previousInput + " " + operator + " " + currentInput + " =";

    currentInput = String(answer);

    operator = "";
    previousInput = "";
    resetNext = true;

    updateDisplay();
}

function clearDisplay() {

    currentInput = "0";
    previousInput = "";
    operator = "";
    resetNext = false;

    previous.textContent = "";

    updateDisplay();
}

function deleteNumber() {

    if (currentInput === "Error" || resetNext) {
        currentInput = "0";
        resetNext = false;
    } else {
        currentInput = currentInput.slice(0, -1);

        if (currentInput === "" || currentInput === "-") {
            currentInput = "0";
        }
    }

    updateDisplay();
}

// KEYBOARD SUPPORT

document.addEventListener("keydown", function(event) {

    if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
    }

    if (event.key === ".") {
        appendNumber(".");
    }

    if (["+", "-", "*", "/", "%"].includes(event.key)) {
        appendOperator(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }

    if (event.key === "Escape") {
        clearDisplay();
    }

});
