import * as constants from './constants.js';
import { renderComments } from './renderComments.js';
import { loadFromLocalStorage, saveToLocalStorage } from './storage/local.js';
import { addComment } from './fetch.js';

// Function to add a new comment to the current post
export function addNewComment() {
    if (constants.commentForm) {
        constants.commentForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const id = new URLSearchParams(window.location.search).get('id');
            const author = document.querySelector('#author').value;
            const email = document.querySelector('#email').value;
            const content = document.querySelector('#comment').value;
            await addComment(id, author, email, content);
            renderComments(id, true);

            // Disable the submit button for 60 seconds to avoid spam
            const submitButton = document.querySelector('#submit-button');
            submitButton.disabled = true;
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
        });

        // Check if the submit button should be disabled on page load
        const reEnableTime = loadFromLocalStorage('submitButtonDisabled');
        if (reEnableTime && Date.now() < reEnableTime) {
            const submitButton = document.querySelector('#submit-button');
            submitButton.disabled = true;

            // Check every second if the button should be re-enabled
            const intervalId = setInterval(() => {
                if (Date.now() > reEnableTime) {
                    submitButton.disabled = false;
                    clearInterval(intervalId);
                }
            }, 1000);
        }
    }
}