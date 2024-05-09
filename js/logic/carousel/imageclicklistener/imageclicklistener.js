export function imageClickListener(carousel, image, postId) {
    image.addEventListener('click', () => {
        let isDragging = carousel.classList.contains('dragging');
        if (!isDragging) {
            window.location.href = `blog.html?id=${postId}`;
        }
    });

    // Listen for Enter key press on the image
    image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            window.location.href = `blog.html?id=${postId}`;
        }
    });
}