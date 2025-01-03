const result = document.getElementById('result');

function appendNumber(num) {
    result.value += num;
}

function clearDisplay() {
    result.value = '';
}

function deleteChar() {
    result.value = result.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace × with * for calculation
        let expression = result.value.replace('×', '*');
        
        // Evaluate the expression
        let answer = eval(expression);
        
        // Handle division by zero
        if (!isFinite(answer)) {
            throw new Error('Invalid operation');
        }
        
        // Round to 8 decimal places if needed
        if (Number.isInteger(answer)) {
            result.value = answer;
        } else {
            result.value = answer.toFixed(8).replace(/\.?0+$/, '');
        }
    } catch (error) {
        result.value = 'Error';
        setTimeout(clearDisplay, 1000);
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers and operators
    if (/[\d\+\-\*\/\.\%]/.test(key)) {
        appendNumber(key);
    }
    // Enter key for calculation
    else if (key === 'Enter') {
        calculate();
    }
    // Backspace for delete
    else if (key === 'Backspace') {
        deleteChar();
    }
    // Escape for clear
    else if (key === 'Escape') {
        clearDisplay();
    }
});