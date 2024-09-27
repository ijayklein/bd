// script.js
document.addEventListener('DOMContentLoaded', function() {
    const imageGallery = document.getElementById('image-gallery');
    const overlay = document.getElementById('overlay');
    const largeImage = document.getElementById('large-image');
    const descriptionBox = document.getElementById('description');

    let currentIndex = -1;
    let images = [];

    // Load the JSON data with fetch
    fetch('images_data.json')
    .then(response => response.json())
    .then(data => {
        images = data;

        // Iterate over the images and load them into the gallery
        images.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = `images/${image.file}`; // Adjust path to your image folder
            imgElement.alt = image.file;
            imgElement.dataset.description = image.description;

            imgElement.addEventListener('click', function(e) {
                currentIndex = index;
                showOverlay(image);
            });

            imageGallery.appendChild(imgElement);
        });
    })
    .catch(error => {
        console.error("Error loading JSON data: ", error);
    });

    function showOverlay(image) {
        const sourceImage = image.file.replace('thumb_', '').replace('.png', '.jpeg'); // Convert to the source image file
        largeImage.src = `sources/${sourceImage}`;
        descriptionBox.textContent = image.description;

        overlay.style.display = 'flex'; // Show the overlay with the high-res image and description
    }

    // Hide the overlay when clicked outside
    overlay.addEventListener('click', function() {
        hideOverlay();
    });

    // Keyboard navigation for left (37) and right (39) arrows
    document.addEventListener('keydown', function(e) {
        if (overlay.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                // Show the previous image
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
                showOverlay(images[currentIndex]);
            } else if (e.key === 'ArrowRight') {
                // Show the next image
                currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
                showOverlay(images[currentIndex]);
            } else {
                // Hide the overlay for any other key
                hideOverlay();
            }
        }
    });

    // Function to hide the overlay
    function hideOverlay() {
        overlay.style.display = 'none';
        largeImage.src = ''; // Clear the large image
        descriptionBox.textContent = ''; // Clear the description
    }
});
