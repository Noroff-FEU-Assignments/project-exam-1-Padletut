export function dotsEventListener(carouseldot, latestPosts, post, carousel) {
    carouseldot.addEventListener('click', () => {
        const index = latestPosts.indexOf(post);
        const item = carousel.querySelector(`.carousel-item[data-index="${index}"]`);
        const newPosition = item.offsetLeft;
        carousel.scrollTo({
            left: newPosition,
            behavior: 'smooth'
        });
    });
}