// Function to verify the input fields of the form and display error messages

export function verifyFormInput(input, errorMessage) {
    /* remove any existing error message <small> element */
    const errorMessageContainer = input.parentNode.querySelector('.form-error-message');
    if (errorMessageContainer) errorMessageContainer.remove();

    if (input.type === 'submit') return;
    if (input.value === '') {
        const small = document.createElement('small');
        small.classList.add('form-error-message');
        small.textContent = errorMessage;
        input.after(small);
        input.style.border = 'rgba(220, 20, 60, 1) 2px solid';
    } else if (input.type === 'email' && !validateValidEmail(input.value)) {
        const small = document.createElement('small');
        small.classList.add('form-error-message');
        small.textContent = 'Please enter a valid email address';
        input.after(small);
        input.style.border = 'rgba(220, 20, 60, 1) 2px solid';
    } else {
        input.style.border = 'rgba(57, 255, 20, 1) 2px solid';
    }
}

function validateValidEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
