import * as constants from './constants/constants.js';
import { fetchPosts } from './api/fetch.js';

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

    const carouselDotsContainer = document.createElement('div');
    carouselDotsContainer.classList.add('carousel-dot-container');
    carouselWrapper.appendChild(carouselDotsContainer);

    fetchPosts(page).then(data => {

        const latestPosts = data.slice(0, 4); // Get the 4 latest posts

        latestPosts.forEach(post => {
            const carouselItem = document.createElement('li');
            carouselItem.classList.add('carousel-item');
            carouselItem.dataset.index = latestPosts.indexOf(post);
            carouselItem.dataset.id = post.id;
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

            // Add click event listener to the image
            addImageClickListener(carousel, image, post.id);


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

            const carouseldot = document.createElement('div');
            carouseldot.classList.add('carousel-dot');
            carouseldot.dataset.index = latestPosts.indexOf(post);
            carouselDotsContainer.appendChild(carouseldot);

            dotsEventListener(carouseldot, latestPosts, post, carousel);

        });
        handleCarousel(carousel, true);
    });
}

function dotsEventListener(carouseldot, latestPosts, post, carousel) {
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

function addImageClickListener(carousel, image, postId) {
    image.addEventListener('click', () => {
        let isDragging = carousel.classList.contains('dragging');
        if (!isDragging) {
            window.location.href = `blog.html?id=${postId}`;
        }
    });
}


function updateActiveDot(carousel, index) {
    const dots = document.querySelectorAll('.carousel-dot');
    // Convert index to number
    const indexNumber = Number(index);
    dots.forEach(dot => dot.classList.remove('active'));
    if (indexNumber >= 0 && indexNumber < dots.length) {
        dots[indexNumber].classList.add('active');
    }
}


// Function to control the carousel

function handleCarousel(carousel, isAutoPlay = false) {

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