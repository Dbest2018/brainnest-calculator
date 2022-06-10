const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const allClearButton = document.querySelector(".all__clear");
const previousOperandTextElement = document.querySelector(".previous__operand");
const currentOperandTextElement = document.querySelector(".current__operand");

let currentOperand = "";
let previousOperand = "";
let operation = undefined;

// Helper functions
const operate = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if(isNaN(prev) || isNaN(current)) return
    switch(operation){
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "*":
            computation = prev * current;
            break;
        case "÷":
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = ""
}

const appendNumber = (number) => {
    if(number === "." && currentOperand.toString().includes("."))return
    currentOperand = currentOperand.toString() + number.toString()
}

const chooseOperation = (newOperation) => {
    if(currentOperand ==="") return
    if(previousOperand !== ""){
        operate()
    }
    operation = newOperation;
    previousOperand = currentOperand;
    currentOperand = ""
}

const getDisplayNumber = (number) => {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if(isNaN(integerDigits)){
        integerDisplay = ""
    } else {
        integerDisplay = integerDigits.toLocaleString("en", {
            maximumFractionDigits: 0
        })
    }
    if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`;
    } else{
        return integerDisplay;
    }
}

const updateDisplay = () => {
    currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
    if(operation != null){
        previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
    } else{
        previousOperandTextElement.innerText = ""
    }
}

const clear = () => {
    currentOperand = "";
    previousOperand = "";
    operation = undefined;
}

const remove = () => {
    currentOperand = currentOperand.toString().slice(0, -1);
}

// Even listeners
numberButtons.forEach( button => {
    button.addEventListener("click", ()=> {
        appendNumber(button.innerText);
        updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        chooseOperation(button.innerText);
        updateDisplay();
    })
})

equalsButton.addEventListener("click", button => {
    operate();
    updateDisplay();
})

allClearButton.addEventListener("click", button => {
    clear();
    updateDisplay();
})

deleteButton.addEventListener("click", button => {
    remove();
    updateDisplay();
})