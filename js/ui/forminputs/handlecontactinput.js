import { verifyFormInput } from './verifyforminput.js';
/* function to handle contact form input */

export const handleContactInput = (eventOrInput) => {
    const input = eventOrInput.target || eventOrInput;
    let errorMessage;
    switch (input.id) {
        case 'name':
            errorMessage = 'Please enter your name';
            break;
        case 'email':
            errorMessage = 'Please enter your email';
            break;
        case 'subject':
            errorMessage = 'Please enter a subject';
            break;
        case 'message':
            errorMessage = 'Please enter a message';
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