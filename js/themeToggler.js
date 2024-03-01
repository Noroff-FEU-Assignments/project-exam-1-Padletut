import { loadFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "./storage/local.js";

// Export function to toggle between light and dark theme

export function toggleTheme() {
    const themeToggleButton = document.querySelector('.slider');

    // Add event listener to the theme toggle button
    document.addEventListener('DOMContentLoaded', () => {
        themeToggleButton.addEventListener('click', () => {
            const theme = document.body;
            theme.classList.toggle('dark-mode');
            if (theme.classList.contains('dark-mode')) {
                removeFromLocalStorage('theme');
                saveToLocalStorage('theme', theme.classList);
            } else {
                removeFromLocalStorage('theme');
            }
        });
    });

    // Load the theme from local storage and set <label class="toggleswitch"> <input type="checkbox"><span class="fas fa-sun slider round"></span></label> input to checked if dark mode is enabled
    const theme = loadFromLocalStorage('theme');
    if (theme) {
        document.body.classList = theme[0];
        if (theme[0] === 'dark-mode') {
            const inputToggle = document.querySelector('.toggleswitch input');
            inputToggle.checked = true;
        }
    }
}