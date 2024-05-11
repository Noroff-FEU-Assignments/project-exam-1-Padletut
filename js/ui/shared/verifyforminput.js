// Function to verify the input fields of the form and display error messages

import { validateValidEmail } from "../shared/validatevalidemail.js";

const submitButton = document.querySelector('#submit-button');
const submitMessage = document.createElement('small');
submitMessage.classList.add('submit-error-message');
if (submitButton) {
    submitButton.style.cursor = 'not-allowed';
    submitButton.disabled = true;
}

// when hovering the submitButton Display message to the user that the submit button is disabled and need to fill in the form input fields
if (submitButton) {
    submitButton.addEventListener('mouseover', () => {
        if (submitButton.disabled) {
            submitMessage.textContent = 'To proceed, please complete all required fields in the form.';
            submitButton.after(submitMessage);
        }
    });
    // remove the message when the user moves the mouse away from the submit button
    submitButton.addEventListener('mouseout', () => {
        setTimeout(() => {
            submitMessage.remove();
        }, 1000);
    });
}

export function verifyFormInput(input, errorMessage) {
    if (input.id === 'searchInput') return;
    /* remove any existing error message <small> element */
    const errorMessageContainer = input.parentNode.querySelector('.form-error-message');
    if (errorMessageContainer) errorMessageContainer.remove();

    if (input.type === 'submit') return;
    //Clear whitespace from input
    input.addEventListener('blur', () => {
        input.value = input.value.trim();
    });
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

    if (errorMessages.length === 0 && reEnableTime && Date.now() > reEnableTime || errorMessages.length === 0 && !reEnableTime) {
        submitButton.style.cursor = 'pointer';
        submitButton.disabled = false;
        return false;
    } else {
        submitButton.style.cursor = 'not-allowed';
        submitButton.disabled = true;
        submitButton.tabindex = 0;
        return true;
    }
}