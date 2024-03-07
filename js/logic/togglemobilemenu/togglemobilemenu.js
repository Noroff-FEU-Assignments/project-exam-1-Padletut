export function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav');
    const closeMenu = document.querySelector('.close-menu');

    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('open');
    });

    closeMenu.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
    });

    // close the menu when the user clicks outside of it
    document.addEventListener('click', (e) => {
        if (e.target !== hamburger && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });
}