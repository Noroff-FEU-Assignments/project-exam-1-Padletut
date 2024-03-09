import * as constant from '../constants/constants.js';

// Function to fetch comments for the current post
export async function fetchComments(id) {
    try {
        const response = await fetch(`${constant.url}/comments?post=${id}`);
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error('Error:', error);
    }
}