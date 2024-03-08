import { handleContactInput } from '../forminputs/handlecontactinput.js';
import { floatingLabels } from '../forminputs/floatinglabels.js';
import { postContactMessage } from '../../logic/post/postcontact.js';

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
            if (status === 201) {
                const successMessage = document.createElement('p');
                successMessage.classList.add('add-comment-success');
                successMessage.textContent = 'Message sent successfully';
                form.after(successMessage);
                form.reset();
            }
        }
    });

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => handleContactInput(input));

        // Add 'input' event listener if there's an error
        if (input.parentNode.querySelector('.form-error-message')) {
            input.addEventListener('input', () => handleContactInput(input));
        }
    });

    // Input floating label effect
    floatingLabels(inputs);
}