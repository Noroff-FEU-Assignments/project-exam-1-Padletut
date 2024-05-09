import * as constants from "../../../constants/constants.js";
import { updateActiveDot } from "../../../logic/carousel/updateactivedot/updateactivedot.js";

// Function to control the carousel

export function handleCarousel(carousel, isAutoPlay = false) {

    const firstCardWidth = carousel.querySelector(".carousel-item").offsetWidth;
    const arrowBtns = document.querySelectorAll(".arrow-button");
    const carouselChildrens = [...carousel.children];

    let isDragging = false, startX, startScrollLeft, timeoutId;

    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards at the beginning of the carousel for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        const clone = card.cloneNode(true); // Deep clone the element
        /* add image click listener to the cloned image */
        clone.querySelector('img').addEventListener('click', () => {
            let isDragging = carousel.classList.contains('dragging');
            if (!isDragging) {
                window.location.href = `blog.html?id=${card.dataset.id}`;
            }
        });

        // add image click listener to the cloned image for Enter key press
        clone.querySelector('img').addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                window.location.href = `blog.html?id=${card.dataset.id}`;
            }
        });

        carousel.prepend(clone); // Insert the clone at the beginning of the carousel
    });

    // Insert copies of the first few cards at the end of the carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        const clone = card.cloneNode(true); // Deep clone the element
        /* add image click listener to the cloned image */
        clone.querySelector('img').addEventListener('click', () => {
            let isDragging = carousel.classList.contains('dragging');
            if (!isDragging) {
                window.location.href = `blog.html?id=${clone.dataset.id}`;
            }
        });
        carousel.appendChild(clone); // Insert the clone at the end of the carousel
    });




    // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the carousel left and right

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left-arrow" ? -firstCardWidth : firstCardWidth;
        });
    });



    const dragStart = (e) => {
        isDragging = true;
        setTimeout(() => {
            carousel.classList.add("dragging");
        }, 100);
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        setTimeout(() => {
            carousel.classList.remove("dragging");
        }, 100);
    }

    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }


        // Get all carousel items
        const items = carousel.querySelectorAll('.carousel-item');

        // Find the carousel item that's closest to the current scroll position
        let activeIndex = 0;
        let minDistance = Infinity;
        items.forEach((item, index) => {
            const itemStart = item.offsetLeft;
            const itemEnd = itemStart + item.offsetWidth;
            const distance = Math.min(Math.abs(carousel.scrollLeft - itemStart), Math.abs(carousel.scrollLeft - itemEnd));
            if (distance < minDistance) {
                activeIndex = index;
                minDistance = distance;
            }
        });

        let adjustedIndex = activeIndex - cardPerView;

        if (adjustedIndex < 0) {
            adjustedIndex = carouselChildrens.length + adjustedIndex;
        } else if (adjustedIndex >= carouselChildrens.length) {
            adjustedIndex = adjustedIndex - carouselChildrens.length;
        }



        // Update the active dot, but only if the adjusted index is within the range of original items
        if (adjustedIndex >= 0 && adjustedIndex < carouselChildrens.length) {
            updateActiveDot(carousel, adjustedIndex);
        }

        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if (!constants.carouselWrapper.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    constants.carouselWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    constants.carouselWrapper.addEventListener("mouseleave", autoPlay);
}