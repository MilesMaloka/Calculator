const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let currentValue = '';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            handleOperator(button.value);
        } else {
            handleNumber(button.value);
        }
        updateDisplay();
    });
});

function handleNumber(value) {
    if (shouldResetDisplay) {
        currentValue = '';
        shouldResetDisplay = false;
    }
    currentValue += value;
}

function handleOperator(operator) {
    if (operator === 'clear') {
        currentValue = '';
        previousValue = '';
        operation = null;
        return;
    }
    
    if (operator === 'backspace') {
        currentValue = currentValue.slice(0, -1);
        return;
    }

    if (operator === '=') {
        if (operation && previousValue) {
            currentValue = calculate();
            previousValue = '';
            operation = null;
            shouldResetDisplay = true;
        }
        return;
    }

    if (currentValue === '') return;

    if (previousValue !== '') {
        currentValue = calculate();
    }

    operation = operator;
    previousValue = currentValue;
    shouldResetDisplay = true;
}

function calculate() {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    if (isNaN(prev) || isNaN(current)) return '';
    
    let result;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return '';
    }
    return result.toString();
}

function updateDisplay() {
    display.value = currentValue;
}