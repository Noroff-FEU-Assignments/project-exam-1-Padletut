import * as constants from "./constants.js";
import { renderHeader } from "./header/renderHeader.js";
import { toggleTheme } from "./themeToggler.js";
import { toggleMobileMenu } from "./toggleMobileMenu.js";
import { searchFunction } from "./search.js";
import { renderPosts } from "./renderPosts.js";

// Call the renderHeader function after the DOM has loaded
document.addEventListener('DOMContentLoaded', renderHeader);

// Toggle mobile menu open and close when clicked on the hamburger icon
document.addEventListener('HeaderContentLoaded', toggleMobileMenu);

// Select the theme toggle slider
document.addEventListener('HeaderContentLoaded', toggleTheme);

// Call the search function
document.addEventListener('HeaderContentLoaded', searchFunction);

// Fetch WP posts
renderPosts(constants.postsListContainer, constants.loaderContainer);