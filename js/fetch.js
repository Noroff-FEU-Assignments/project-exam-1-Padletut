import * as constant from './constants.js';

// Function to authenticate WP REST API
async function authenticate() {
    const username = 'exam';
    const password = 'jaNe d3U9 yrZI AYWw fAFv l1Pj';
    try {
        const response = await fetch(`${constant.url}/users/me`, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            },
        });
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error('Error:', error);
    }
}

authenticate();

// Function to fetch posts try catch
async function fetchPosts() {
    try {
        const response = await fetch(`${constant.url}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to fetch wp users
async function fetchUsers() {
    try {
        const response = await fetch(`${constant.url}/users`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

//fetchUsers();


// Function to POST a new post, autoriazation by Application Passwords
async function createPost(title, content, status = 'publish') {
    const username = 'exam';
    const password = 'jaNe d3U9 yrZI AYWw fAFv l1Pj';
    const base64Credentials = btoa(`${username}:${password}`);


    try {
        const response = await fetch(constant.url + "/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Use 'Authorization' header for Basic Auth or 'Bearer' token for OAuth/JWT
                'Authorization': `Basic ${base64Credentials}`,
            },
            body: JSON.stringify({
                title: title,
                content: content,
                status: status, // 'publish', 'draft', etc.
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const post = await response.json();
        console.log('Post created successfully:', post);
        return post;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

//createPost('This is my post!', 'This is the post content.').then(post => console.log(post)).catch(error => console.error(error));