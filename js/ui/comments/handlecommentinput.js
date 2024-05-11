import { verifyFormInput } from '../shared/verifyforminput.js';
import { validateValidEmail } from '../shared/validatevalidemail.js';

// Function to handle comment form input
export const handleCommentInput = (eventOrInput) => {
    const input = eventOrInput.target || eventOrInput;
    let allInputsVerified = false;
    let errorMessage;

    switch (input.id) {
        case 'author':
            errorMessage = 'Please enter your name';
            removeErrorMessage(input);
            break;
        case 'email':
            errorMessage = 'Please enter your email';
            removeErrorMessage(input);
            if (input.value.length > 0 && !validateValidEmail(input.value)) {
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'comment':
            errorMessage = 'Please enter a comment';
            removeErrorMessage(input);
            break;
        default:
            errorMessage = 'Please fill out this field';
            removeErrorMessage(input);
    }
    allInputsVerified = verifyFormInput(input, errorMessage);

    // Remove 'input' event listener if there's no error
    if (!allInputsVerified) {
        input.removeEventListener('input', handleCommentInput);
    }
};

function removeErrorMessage(input) {
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