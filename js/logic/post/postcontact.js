import * as constant from '../../constants/constants.js';

/* async function to post message to wp for contact form, use basic auth*/

export async function postContactMessage(name, email, subject, message) {
    let errorMessage = document.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
    }

    try {
        const response = await fetch(`${constant.url}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            }),
        });

        if (response.ok) {
            let contactMessageSuccess = document.querySelector('.contact-message-success');
            if (!contactMessageSuccess) {
                contactMessageSuccess = document.createElement('p');
                contactMessageSuccess.classList.add('contact-message-success');
                contactMessageSuccess.innerHTML = 'Thank you for your message. It has been sent.';
                constant.contactForm.appendChild(contactMessageSuccess);

                // Clear all input fields and reset border color
                constant.contactForm.reset();
                const inputs = constant.contactForm.querySelectorAll('input, textarea');
                for (const input of inputs) {
                    input.style.border = '';
                }

                // Remove success message after 30 seconds
                setTimeout(() => {
                    contactMessageSuccess.remove();
                }, 30000);

                return response.status;
            }
        }
    } catch (error) {
        errorMessage.innerHTML = `There was an error trying to send your message. Please try again later. Status: ${error.status}`;
        constant.contactForm.appendChild(errorMessage);
        console.error('Error:', error);

        // Remove error message after 30 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 30000);

        return error.status;
    }
}