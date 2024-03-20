import * as constant from '../constants/constants.js';

/* Function to fetch all posts in every worpdress pages */
export async function fetchAllPosts() {
    let page = 1;
    let dataLength;
    const allPosts = [];

    // Fetch all posts from wordpress there are 10 posts per page, need to loop through all pages
    do {
        const response = await fetch(`${constant.url}/posts?_embed&status=publish&page=${page}`);
        const data = await response.json();
        dataLength = data.length;
        allPosts.push(...data);
        page++;
    } while (dataLength >= 10);

    return allPosts;
}