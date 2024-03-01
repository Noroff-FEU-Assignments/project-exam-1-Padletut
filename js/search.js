export function searchFunction() {
    const searchButton = document.querySelector('.search button');
    const searchInput = document.querySelector('.search input');
    const headerH1 = document.querySelector('header h1');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        searchInput.setAttribute('style', 'display: block');
        headerH1.setAttribute('style', 'display: none');
        searchButton.setAttribute('style', 'position: absolute; right: 10px; top: 50%; transform: translateY(-50%); z-index: 1000;');
    });

    // Close the search input when the user clicks outside of it or search loose focus
    document.addEventListener('click', (e) => {
        if (e.target !== searchButton && e.target !== searchInput && !searchInput.contains(e.target)) {
            searchInput.setAttribute('style', 'display: none');
            headerH1.setAttribute('style', 'display: block');
        }
    });
}