import * as constants from '../../constants/constants.js';
import { renderComments } from '../comments/rendercomments.js';
import { loadFromLocalStorage, saveToLocalStorage } from '../../storage/local.js';
import { postComment } from '../../logic/api/postcomment.js';
import { handleCommentInput } from '../comments/handlecommentinput.js';
import { floatingLabels } from '../shared/floatinglabels.js';

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
                handleCommentInput(input);
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

                if (status === 200) {
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

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => handleCommentInput(input));

        // Add 'input' event listener if there's an error
        if (input.parentNode.querySelector('.form-error-message')) {
            input.addEventListener('input', () => handleCommentInput(input));
        }
    });

    // Input floating label effect
    floatingLabels(inputs);
}