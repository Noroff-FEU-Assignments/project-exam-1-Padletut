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
            } else {
                errorMessage = 'Please enter your name';
            }
            break;
        case 'email':
            if (!validateValidEmail(input.value)) {
                errorMessage = 'Please enter a valid email address';
            } else {
                errorMessage = 'Please enter your email';
            }
            break;
        case 'subject':
            if (input.value.length !== 0 && input.value.length < 15) {
                errorMessage = 'Subject must be at least 16 characters long';
            } else {
                errorMessage = 'Please enter a subject';
            }
            break;
        case 'message':
            if (input.value.length !== 0 && input.value.length < 26) {
                errorMessage = 'Message must be at least 26 characters long';
            } else {
                errorMessage = 'Please enter a message';
            }
            break;
        default:
            errorMessage = 'Please fill out this field';
    }
    verifyFormInput(input, errorMessage);

    // Remove 'input' event listener if there's no error
    if (!input.parentNode.querySelector('.form-error-message')) {
        input.removeEventListener('input', handleContactInput);
    }
};