export function floatingLabels(inputs) {
    inputs.forEach(input => {
        const label = input.parentNode.querySelector('label');
        if (!label) return;  // Skip this iteration if the label is null

        const isDarkMode = document.body.classList.contains('dark-mode');
        const colorStyle = isDarkMode ? 'color: var(--color-dark-text);' : '';

        const focusHandler = () => {
            label.style.transform = 'translate(15px, -30px)';
            label.style.cssText += colorStyle;
        };

        const blurHandler = () => {
            if (input.value === '') {
                label.style.transform = 'translate(15px, 8px)';
                label.style.color = 'Black';
            }
        };

        input.addEventListener('focus', focusHandler);
        input.addEventListener('blur', blurHandler);

        if (input.value !== '') {
            focusHandler();
        }
    });
}