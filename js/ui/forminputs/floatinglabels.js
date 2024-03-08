export function floatingLabels(inputs) {
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const label = input.parentNode.querySelector('label');
            const isDarkMode = document.body.classList.contains('dark-mode');
            const colorStyle = isDarkMode ? 'color: var(--color-dark-text);' : '';
            label.setAttribute('style', `transform: translate(15px, -30px); ${colorStyle}`);
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentNode.querySelector('label').setAttribute('style', 'transform: translate(15px, 8px);');
            }
        });
    });
}