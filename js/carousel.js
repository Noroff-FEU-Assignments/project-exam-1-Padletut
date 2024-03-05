import * as constants from './constants.js';
import { fetchPosts } from './fetch.js';

export function renderCarousel(carouselWrapper, loaderContainer) {
    const carousel = document.createElement('ul');
    carousel.classList.add('carousel');
    carouselWrapper.appendChild(carousel);

    const page = 1;

    loaderContainer.style.display = 'none';

    const leftArrow = document.createElement('i');
    leftArrow.classList.add('fas', 'fa-chevron-left', 'arrow-button');
    leftArrow.id = 'left-arrow';
    carouselWrapper.prepend(leftArrow);

    const rightArrow = document.createElement('i');
    rightArrow.classList.add('fas', 'fa-chevron-right', 'arrow-button');
    rightArrow.id = 'right-arrow';
    carouselWrapper.appendChild(rightArrow);

    fetchPosts(page).then(data => {
        const latestPosts = data.slice(0, 4); // Get the 4 latest posts

        latestPosts.forEach(post => {
            const carouselItem = document.createElement('li');
            carouselItem.classList.add('carousel-item');
            carousel.appendChild(carouselItem);

            const title = document.createElement('h3');
            title.innerHTML = post.title.rendered;
            carouselItem.appendChild(title);

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('img');
            carouselItem.appendChild(imageContainer);

            const image = document.createElement('img');
            image.src = post._embedded['wp:featuredmedia'][0].source_url;
            image.alt = post._embedded['wp:featuredmedia'][0].alt_text;
            image.draggable = false;
            imageContainer.appendChild(image);

            const authorDateContainer = document.createElement('div');
            authorDateContainer.classList.add('carousel-author-date');
            carouselItem.appendChild(authorDateContainer);

            const author = document.createElement('span');
            author.innerHTML = `By ${post._embedded.author[0].name}`;
            authorDateContainer.appendChild(author);

            // Format the date mmm.dd.yyyy
            const date = new Date(post.date);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${month}.${day}.${year}`;

            const postDate = document.createElement('span');
            postDate.innerHTML = formattedDate;
            authorDateContainer.appendChild(postDate);

        });
        handleCarousel(carousel, true);
    });
}


// Function to control the carousel

function handleCarousel(isCarousel, isAutoPlay = false) {

    const firstCardWidth = isCarousel.querySelector('.carousel-item').offsetWidth;
    const carouselChildrens = [...isCarousel.children];
    const arrowBtns = document.querySelectorAll('.arrow-button');

    let isDragging = false, startX, startScrollLeft, timeoutId;

    // Get the number of carousel items that can fit in the carousel at once
    let cardPerView = Math.round(constants.carouselWrapper.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        isCarousel.insertAdjacentHTML('afterbegin', card.outerHTML);
    });

    // Insert copies of the first few cards to end of carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        isCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
    isCarousel.classList.add("no-transition");
    isCarousel.scrollLeft = isCarousel.offsetWidth;
    isCarousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            isCarousel.scrollLeft += btn.id == "left-arrow" ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        isCarousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = isCarousel.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        isCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        isCarousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        //  console.log('isCarousel.scrollLeft', isCarousel.scrollLeft), 'isCarousel.scrollWidth', isCarousel.scrollWidth, 'isCarousel.offsetWidth', isCarousel.offsetWidth, 'isCarousel.scrollWidth - isCarousel.offsetWidth', isCarousel.scrollWidth - isCarousel.offsetWidth;
        if (isCarousel.scrollLeft <= 40) {
            isCarousel.classList.add("no-transition");
            isCarousel.scrollLeft = isCarousel.scrollWidth - (2 * isCarousel.offsetWidth);
            isCarousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if (Math.ceil(isCarousel.scrollLeft) === isCarousel.scrollWidth - isCarousel.offsetWidth) {
            isCarousel.classList.add("no-transition");
            isCarousel.scrollLeft = isCarousel.offsetWidth;
            isCarousel.classList.remove("no-transition");
        }

        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if (!constants.carouselWrapper.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => isCarousel.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();

    isCarousel.addEventListener("mousedown", dragStart);
    isCarousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    isCarousel.addEventListener("scroll", infiniteScroll);
    constants.carouselWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    constants.carouselWrapper.addEventListener("mouseleave", autoPlay);
}

