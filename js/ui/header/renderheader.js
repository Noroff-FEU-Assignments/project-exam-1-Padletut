// Function to render the header inside <header> tag

export function renderHeader(activePage) {
    const header = document.querySelector('header');
    header.innerHTML = `<div id="headerBar">
    <a href="index.html" id="header-link"><h1>SuperCar<span>Blog</span></h1></a>
    <nav>
        <ul>
            <li><i class="fas fa-times close-menu"></i></li>
            <li${activePage === 'Home' ? ' class="active"' : ''}><a href="index.html">Home</a></li>
            <li${activePage === 'Blogs' ? ' class="active"' : ''}><a href="blogs.html">Blogs</a></li>
            <li${activePage === 'Contact' ? ' class="active"' : ''}><a href="contact.html">Contact</a></li>
            <li${activePage === 'About' ? ' class="active"' : ''}><a href="about.html">About</a></li>
        </ul>
    </nav>
    <div class="search">
        <label for="searchInput" class="search-label">Search</label>
        <input id="searchInput" type="text" placeholder="Search..." aria-label="Search input">
        <small id="searchSuggestions"></small>
        <button id="searchButton" type="submit" aria-label="Submit search"><i class="fas fa-search"></i></button>
    </div>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
    <label class="toggleswitch">
                <input type="checkbox">
                <span class="fas fa-sun slider round"></span>
    </label>
    `;
    document.dispatchEvent(new Event('HeaderContentLoaded'));
}