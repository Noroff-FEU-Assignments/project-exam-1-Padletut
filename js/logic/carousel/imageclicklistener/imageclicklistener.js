export function imageClickListener(carousel, image, postId) {
    image.addEventListener('click', () => {
        let isDragging = carousel.classList.contains('dragging');
        if (!isDragging) {
            window.location.href = `blog.html?id=${postId}`;
        }
    });
}