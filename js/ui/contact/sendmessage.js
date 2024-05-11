import { handleContactInput } from './handlecontactinput.js';
import { floatingLabels } from '../shared/floatinglabels.js';
import { postContactMessage } from '../../logic/api/postcontact.js';

/* post message to wp for contact form */
export function sendMessage() {

    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', async (event) => {
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
            handleContactInput(input);
            if (input.parentNode.querySelector('.form-error-message')) {
                isValid = false;
                break;
            }
        }

        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const subject = document.querySelector('#subject').value;
        const message = document.querySelector('#message').value;
        if (isValid) {
            const status = await postContactMessage(name, email, subject, message);
            if (status === 200) {
                const successMessage = document.createElement('p');
                successMessage.classList.add('add-comment-success');
                successMessage.textContent = 'Message sent successfully';
                form.after(successMessage);
                form.reset();

                // Disable the submit button for 10 seconds to avoid spam
                const submitButton = document.querySelector('#submit-button');
                submitButton.disabled = true;
                submitButton.setAttribute('style', 'cursor: not-allowed;');
                const time = Date.now() + 10000;
                localStorage.setItem('submitButtonDisabled', time);
            } else {
                const errorMessage = document.createElement('p');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'There was an error trying to send your message. Please try again later.';
                form.after(errorMessage);
                console.error('Error:', status);
            }
        }
    });

    const inputs = document.querySelectorAll('input, textarea');

    // Verify all input fields when typing keyup
    inputs.forEach(input => {
        input.addEventListener('keyup', () => handleContactInput(input));
    });


    // Verify all input fields when submit button is hovered
    const submitButton = document.querySelector('#submit-button');
    submitButton.addEventListener('mouseover', () => {
        inputs.forEach(input => {
            handleContactInput(input);
        });
    });


    // Input floating label effect
    floatingLabels(inputs);


    // Check if the submit button should be disabled on page load
    const reEnableTime = localStorage.getItem('submitButtonDisabled');
    const errorMessages = document.querySelectorAll('.form-error-message');

    if (reEnableTime && Date.now() < reEnableTime && errorMessages.length > 0 || !reEnableTime && errorMessages.length !== 0) {
        const submitButton = document.querySelector('#submit-button');
        submitButton.disabled = true;
        submitButton.style.cursor = 'not-allowed';

        // Check every second if the button should be re-enabled
        const intervalId = setInterval(() => {
            if (Date.now() > reEnableTime) {
                submitButton.disabled = false;
                submitButton.style.cursor = 'pointer';
                clearInterval(intervalId);
            }
        }, 1000);
    }
}