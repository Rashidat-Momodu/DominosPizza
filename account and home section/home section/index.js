document.addEventListener('DOMContentLoaded', function() {
    const categoryLinks = document.querySelectorAll('.category-link');
    const popupContainer = document.getElementById('popup-container');
    const popupImage = document.getElementById('popup-image');
    const closePopup = document.querySelector('.close');

    categoryLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            const imagePath = getCategoryImagePath(category);
            if (imagePath) {
                popupImage.src = imagePath;
                popupContainer.style.display = 'block';
            }
        });
    });

    closePopup.addEventListener('click', function() {
        popupContainer.style.display = 'none';
    });

    popupContainer.addEventListener('click', function(e) {
        if (e.target === this) {
            popupContainer.style.display = 'none';
        }
    });

    function getCategoryImagePath(category) {
        switch (category) {
            case 'pizza':
                return 'pizza.jpg';
            case 'chicken':
                return 'chicken.jpg';
            case 'desserts':
                return 'desserts.jpg';
            case 'extra':
                return 'extra.jpg';
            case 'drinks':
                return 'drinks.jpg';
            default:
                return null;
        }
    }
});
