import { fetchComments } from './fetch.js';

// Function to add a new comment to the current post

export function renderComments(id, addComment = false) {
    const comments = document.querySelector('.comments');
    comments.innerHTML = '';
    if (comments) {
        const commentsTitle = document.createElement('h3');
        commentsTitle.classList.add('comments-title');
        commentsTitle.innerHTML = 'Comments';
        comments.appendChild(commentsTitle);

        fetchComments(id)
            .then(data => {
                if (data.length > 0) {
                    data.forEach(comment => {
                        const commentContainer = document.createElement('div');
                        commentContainer.classList.add('comment-container');
                        comments.appendChild(commentContainer);

                        const commentAuthorDateContainer = document.createElement('div');
                        commentAuthorDateContainer.classList.add('comment-author-date-container');
                        commentContainer.appendChild(commentAuthorDateContainer);

                        const commentAuthor = document.createElement('span');
                        commentAuthor.classList.add('comment-author');
                        commentAuthor.innerHTML = comment.author_name;
                        commentAuthorDateContainer.appendChild(commentAuthor);

                        const commentDate = document.createElement('span');
                        commentDate.classList.add('comment-date');
                        commentDate.innerHTML = new Date(comment.date).toLocaleDateString('no-nb', { day: 'numeric', month: 'numeric', year: 'numeric' });
                        commentAuthorDateContainer.appendChild(commentDate);

                        const commentContent = document.createElement('div');
                        commentContent.classList.add('comment-content');
                        commentContent.innerHTML = comment.content.rendered;
                        commentContainer.appendChild(commentContent);
                    });
                } else {
                    const noComments = document.createElement('p');
                    noComments.classList.add('no-comments');
                    noComments.innerHTML = 'No comments yet';
                    comments.appendChild(noComments);
                }
            });
    }
    if (addComment) {
        // Scroll to the bottom of the site to see the new comment
        const scrollingElement = (document.scrollingElement || document.body);
        setTimeout(() => {
            scrollingElement.scrollTop = scrollingElement.scrollHeight;
        }, 0);
    }
}