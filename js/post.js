import * as constant from './constants.js';

// Function to let the user add a new comment need to add basic authorization
export async function postComment(id, author, email, content) {
    const username = 'exam';
    const password = 'jaNe d3U9 yrZI AYWw fAFv l1Pj';
    const base64Credentials = btoa(`${username}:${password}`);
    let errorMessage = document.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
    }

    try {
        const response = await fetch(`${constant.url}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64Credentials}`
            },
            body: JSON.stringify({
                post: id,
                author_name: author,
                author_email: email,
                content: content,
                status: 'approved'
            }),
        });

        if (response.status === 409) {
            errorMessage.innerHTML = 'Duplicate comment. Please avoid submitting duplicate messages.';
            constant.commentForm.appendChild(errorMessage);

            // Remove error message after 30 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 30000);
            return response.status;
        }

        if (response.ok) {
            let addCommentSuccess = document.querySelector('.add-comment-success');
            if (!addCommentSuccess) {
                addCommentSuccess = document.createElement('p');
                addCommentSuccess.classList.add('add-comment-success');
                addCommentSuccess.innerHTML = 'Comment added successfully!';
                constant.commentForm.appendChild(addCommentSuccess);

                // Clear all input fields and reset border color
                constant.commentForm.reset();
                const inputs = constant.commentForm.querySelectorAll('input, textarea');
                for (const input of inputs) {
                    input.style.border = '';
                }

                // Remove success message after 30 seconds
                setTimeout(() => {
                    console.log('Removing success message');
                    addCommentSuccess.remove();
                }, 30000);

                return response.status;
            }
        }
        if (!response.ok && response.status !== 409) {
            errorMessage.innerHTML = `Error adding comment. Please try again later. Status: ${response.status}`;
            constant.commentForm.appendChild(errorMessage);

            // Remove error message after 30 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 30000);

            return response.status;
        }


    } catch (error) {
        errorMessage.innerHTML = `Error adding comment. Please try again later. Status: ${error.status}`;
        constant.commentForm.appendChild(errorMessage);
        console.error('Error:', error);

        // Remove error message after 30 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 30000);

        return error.status;
    }
}