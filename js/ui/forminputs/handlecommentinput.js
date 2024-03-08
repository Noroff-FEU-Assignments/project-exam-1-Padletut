import { verifyFormInput } from './verifyforminput.js';

// Function to verify the input fields of the form, and to display error messages in <small> if necessary
export const handleCommentInput = (eventOrInput) => {
    const input = eventOrInput.target || eventOrInput;
    let errorMessage;
    switch (input.id) {
        case 'author':
            errorMessage = 'Please enter your name';
            break;
        case 'email':
            errorMessage = 'Please enter your email';
            break;
        case 'comment':
            errorMessage = 'Please enter a comment';
            break;
        default:
            errorMessage = 'Please fill out this field';
    }
    verifyFormInput(input, errorMessage);

    // Remove 'input' event listener if there's no error
    if (!input.parentNode.querySelector('.form-error-message')) {
        input.removeEventListener('input', handleCommentInput);
    }
};