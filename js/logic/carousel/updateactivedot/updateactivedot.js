export function updateActiveDot(carousel, index) {
    const dots = document.querySelectorAll('.carousel-dot');
    // Convert index to number
    const indexNumber = Number(index);
    dots.forEach(dot => dot.classList.remove('active'));
    if (indexNumber >= 0 && indexNumber < dots.length) {
        dots[indexNumber].classList.add('active');
    }
}