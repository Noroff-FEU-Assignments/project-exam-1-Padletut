import * as constant from '../constants/constants.js';

// Function to fetch a single post
export async function fetchPost(id) {
    try {
        const response = await fetch(`${constant.url}/posts/${id}?_embed`);
        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Error:', error);
    }
}