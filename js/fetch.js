import * as constant from './constants.js';

// Function to authenticate WP REST API
/* async function authenticate() {
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

authenticate(); */

// Function to fetch posts try catch
export async function fetchPosts(page = 1) {
    try {
        const response = await fetch(`${constant.url}/posts?_embed&status=publish&page=${page}`);
        const data = await response.json();
        console.log(data);
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

// Function to let the user add a new comment need to add basic authorization
export async function addComment(id, author, email, content) {
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
        }

        if (response.ok) {
            let addCommentSuccess = document.querySelector('.add-comment-success');
            if (!addCommentSuccess) {
                addCommentSuccess = document.createElement('p');
                addCommentSuccess.classList.add('add-comment-success');
                addCommentSuccess.innerHTML = 'Comment added successfully!';
                constant.commentForm.appendChild(addCommentSuccess);
            }

            // Remove success message after 30 seconds
            setTimeout(() => {
                addCommentSuccess.remove();
            }, 30000);
        }
        if (!response.ok) {
            errorMessage.innerHTML = `Error adding comment. Please try again later. Status: ${response.status}`;
            constant.commentForm.appendChild(errorMessage);

            // Remove error message after 30 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 30000);
        }

        // Clear all input fields
        constant.commentForm.reset();


    } catch (error) {
        errorMessage.innerHTML = `Error adding comment. Please try again later. Status: ${error.status}`;
        constant.commentForm.appendChild(errorMessage);
        console.error('Error:', error);

        // Remove error message after 30 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 30000);
    }
}

/* // Function to POST a new post, autoriazation by Application Passwords
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
} */


//createPost('This is my post!', 'This is the post content.').then(post => console.log(post)).catch(error => console.error(error));