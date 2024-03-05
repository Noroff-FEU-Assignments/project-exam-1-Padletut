import * as constants from './constants.js';
import { fetchPosts } from './fetch.js';


export function initCarousel(renderContainer) {
    if (constants.carouselContainer) {
        const sliderItems = document.getElementById('carousel-slides');
        const prev = document.getElementById('carousel-prev');
        const next = document.getElementById('carousel-next');


        if (window.innerWidth > 724) {
            const numSlides = sliderItems.children.length;
            sliderItems.style.width = `${numSlides * 100}%`; // Adjust 100% to the percentage of one slide relative to the container width
            sliderItems.style.left = `-${(numSlides / 3) * 100}%`; // Adjust to center the first slide
            fetchPosts().then(posts => renderCarouselSlides(renderContainer, sliderItems, prev, next, posts));
        } else {
            fetchPosts().then(posts => renderCarouselSlides(renderContainer, sliderItems, prev, next, posts));
        }
    }
}

function renderCarouselSlides(wrapper, items, prev, next, posts, autoSlider = true) {

    // Remove existing slides
    while (items.firstChild) {
        items.firstChild.remove();
    }

    // Create a separate navigate function
    function navigate(id) {
        return function (event) {
            if (!items.classList.contains('drag')) {
                event.preventDefault();
                window.location.href = `blog.html?id=${id}`;
            }
        }
    }

    // Create slides for posts
    const latestPosts = posts.slice(0, 4); // Get the 4 latest posts
    latestPosts.forEach(post => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');

        const title = document.createElement('h2');
        title.textContent = post.title.rendered;
        slide.appendChild(title);

        const image = document.createElement('img');
        image.src = post._embedded['wp:featuredmedia'][0].source_url;
        image.alt = post._embedded['wp:featuredmedia'][0].alt_text;
        slide.appendChild(image);

        const authorDateContainer = document.createElement('div');
        authorDateContainer.classList.add('carousel-author-date');
        slide.appendChild(authorDateContainer);

        const author = document.createElement('span');
        author.textContent = `By ${post._embedded.author[0].name}`;
        authorDateContainer.appendChild(author);

        // Format the date mmm.dd.yyyy
        const date = new Date(post.date);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${month}.${day}.${year}`;


        const postDate = document.createElement('span');
        postDate.textContent = formattedDate;
        authorDateContainer.appendChild(postDate);

        image.addEventListener('click', navigate(post.id));
        image.addEventListener('touchend', navigate(post.id));

        items.appendChild(slide);
    });

    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('carousel-item'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('carousel-item')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;


    // Update firstSlide
    firstSlide = items.firstElementChild;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');

    // Attach event listener to the clones
    cloneFirst.querySelector('img').addEventListener('click', navigate(latestPosts[0].id));
    cloneFirst.querySelector('img').addEventListener('touchend', navigate(latestPosts[0].id));
    cloneLast.querySelector('img').addEventListener('click', navigate(latestPosts[latestPosts.length - 1].id));
    cloneLast.querySelector('img').addEventListener('touchend', navigate(latestPosts[latestPosts.length - 1].id));

    // Mouse events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    // Click events
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    // Auto slide
    function autoSlide(items, shiftSlide) {
        let autoSlideInterval = setInterval(function () { shiftSlide(1) }, 3000); // Change slides every 3 seconds

        // Clear interval on user interaction
        items.addEventListener('mousedown', function (event) {
            clearInterval(autoSlideInterval);
            dragStart(event);
        });

        prev.addEventListener('click', function () {
            clearInterval(autoSlideInterval);
            shiftSlide(-1);
        });

        next.addEventListener('click', function () {
            clearInterval(autoSlideInterval);
            shiftSlide(1);
        });

        // Add interval back if no user interaction after 5 seconds
        items.addEventListener('mouseup', function () {
            autoSlideInterval = setInterval(function () { shiftSlide(1) }, 3000);
        });
    }

    if (autoSlider) autoSlide(items, shiftSlide);

    // Generate dots
    for (let i = 0; i < slidesLength; i++) {
        let dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        dot.addEventListener('click', function () {
            goToSlide(i);
        });
        constants.carouselDotContainer.appendChild(dot);
        updateDots();
    }

    // Update dots
    function updateDots() {
        let dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Go to slide
    function goToSlide(i) {
        if (window.innerWidth > 724) {
            items.style.left = -((i) * slideSize) + "px";
        } else {

            items.style.left = -((i + 1) * slideSize) + "px";
        }
        index = i;
        updateDots();
        items.style.transition = "left 0.3s ease-in-out";
    }

    // Update dots when slide changes
    items.addEventListener('transitionend', function () {
        checkIndex();
        updateDots();
        items.style.transition = "";
    });


    function dragStart(e) {
        e = e || window.e;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }

        // Avoid add class drag if not dragging
        const dragThreshold = 1;
        items.style.left = (items.offsetLeft - posX2) + "px";

        if (Math.abs(posX2) >= dragThreshold) {
            items.classList.add('drag');
        }
    }

    function dragEnd() {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        // remove class 'drag' from
        setTimeout(function () {
            items.classList.remove('drag');
        }, 100);

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = items.offsetLeft; }

            if (dir == 1) {

                items.style.left = (posInitial - slideSize) + "px";
                index++;

            } else if (dir == -1) {

                items.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        }

        allowShift = false;
    }

    function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
            if (window.innerWidth > 724) {
                items.style.left = -((slidesLength - 1) * slideSize) + "px";
            } else {
                items.style.left = -(slidesLength * slideSize) + "px";
            }
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            if (window.innerWidth > 724) {
                items.style.left = 0;
            } else {
                items.style.left = -(1 * slideSize) + "px";
            }
            index = 0;
        }
        allowShift = true;
        updateCurrentItemStyles();
    }

    // Function to update the style of the carousel items
    function updateCurrentItemStyles() {
        if (window.innerWidth > 724) {

            for (let i = 0; i < slides.length; i++) {
                if (i === index + 1) {

                    slides[i].style.opacity = 1;
                } else {

                    slides[i].style.opacity = 0.5;
                }
            }
        }
    }

    updateCurrentItemStyles();
}