import * as constants from '../../constants/constants.js';
import { fetchComments } from '../../logic/api/fetchcomments.js';

// Function to add a new comment to the current post

export function renderComments(id) {
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

                    constants.commentLoader.style.display = 'none';

                    data.forEach(comment => {
                        const commentContainer = document.createElement('div');
                        commentContainer.classList.add('comment-container');
                        comments.appendChild(commentContainer);

                        const commentAuthorDateContainer = document.createElement('div');
                        commentAuthorDateContainer.classList.add('comment-author-date-container');
                        commentContainer.appendChild(commentAuthorDateContainer);

                        const commentAuthor = document.createElement('span');
                        commentAuthor.classList.add('comment-author');
                        commentAuthor.innerHTML = `By ${comment.author_name}`;
                        commentAuthorDateContainer.appendChild(commentAuthor);

                        const commentDate = document.createElement('span');
                        commentDate.classList.add('comment-date');
                        // Format the date dd.mm.yyyy
                        const date = new Date(comment.date);
                        const day = date.getDate().toString().padStart(2, '0');
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const year = date.getFullYear();
                        const formattedDate = `${day}.${month}.${year}`;
                        commentDate.innerHTML = formattedDate;
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
}