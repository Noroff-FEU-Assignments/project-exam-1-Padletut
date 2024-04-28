import * as constants from '../../constants/constants.js';
import { renderPosts } from '../posts/renderposts.js';

/* Render search results by using renderPosts function */

export function renderSearchResults(searchResults) {
    const main = document.querySelector('main');
    main.innerHTML = '<h2>Search results</h2><section class="posts-list"></section>';

    const postsList = document.querySelector('.posts-list');
    if (searchResults) {
        renderPosts(postsList, constants.loaderContainer, undefined, searchResults);
    }
}