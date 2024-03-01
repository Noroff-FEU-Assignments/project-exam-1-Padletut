export function imageModal() {
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        const handleClick = (event) => {
            if (event.target.tagName === 'IMG') {
                // Check if modal already exists
                const existingModal = document.querySelector('.modal');
                if (existingModal) {
                    existingModal.remove();
                }

                const modal = document.createElement('div');
                modal.classList.add('modal');
                document.body.appendChild(modal);

                // Wait for the modal to be appended to the DOM before adding the image
                setTimeout(() => {
                    modal.style.opacity = "1";
                }, 0);

                const img = document.createElement('img');
                img.src = event.target.src;
                img.alt = event.target.alt;
                modal.appendChild(img);

                modal.addEventListener('click', () => {
                    modal.style.opacity = "0";
                    setTimeout(() => {
                        modal.remove();
                    }, 800);
                });
            }
        };

        // Remove existing event listener
        postContent.removeEventListener('click', handleClick);

        // Add new event listener
        postContent.addEventListener('click', handleClick);
    }
}