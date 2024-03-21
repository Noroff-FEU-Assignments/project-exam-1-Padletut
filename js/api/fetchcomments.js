import * as constant from '../constants/constants.js';

// Function to fetch comments for the current post
export async function fetchComments(id) {
    try {
        const response = await fetch(`${constant.url}/comments?post=${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error('Error:', error);
        constant.commentWrapper.innerHTML = 'Sorry, something went wrong loading comments. Please try again later. <div class="comment-loader"></div>';
        setTimeout(() => {
            constant.commentWrapper.innerHTML = 'Sorry, something went wrong loading comments. Please try again later.';
        }, 3000);
    }
}