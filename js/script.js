// This project was a bit of a slog to get through. There are various bugs
// and I wanted to implement more features, but I also want to move on.
// It'll do.

const MAX_DISPLAY_LENGTH = 15;
let displayValue = "";
let currentOperation = null;
let firstOperand = null;
let clearNextInput = false;

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

// Does not clear currentOperation and firstOperand, those are handled in
// other functions
function clearDisplay() {
  displayValue = "";
  // currentOperation = null;
  // firstOperand = null;

  updateDisplay();
}

function addSymbol(e) {
  if (clearNextInput) {
    firstOperand = displayValue;
    clearDisplay();
    clearNextInput = false;
  }

  if (displayValue.length + e.target.value.length <= MAX_DISPLAY_LENGTH) {
    displayValue += e.target.value;
    updateDisplay();
  }
}

function setOperation(e) {
  if (currentOperation !== null) {
    setEqual();
    firstOperand = displayValue;
  }

  switch(e.target.value) {
    case "add":
      currentOperation = add;
      break;
    case "subtract":
      currentOperation = subtract;
      break;
    case "multiply":
      currentOperation = multiply;
      break;
    case "divide":
      currentOperation = divide;
      break;
    default:
      console.log("Something went horribly wrong");
      currentOperation = null;
  }

  clearNextInput = true;
}

function changeSign() {
  // This doesn't work when floating points get involved
  // displayValue *= -1;

  if (displayValue.length >= 1) {
    if (displayValue.includes("-")) {
      displayValue = displayValue.slice(1);
    }
    else {
      displayValue = "-" + displayValue;
    }
    
    updateDisplay();
  }
}

function addFloatingPoint() {
  if (displayValue.includes(".") === false && displayValue.length >= 1) {
    displayValue += ".";
    updateDisplay();
  }
}

function setEqual() {
  // console.log("First operand: " + firstOperand);
  // console.log("Current operation: " + currentOperation);
  if (firstOperand !== null && currentOperation !== null) {
    // Convert operands from string to number with "+"
    displayValue = operate(+firstOperand, currentOperation, +displayValue);
    displayValue = truncateDisplay();

    // console.log(displayValue);
    updateDisplay();

    currentOperation = null;
    firstOperand = null;
  }
}

// Shorten displayValue to fit in display, if possible
// Return displayValue as number so integers don't display as XYZ.00000...
function truncateDisplay() {
  console.log(typeof displayValue);
  if (displayValue.toFixed(0).length > MAX_DISPLAY_LENGTH) {
    return +displayValue.toFixed(0);
  }
  else {
    for (let i = MAX_DISPLAY_LENGTH - 1; i >= 0; i--) {
      if (displayValue.toFixed(i).length <= MAX_DISPLAY_LENGTH) {
        return +displayValue.toFixed(i);
      }
    }
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

const addBtn = document.querySelector("#add");
const subtractBtn = document.querySelector("#subtract");
const multiplyBtn = document.querySelector("#multiply");
const divideBtn = document.querySelector("#divide");
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");

const sign = document.querySelector("#sign");
const floatingPoint = document.querySelector("#floating-point");

zero.addEventListener("click", addSymbol);
one.addEventListener("click", addSymbol);
two.addEventListener("click", addSymbol);
three.addEventListener("click", addSymbol);
four.addEventListener("click", addSymbol);
five.addEventListener("click", addSymbol);
six.addEventListener("click", addSymbol);
seven.addEventListener("click", addSymbol);
eight.addEventListener("click", addSymbol);
nine.addEventListener("click", addSymbol);

addBtn.addEventListener("click", setOperation);
subtractBtn.addEventListener("click", setOperation);
multiplyBtn.addEventListener("click", setOperation);
divideBtn.addEventListener("click", setOperation);
equals.addEventListener("click", setEqual);
clear.addEventListener("click", clearDisplay);

sign.addEventListener("click", changeSign);
floatingPoint.addEventListener("click", addFloatingPoint);