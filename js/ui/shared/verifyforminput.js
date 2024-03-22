// Function to verify the input fields of the form and display error messages

import { validateValidEmail } from "../shared/validatevalidemail.js";

const submitButton = document.querySelector('#submit-button');
submitButton.style.cursor = 'not-allowed';
submitButton.disabled = true;

export function verifyFormInput(input, errorMessage) {
    if (input.id === 'searchInput') return;
    /* remove any existing error message <small> element */
    const errorMessageContainer = input.parentNode.querySelector('.form-error-message');
    if (errorMessageContainer) errorMessageContainer.remove();

    if (input.type === 'submit') return;
    if (input.value === '' || (input.id === 'name' && input.value.length < 6) || (input.type === 'email' && !validateValidEmail(input.value)) || (input.id === 'subject' && input.value.length < 16) || (input.id === 'message' && input.value.length < 26)) {
        const small = document.createElement('small');
        small.classList.add('form-error-message');
        small.textContent = errorMessage;
        input.after(small);
        input.style.border = 'rgba(220, 20, 60, 1) 2px solid';
    } else {
        input.style.border = 'rgba(57, 255, 20, 1) 2px solid';
    }

    /* enable submit button if all input fields are valid */
    const errorMessages = document.querySelectorAll('.form-error-message');
    const reEnableTime = localStorage.getItem('submitButtonDisabled');
    if (errorMessages.length === 0 && reEnableTime && Date.now() > reEnableTime) {
        submitButton.style.cursor = 'pointer';
        submitButton.disabled = false;
    } else {
        submitButton.style.cursor = 'not-allowed';
        submitButton.disabled = true;
    }

}