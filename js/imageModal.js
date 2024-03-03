export function imageModal() {
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        const handleClick = (event) => {
            let target = event.target.closest('img, .image-modal-icon');
            if (target) {
                // If the target is the .image-modal-icon, find the associated img
                if (target.classList.contains('image-modal-icon')) {
                    target = target.parentElement.querySelector('img');
                }

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
                img.src = target.src;
                img.alt = target.alt;
                modal.appendChild(img);

                modal.addEventListener('click', () => {
                    modal.style.opacity = "0";
                    setTimeout(() => {
                        modal.remove();
                    }, 800);
                });
            }
        };

        // Add event listener to all elements with class .wp-block-image
        const parentElements = document.querySelectorAll('.wp-block-image');
        parentElements.forEach(parentElement => {
            parentElement.addEventListener('click', handleClick);
        });
    }
}