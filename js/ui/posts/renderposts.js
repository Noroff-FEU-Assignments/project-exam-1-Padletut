import { fetchPosts } from "../../logic/api/fetchposts.js";

// Function to render WP posts and display title, featured image, date and author

export function renderPosts(renderContainer, loaderContainer, page = 1, searchResults = null) {

    let searchData;

    // Loop through the posts and render the title, featured image, date and author
    if (searchResults) {
        searchData = Promise.resolve(searchResults);
    } else {
        searchData = fetchPosts(page);
    }

    searchData.then(data => {
        data.forEach(post => {

            const postContainer = document.createElement('div');
            const postAuthorDateContainer = document.createElement('div');
            postContainer.classList.add('posts');
            postAuthorDateContainer.classList.add('post-author-date');
            renderContainer.appendChild(postContainer);

            const postTitle = document.createElement('h3');
            postTitle.innerHTML = post.title.rendered;
            postContainer.appendChild(postTitle);

            const imageContainer = document.createElement('figure');
            postContainer.appendChild(imageContainer);

            const postImage = document.createElement('img');
            postImage.src = post._embedded['wp:featuredmedia'][0].source_url;
            postImage.alt = post._embedded['wp:featuredmedia'][0].alt_text;
            imageContainer.appendChild(postImage);

            postContainer.appendChild(postAuthorDateContainer);
            const postAuthor = document.createElement('span');
            postAuthor.innerHTML = `By ${post._embedded.author[0].name}`;
            postAuthorDateContainer.appendChild(postAuthor);

            // Format the date dd.mm.yyyy
            const date = new Date(post.date);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}.${month}.${year}`;

            const postDate = document.createElement('span');
            postDate.innerHTML = formattedDate;
            postAuthorDateContainer.appendChild(postDate);

            // Add click event listener to postContainer
            postContainer.addEventListener('click', () => {
                const id = post.id;
                window.location.href = `blog.html?id=${id}`;
            });
        });
        if (!searchResults) {
            const showMoreButton = document.createElement('button');
            showMoreButton.classList.add('show-more-button');
            showMoreButton.innerHTML = 'Show more';
            renderContainer.appendChild(showMoreButton);
            showMorePosts();

            if (data.length < 10) {
                showMoreButton.remove();
            }

            if (data.length > 0) {
                // Select the loader element
                // Hide the loader
                if (loaderContainer) {
                    loaderContainer.style.display = 'none';
                }
            }
        }
    });

}

// Add 10 more posts when the user click on show more button */

function showMorePosts() {
    const showMoreButton = document.querySelector('.show-more-button');
    const renderContainer = document.querySelector('.posts-list');
    const loaderContainer = document.querySelector('.loader-container');
    let page = 1;

    showMoreButton.addEventListener('click', () => {
        page++;
        renderPosts(renderContainer, loaderContainer, page);
        showMoreButton.remove(); // Remove the show more button after clicking
    });
}