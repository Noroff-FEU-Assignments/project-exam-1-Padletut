import * as constant from '../../constants/constants.js';

let cachedPosts = null; // Cache for posts

/* Function to fetch all posts in every worpdress pages */
export async function fetchAllPosts() {
    // If posts are in cache, return them
    if (cachedPosts !== null) {
        return cachedPosts;
    }

    let page = 1;
    let dataLength;
    const allPosts = [];

    // Fetch all posts from wordpress there are 10 posts per page, need to loop through all pages
    try {
        do {
            const response = await fetch(`${constant.url}/posts?_embed&status=publish&page=${page}`);
            const data = await response.json();
            dataLength = data.length;
            allPosts.push(...data);
            page++;
        } while (dataLength >= 10);

        // Store posts in cache
        cachedPosts = allPosts;
    } catch (error) {
        console.error('Error:', error);
        constant.main.innerHTML = '<h2>Something went wrong, please try again later</h2>';
    }

    return allPosts;
}