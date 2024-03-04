import * as constants from "./constants.js";
import { renderHeader } from "./header/renderHeader.js";
import { toggleTheme } from "./themeToggler.js";
import { toggleMobileMenu } from "./toggleMobileMenu.js";
import { searchFunction } from "./search.js";
import { renderPosts } from "./renderPosts.js";
import { renderPost } from "./renderPost.js";
import { addNewComment } from "./addComment.js";
import { initCarousel } from "./renderCarousel.js";

// Call the renderHeader function after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    const activePage = document.title.split(" | ")[1];
    renderHeader(activePage);
});


// Toggle mobile menu open and close when clicked on the hamburger icon
document.addEventListener('HeaderContentLoaded', toggleMobileMenu);

// Select the theme toggle slider
document.addEventListener('HeaderContentLoaded', toggleTheme);

// Call the search function
document.addEventListener('HeaderContentLoaded', searchFunction);

// Render posts
if (constants.postsListContainer) renderPosts(constants.postsListContainer, constants.loaderContainer);

// Render the carousel
if (constants.carouselContainer) initCarousel(constants.carouselContainer);

// Fetch a single post get id from the URL
if (constants.post) {
    const id = parseInt(window.location.search.substring(4));
    renderPost(id);
}

// Render add comment form
if (constants.commentForm) {
    addNewComment();
}