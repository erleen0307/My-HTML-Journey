const display = document.querySelector('.expression');
const buttons = document.querySelectorAll('.button');

let openBracket = true;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        // Reset display if showing Error or Infinity (except C or Backspace)
        if ((display.value === 'Error' || display.value === 'Infinity') &&
            !(value === 'C' || button.classList.contains('backspace'))
        ) {
            display.value = '';
        }

        if (value === '=') {
            try {
                // Auto-close unmatched parentheses
                const openParens = (display.value.match(/\(/g) || []).length;
                const closeParens = (display.value.match(/\)/g) || []).length;
                let expr = display.value + ')'.repeat(openParens - closeParens);

                display.value = eval(expr);
            } catch {
                display.value = 'Error';
            }

        } else if (value === '( )') {
            // Toggle between ( and )
            display.value += openBracket ? '(' : ')';
            openBracket = !openBracket;

        } else if (value === 'C') {
            display.value = '';

        } else if (button.classList.contains('backspace')) {
            display.value = display.value.slice(0, -1);

        } else { 
            display.value += value;
        }
    });
});
