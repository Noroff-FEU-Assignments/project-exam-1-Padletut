import { renderHeader } from "./header/renderHeader.js";    // Import the renderHeader function
import { toggleTheme } from "./themeToggler.js";  // Import the themeToggler function
import { toggleMobileMenu } from "./toggleMobileMenu.js";  // Import the toggleMobileMenu function
import { searchFunction } from "./search.js";  // Import the searchFunction function

// Call the renderHeader function after the DOM has loaded
document.addEventListener('DOMContentLoaded', renderHeader);

// Toggle mobile menu open and close when clicked on the hamburger icon
document.addEventListener('HeaderContentLoaded', toggleMobileMenu);

// Select the theme toggle slider
document.addEventListener('HeaderContentLoaded', toggleTheme);

// Call the search function
document.addEventListener('HeaderContentLoaded', searchFunction);