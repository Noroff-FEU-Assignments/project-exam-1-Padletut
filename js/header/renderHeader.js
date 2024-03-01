// Function to render the header inside <header> tag

export function renderHeader() {
    const header = document.querySelector('header');
    header.innerHTML = `<div id="headerBar">
    <a href="index.html"><h1>SuperCar<span>Blog</span></h1></a>
    <nav>
        <ul>
            <li><i class="fas fa-times close-menu"></i></li>
            <li><a href="index.html">Home</a></li>
            <li><a href="blogs.html">Blogs</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="about.html">About</a></li>
        </ul>
    </nav>
    <div class="search">
        <input type="text" placeholder="Search...">
        <button type="submit"><i class="fas fa-search"></i></button>
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