import { fetchPost } from "../../api/fetchpost.js";
import { imageModal } from "../imagemodal/imagemodal.js"
import { renderComments } from "../comments/rendercomments.js";

// Function to render a single post using fetchPost function */

export function renderPost(id) {
    const post = document.querySelector('.post');
    post.innerHTML = '';
    if (post) {
        fetchPost(id)
            .then(data => {
                const title = document.createElement('h2');
                title.classList.add('post-title');
                title.innerHTML = data.title.rendered;
                post.appendChild(title);
                document.title = `SuperCarBlog | ${data.title.rendered}`;

                const content = document.createElement('div');
                content.classList.add('post-content');
                content.innerHTML = data.content.rendered;
                post.appendChild(content);

                // Create imageModal icon fa-search-plus inside content figure
                const imageContainer = document.querySelectorAll('.post-content figure');
                imageContainer.forEach(image => {
                    const imageModalIcon = document.createElement('figcaption');
                    imageModalIcon.classList.add('fas', 'fa-search-plus', 'image-modal-icon');
                    image.appendChild(imageModalIcon);
                });

                const authorDateContainer = document.createElement('div');
                authorDateContainer.classList.add('post-author-date-container');
                post.appendChild(authorDateContainer);

                const author = document.createElement('span');
                author.innerHTML = `By ${data._embedded.author[0].name}`;
                authorDateContainer.appendChild(author);

                // Format the date mmm.dd.yyyy
                const date = new Date(data.date);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                const formattedDate = `${month}.${day}.${year}`;
                const postDate = document.createElement('span');
                postDate.innerHTML = formattedDate;
                authorDateContainer.appendChild(postDate);

                imageModal();
            });
        renderComments(id);
    }
}