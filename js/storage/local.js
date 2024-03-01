// Function to save to local storage
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Function to load from local storage
export function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Function to remove from local storage
export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}