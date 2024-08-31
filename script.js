document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    let currentInput = '0';
    let operator = '';
    let firstOperand = null;
    let secondOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'C') {
                currentInput = '0';
                firstOperand = null;
                secondOperand = null;
                operator = '';
                display.textContent = currentInput;
                return;
            }

            if (value === '=') {
                if (operator && firstOperand !== null) {
                    secondOperand = parseFloat(currentInput);
                    currentInput = calculate(firstOperand, secondOperand, operator).toString();
                    display.textContent = currentInput;
                    firstOperand = null;
                    secondOperand = null;
                    operator = '';
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else if (operator) {
                    secondOperand = parseFloat(currentInput);
                    firstOperand = calculate(firstOperand, secondOperand, operator);
                }
                operator = value;
                currentInput = '0';
                return;
            }

            if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }

            display.textContent = currentInput;
        });
    });

    function calculate(a, b, operator) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return 0;
        }
    }
});