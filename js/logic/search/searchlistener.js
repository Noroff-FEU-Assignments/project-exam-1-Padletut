import { searchFilter } from './searchfilter.js';
import { renderSearchResults } from '../../ui/search/rendersearchresults.js';
import { renderSearchSuggestions } from '../../ui/search/rendersearchsuggestions.js';
/* Function to listen for search input and display search results */

export function searchListener() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchSuggestions = document.getElementById('searchSuggestions');

    const handleSearch = async () => {
        searchInput.value = searchInput.value.trim();
        if (searchInput.value.length < 1) return;
        const searchResults = await searchFilter(searchInput);
        renderSearchResults(searchResults);
    };

    const handleInput = async () => {
        //  searchInput.value = searchInput.value.trim();
        if (searchInput.value.length < 1) return;
        const searchResults = await searchFilter(searchInput);
        renderSearchSuggestions(searchResults);
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