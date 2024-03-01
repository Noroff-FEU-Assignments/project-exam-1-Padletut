import { fetchPost } from "./fetch.js";
import { imageModal } from "./imageModal.js";
import { renderComments } from "./renderComments.js";

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

                const content = document.createElement('div');
                content.classList.add('post-content');
                content.innerHTML = data.content.rendered;
                post.appendChild(content);

                const authorDateContainer = document.createElement('div');
                authorDateContainer.classList.add('post-author-date-container');
                post.appendChild(authorDateContainer);

                const author = document.createElement('span');
                author.innerHTML = `By ${data._embedded.author[0].name}`;
                authorDateContainer.appendChild(author);

                const postDate = document.createElement('span');

                postDate.innerHTML = new Date(data.date).toLocaleDateString('no-nb', { day: 'numeric', month: 'numeric', year: 'numeric' });
                authorDateContainer.appendChild(postDate);
                imageModal();
            });
        renderComments(id);
    }
}