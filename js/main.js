import * as constants from "./constants/constants.js";
import { renderHeader } from "./ui/header/renderheader.js";
import { toggleTheme } from "./logic/themetoggler/themetoggler.js";
import { toggleMobileMenu } from "./logic/togglemobilemenu/togglemobilemenu.js";
import { searchFunction } from "./ui/header/searchbar.js";
import { renderPosts } from "./ui/posts/renderposts.js";
import { renderPost } from "./ui/post/renderpost.js";
import { addNewComment } from "./logic/addcomment/addcomment.js";
import { renderCarousel } from "./ui/carousel/rendercarousel.js";

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
if (constants.carouselWrapper) renderCarousel(constants.carouselWrapper, constants.loaderContainer);

// Fetch a single post get id from the URL
if (constants.post) {
    const id = parseInt(window.location.search.substring(4));
    renderPost(id);
}

// Render add comment form
if (constants.commentForm) {
    addNewComment();
}