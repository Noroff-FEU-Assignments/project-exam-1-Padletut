/* Display some suggestions below the search bar input, add to input if the user clicks on a suggestion */

export function renderSearchSuggestions(searchResults) {
    const searchSuggestions = document.getElementById('searchSuggestions');
    const searchInput = document.getElementById('searchInput');
    if (searchInput.value.trim() === '') return;

    searchSuggestions.innerHTML = '';
    searchResults.forEach(post => {
        const suggestion = document.createElement('p');
        suggestion.innerHTML = post.title.rendered;
        searchSuggestions.appendChild(suggestion);
        suggestion.addEventListener('click', () => {
            document.getElementById('searchInput').value = `"${post.title.rendered}"`;
            searchSuggestions.innerHTML = '';
            searchInput.focus();
        });
    });

    // Display the suggestions when the user types in the input
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