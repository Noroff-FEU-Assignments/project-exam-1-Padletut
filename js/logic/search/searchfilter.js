import { fetchAllPosts } from '../api/fetchallposts.js';

/* Function to filter the search results */

export async function searchFilter(searchInput) {
    const searchValue = searchInput.value.toLowerCase().trim();
    const searchResults = [];
    if (searchValue.length < 1) return;
    const allPosts = await fetchAllPosts();

    allPosts.forEach(post => {
        if (post.title.rendered.toLowerCase().includes(searchValue) || post.content.rendered.toLowerCase().includes(searchValue)) {
            searchResults.push(post);
        }
    });

    return searchResults;
}