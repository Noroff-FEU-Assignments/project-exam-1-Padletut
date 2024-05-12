export function removeErrorMessage(input) {
    // Remove error messages after 5 seconds and remove input frame color
    if (document.querySelector('.comments') && input.value.length === 0) {
        setTimeout(() => {
            const errorMessageElement = input.parentNode.querySelector('.form-error-message');
            if (errorMessageElement) {
                errorMessageElement.remove();
                input.style.borderColor = '';
            }
        }, 5000);
    }
}