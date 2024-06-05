import { searchFilter } from './searchfilter.js';
import { renderSearchResults } from '../../ui/search/rendersearchresults.js';
import { renderSearchSuggestions } from '../../ui/search/rendersearchsuggestions.js';
import { debounce } from '../debounce/debounce.js';

/* Function to listen for search input and display search results */

export function searchListener() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchSuggestions = document.getElementById('searchSuggestions');

    const handleSearch = debounce(async () => {
        searchInput.value = searchInput.value.trim();
        if (searchInput.value.length < 1) return;
        const searchResults = await searchFilter(searchInput);
        renderSearchResults(searchResults);
    }, 300);

    const handleInput = debounce(async () => {
        if (searchInput.value.length < 1) {
            searchSuggestions.style.display = 'none'; // Hide suggestions when input is empty
            return;
        }
        const searchResults = await searchFilter(searchInput);
        renderSearchSuggestions(searchResults);
    }, 300);

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