import { renderPosts } from './renderposts.js';
// Add more posts when the user click on show more button */

export function showMorePosts() {
    const showMoreButton = document.querySelector('.show-more-button');
    const renderContainer = document.querySelector('.posts-list');
    const loaderContainer = document.querySelector('.loader-container');
    let page = 1;

    showMoreButton.addEventListener('click', () => {
        page++;
        renderPosts(renderContainer, loaderContainer, page);
        showMoreButton.remove(); // Remove the show more button after clicking
    });
}