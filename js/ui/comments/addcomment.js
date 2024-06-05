import * as constants from '../../constants/constants.js';
import { renderComments } from './rendercomments.js';
import { loadFromLocalStorage, saveToLocalStorage } from '../../storage/local.js';
import { postComment } from '../../logic/api/postcomment.js';
import { handleCommentInput } from './handlecommentinput.js';

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
                if (document.querySelector('#submit-button').disabled || inputs.length < 1) {
                    isValid = false;
                    break;
                }
            }

            const id = new URLSearchParams(window.location.search).get('id');
            const author = document.querySelector('#author').value;
            const email = document.querySelector('#email').value;
            const content = document.querySelector('#comment').value;
            const commentForm = document.querySelector('.comment-form');

            if (isValid) {

                submitButton.setAttribute('style', 'cursor: not-allowed;');
                submitButton.disabled = true;

                const status = await postComment(id, author, email, content);
                commentForm.reset();

                if (status === 200) {
                    // Disable the submit button for 10 seconds to avoid spam
                    const submitButton = document.querySelector('#submit-button');
                    submitButton.disabled = true;
                    submitButton.setAttribute('style', 'cursor: not-allowed;');
                    const time = Date.now() + 10000;
                    saveToLocalStorage('submitButtonDisabled', time);

                    // Check every second if the button should be re-enabled
                    const intervalId = setInterval(() => {
                        const reEnableTime = loadFromLocalStorage('submitButtonDisabled');
                        if (Date.now() > reEnableTime) {
                            submitButton.disabled = false;
                            clearInterval(intervalId);
                        }
                    }, 1000);

                    renderComments(id);
                }
            }
        });

        // Check if the submit button should be disabled on page load
        const reEnableTime = loadFromLocalStorage('submitButtonDisabled');
        if (reEnableTime && Date.now() < reEnableTime) {
            const submitButton = document.querySelector('#submit-button');
            submitButton.disabled = true;
            submitButton.setAttribute('style', 'cursor: not-allowed;');
            submitButton.tabIndex = 0;

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

    // Verify all input fields when typing keyup
    inputs.forEach(input => {
        input.addEventListener('keyup', () => handleCommentInput(input));
    });

    // Avoid spam click or spam keypress on the submit button

    const submitButton = document.querySelector('#submit-button');

    submitButton.removeEventListener('click', () => {
        submitButton.disabled = true;
        submitButton.setAttribute('style', 'cursor: not-allowed;');
    });

    submitButton.removeEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            submitButton.disabled = true;
            submitButton.blur();
            submitButton.setAttribute('style', 'cursor: not-allowed;');
        }
    });
}