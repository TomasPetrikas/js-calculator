const MAX_DISPLAY_LENGTH = 15;
let displayValue = "";

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

function operate(a, op, b) {
  return op(a, b);
}

function updateDisplay() {
  const display = document.querySelector("#display");
  display.textContent = displayValue;
}

function clearDisplay() {
  displayValue = "";

  const display = document.querySelector("#display");
  display.textContent = displayValue;
}

function addDigit(e) {
  if (displayValue.length + e.target.value.length <= MAX_DISPLAY_LENGTH) {
    displayValue += e.target.value;
    updateDisplay();
  }
}

const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");

const clear = document.querySelector("#clear");

zero.addEventListener("click", addDigit);
one.addEventListener("click", addDigit);
two.addEventListener("click", addDigit);
three.addEventListener("click", addDigit);
four.addEventListener("click", addDigit);
five.addEventListener("click", addDigit);
six.addEventListener("click", addDigit);
seven.addEventListener("click", addDigit);
eight.addEventListener("click", addDigit);
nine.addEventListener("click", addDigit);

clear.addEventListener("click", clearDisplay);