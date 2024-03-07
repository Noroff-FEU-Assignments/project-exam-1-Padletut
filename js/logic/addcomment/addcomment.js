import * as constants from '../../constants/constants.js';
import { renderComments } from '../../ui/comments/rendercomments.js';
import { loadFromLocalStorage, saveToLocalStorage } from '../../storage/local.js';
import { postComment } from '../posts/post.js';
import { verifyFormInput } from '../verifyforminputs/verifyforminput.js';

// Function to add a new comment to the current post
export function addNewComment() {
    if (constants.commentForm) {

        constants.commentForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const errorMessage = document.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }

            const successMessage = document.querySelector('.add-comment-success');
            if (successMessage) {
                successMessage.remove();
            }

            // Validate all input fields
            let isValid = true;
            for (const input of inputs) {
                handleInput(input);
                if (input.parentNode.querySelector('.form-error-message')) {
                    isValid = false;
                    break;
                }
            }

            const id = new URLSearchParams(window.location.search).get('id');
            const author = document.querySelector('#author').value;
            const email = document.querySelector('#email').value;
            const content = document.querySelector('#comment').value;
            if (isValid) {
                const status = await postComment(id, author, email, content);


                if (status === 201) {
                    renderComments(id, true);

                    // Disable the submit button for 60 seconds to avoid spam
                    const submitButton = document.querySelector('#submit-button');
                    submitButton.disabled = true;
                    submitButton.setAttribute('style', 'cursor: not-allowed;');
                    const time = Date.now() + 60000;
                    saveToLocalStorage('submitButtonDisabled', time);

                    // Check every second if the button should be re-enabled
                    const intervalId = setInterval(() => {
                        const reEnableTime = loadFromLocalStorage('submitButtonDisabled');
                        if (Date.now() > reEnableTime) {
                            submitButton.disabled = false;
                            clearInterval(intervalId);
                        }
                    }, 1000);
                }
            }
        });

        // Check if the submit button should be disabled on page load
        const reEnableTime = loadFromLocalStorage('submitButtonDisabled');
        if (reEnableTime && Date.now() < reEnableTime) {
            const submitButton = document.querySelector('#submit-button');
            submitButton.disabled = true;
            submitButton.setAttribute('style', 'cursor: not-allowed;');

            // Check every second if the button should be re-enabled
            const intervalId = setInterval(() => {
                if (Date.now() > reEnableTime) {
                    submitButton.disabled = false;
                    submitButton.setAttribute('style', 'cursor: pointer;');
                    clearInterval(intervalId);
                }
            }, 1000);
        }
    }

    // Function to verify the input fields of the form, and to display error messages in <small> if necessary
    const handleInput = (eventOrInput) => {
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
            input.removeEventListener('input', handleInput);
        }
    };

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => handleInput(input));

        // Add 'input' event listener if there's an error
        if (input.parentNode.querySelector('.form-error-message')) {
            input.addEventListener('input', () => handleInput(input));
        }
    });
}