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
            return response.status;
        }
    } catch (error) {
        console.error('Error:', error);

        // Remove error message after 30 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 30000);

        return error.status;
    }
}