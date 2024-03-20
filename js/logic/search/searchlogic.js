import * as constants from '../../constants/constants.js';
import { renderPosts } from '../../ui/posts/renderposts.js';
import { fetchAllPosts } from '../../api/fetchallposts.js';

/* Function to filter the search results */

async function searchFilter(searchInput) {
    const searchValue = searchInput.value.toLowerCase();
    const searchResults = [];
    const allPosts = await fetchAllPosts();

    allPosts.forEach(post => {
        if (post.title.rendered.toLowerCase().includes(searchValue) || post.content.rendered.toLowerCase().includes(searchValue)) {
            searchResults.push(post);
        }
    });
    return searchResults;
}

/* Function to listen for search input and display search results */

export function searchListener() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchSuggestions = document.getElementById('searchSuggestions');

    const handleSearch = async () => {
        const searchResults = await searchFilter(searchInput);
        renderSearchResults(searchResults);
    };

    const handleInput = async () => {
        const searchResults = await searchFilter(searchInput);
        if (searchResults.length > 0) {
            renderSearchSuggestions(searchResults);
        }
    };

    searchInput.addEventListener('input', handleInput);
    searchInput.addEventListener('focus', handleInput);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
            // Remove focus from the input after the user presses enter
            searchInput.blur();
            searchSuggestions.style.display = 'none';
        }
    });

    searchButton.addEventListener('click', () => {
        searchInput.blur();
        searchSuggestions.style.display = 'none';
        handleSearch();
    });
}

/* Render search results by using renderPosts function */

function renderSearchResults(searchResults) {
    const main = document.querySelector('main');
    main.innerHTML = '<h2>Search results</h2><section class="posts-list"></section>';

    const postsList = document.querySelector('.posts-list');
    if (searchResults) {
        renderPosts(postsList, constants.loaderContainer, undefined, searchResults);
    }
}

/* Display some suggestions below the search bar input, add to input if the user clicks on a suggestion */

function renderSearchSuggestions(searchResults) {
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchInput = document.getElementById('searchInput');

    searchSuggestions.innerHTML = '';
    searchResults.forEach(post => {
        const suggestion = document.createElement('p');
        suggestion.innerHTML = post.title.rendered;
        searchSuggestions.appendChild(suggestion);
        suggestion.addEventListener('click', () => {
            document.getElementById('searchInput').value = post.title.rendered;
            searchSuggestions.innerHTML = '';
        });
    });

    if ((searchSuggestions.innerHTML !== '' && searchInput.value !== '' && searchInput === document.activeElement && searchInput.value.length > 2) || (searchInput.value !== '' && searchInput === document.activeElement)) {
        searchSuggestions.style.display = 'block';
    } else {
        searchSuggestions.style.display = 'none';
    }

    // Hide the suggestions when the user clicks outside the input
    document.addEventListener('click', (event) => {
        if (event.target !== searchInput) {
            searchSuggestions.style.display = 'none';
        }
    });
}