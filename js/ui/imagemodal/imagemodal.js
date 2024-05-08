export function imageModal() {
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        const openModal = (event) => {
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

                // Create close button
                const closeButton = document.createElement('i');
                closeButton.classList.add('fas', 'fa-times', 'image-modal-close');
                closeButton.addEventListener('click', () => {
                    closeModal(modal);
                });
                modal.appendChild(closeButton);

                // Create modal content and set focus to it
                modal.style.opacity = "1";
                modal.setAttribute('tabindex', '0');
                modal.focus();


                const img = document.createElement('img');
                img.src = target.src;
                img.alt = target.alt;
                modal.appendChild(img);

                modal.addEventListener('click', () => {
                    closeModal(modal);
                });

                modal.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') {
                        closeModal(modal);
                    }
                });
            }
        };

        // Add event listener to all elements with class .wp-block-image
        const parentElements = document.querySelectorAll('.wp-block-image');
        parentElements.forEach(parentElement => {
            parentElement.addEventListener('click', (event) => openModal(event));
            parentElement.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    openModal(event);
                }
            });
        });
    }
}

function closeModal(modal) {
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.remove();
    }, 800);
}