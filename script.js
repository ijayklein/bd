// script.js
document.addEventListener('DOMContentLoaded', function() {
    const imageGallery = document.getElementById('image-gallery');
    const descriptionBox = document.getElementById('description-box');

    // Load the JSON data with fetch
    fetch('images_data.json')
    .then(response => response.json())
    .then(images => {
        // Iterate over the images and load them into the gallery
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = `images/${image.file}`; // Adjust path to your image folder
            imgElement.alt = image.file;
            imgElement.dataset.description = image.description;

            imgElement.addEventListener('click', function(e) {
                descriptionBox.innerHTML = `<p>${this.dataset.description}</p>`;
                descriptionBox.style.display = 'block';
            });

            imageGallery.appendChild(imgElement);
        });
    })
    .catch(error => {
        console.error("Error loading JSON data: ", error);
    });

    // Hide description box on outside click
    document.addEventListener('click', function(e) {
        if (!e.target.matches('img')) {
            descriptionBox.style.display = 'none';
        }
    });
});
