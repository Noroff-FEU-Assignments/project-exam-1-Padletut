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