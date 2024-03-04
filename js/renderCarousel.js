import * as constants from './constants.js';
import { fetchPosts } from './fetch.js';


export function initCarousel(renderContainer) {
    if (constants.carouselContainer) {
        const sliderItems = document.getElementById('carousel-slides');
        const prev = document.getElementById('carousel-prev');
        const next = document.getElementById('carousel-next');
        fetchPosts().then(posts => renderCarouselSlides(renderContainer, sliderItems, prev, next, posts));
    }
}

function renderCarouselSlides(wrapper, items, prev, next, posts, autoSlider = false) {

    // Remove existing slides
    while (items.firstChild) {
        items.firstChild.remove();
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
        image.addEventListener('click', function (event) {
            if (!items.classList.contains('drag')) {
                event.preventDefault();
                window.location.href = `blog.html?id=${post.id}`;
            }
        });
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
        items.onmousedown = function () {
            clearInterval(autoSlideInterval);
            dragStart();
        };

        prev.addEventListener('click', function () {
            clearInterval(autoSlideInterval);
            shiftSlide(-1);
        });

        next.addEventListener('click', function () {
            clearInterval(autoSlideInterval);
            shiftSlide(1);
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
        items.style.left = -((i + 1) * slideSize) + "px";
        index = i;
        updateDots();
        items.style.transition = "left 0.5s ease-in-out";
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

        // add class 'drag' to the items
        items.classList.add('drag');

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
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
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }
}