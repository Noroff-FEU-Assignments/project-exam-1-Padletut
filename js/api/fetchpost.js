import * as constant from '../constants/constants.js';

// Function to fetch a single post
export async function fetchPost(id) {
    try {
        const response = await fetch(`${constant.url}/posts/${id}?_embed`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Error:', error);
        constant.main.innerHTML = '<h2>Something went wrong, please try again later</h2>';
    }
}