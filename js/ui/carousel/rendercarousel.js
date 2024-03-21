import { fetchPosts } from '../../api/fetchposts.js';
import { dotsEventListener } from '../../logic/carousel/dotseventlistener/doteventlistener.js';
import { imageClickListener } from '../../logic/carousel/imageclicklistener/imageclicklistener.js';
import { handleCarousel } from '../../logic/carousel/handlecarousel/handlecarousel.js';

export function renderCarousel(carouselWrapper, loaderContainer) {

    const carousel = document.createElement('ul');
    carousel.classList.add('carousel');
    carouselWrapper.appendChild(carousel);

    const page = 1;

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

        if (data.length > 0) {
            loaderContainer.style.display = 'none';
        }

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
            imageClickListener(carousel, image, post.id);


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