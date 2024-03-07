import * as constants from "../../constants/constants.js";
import { loadFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "../../storage/local.js";

// Export function to toggle between light and dark theme

export function toggleTheme() {

    // Add event listener to the theme toggle button

    const themeToggleButton = document.querySelector('.slider');
    themeToggleButton.addEventListener('click', () => {
        const theme = document.body;
        theme.classList.toggle('dark-mode');
        if (theme.classList.contains('dark-mode')) {
            removeFromLocalStorage(constants.themeKey);
            saveToLocalStorage(constants.themeKey, theme.classList);
        } else {
            removeFromLocalStorage(constants.themeKey);
        }
    });

    // Load the theme from local storage and set <label class="toggleswitch"> <input type="checkbox"><span class="fas fa-sun slider round"></span></label> input to checked if dark mode is enabled
    const theme = loadFromLocalStorage(constants.themeKey);
    if (theme) {
        document.body.classList = theme[0];
        if (theme[0] === 'dark-mode') {
            const inputToggle = document.querySelector('.toggleswitch input');
            inputToggle.checked = true;
        }
    }
}