import * as constant from '../constants/constants.js';

// Function to fetch posts try catch
export async function fetchPosts(page = 1) {
    try {
        const response = await fetch(`${constant.url}/posts?_embed&status=publish&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}