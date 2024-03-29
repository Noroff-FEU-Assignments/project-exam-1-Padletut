import { verifyFormInput } from '../shared/verifyforminput.js';
import { validateValidEmail } from '../shared/validatevalidemail.js';

/* function to handle contact form input */
export const handleContactInput = (eventOrInput) => {
    const input = eventOrInput.target || eventOrInput;
    let errorMessage;
    switch (input.id) {
        case 'name':
            if (input.value.length !== 0 && input.value.length < 6) {
                errorMessage = 'Name must be at least 6 characters long';
            } else if (input.value.length === 0) {
                errorMessage = 'Please enter your name';
                removeErrorMessage(input);
            }
            break;
        case 'email':
            if (input.value.length === 0 || input.addEventListener) {
                errorMessage = 'Please enter your email';
                removeErrorMessage(input);
            } else if (!validateValidEmail(input.value)) {
                errorMessage = 'Please enter a valid email address';
            } else if (input.addEventListener('focus', () => removeErrorMessage(input)));
            break;
        case 'subject':
            if (input.value.length !== 0 && input.value.length < 15) {
                errorMessage = 'Subject must be at least 16 characters long';
            } else if (input.value.length === 0) {
                errorMessage = 'Please enter a subject';
                removeErrorMessage(input);
            } else if (input.addEventListener('focus', () => removeErrorMessage(input)));
            break;
        case 'message':
            if (input.value.length !== 0 && input.value.length < 26) {
                errorMessage = 'Message must be at least 26 characters long';
            } else if (input.value.length === 0) {
                errorMessage = 'Please enter a message';
                removeErrorMessage(input);
            } else if (input.addEventListener('focus', () => removeErrorMessage(input)));
            break;
        default:
            errorMessage = 'Please fill out this field';
            if (input.value.length === 0) {
                removeErrorMessage(input);
            } else if (input.addEventListener('focus', () => removeErrorMessage(input)));
    }
    verifyFormInput(input, errorMessage);

    // Remove 'input' event listener if there's no error
    if (!input.parentNode.querySelector('.form-error-message')) {
        input.removeEventListener('input', handleContactInput);
    }
};

function removeErrorMessage(input) {
    // Remove error messages after 5 seconds and remove input frame color
    console.log(input.value.length);
    setTimeout(() => {
        const errorMessageElement = input.parentNode.querySelector('.form-error-message');
        if (errorMessageElement) {
            errorMessageElement.remove();
            input.style.borderColor = '';
        }
    }, 5000);

    // Remove error message if focus event is triggered
    input.addEventListener('focus', () => {
        const errorMessageElement = input.parentNode.querySelector('.form-error-message');
        if (errorMessageElement) {
            errorMessageElement.remove();
            input.style.borderColor = '';
        }
    });
}