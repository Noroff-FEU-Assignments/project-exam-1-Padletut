import { fetchAllPosts } from '../../logic/api/fetchallposts.js';

export async function searchFilter(searchInput) {
    let searchValues;
    const trimmedInput = searchInput.value.toLowerCase().trim();

    // Check if the search query is enclosed in quotes
    if (trimmedInput.startsWith('"') && trimmedInput.endsWith('"')) {

        searchValues = [trimmedInput.slice(1, -1)];
    } else {
        // Split the query into individual words
        searchValues = trimmedInput.split(' ');
    }

    const searchResults = [];
    if (searchValues.length < 1) return;
    const allPosts = await fetchAllPosts();

    allPosts.forEach(post => {
        const postTitle = post.title.rendered.toLowerCase();
        const postContent = post.content.rendered.toLowerCase();
        if (searchValues.some(value => postTitle.includes(value) || postContent.includes(value))) {
            searchResults.push(post);
        }
    });

    return searchResults;
}