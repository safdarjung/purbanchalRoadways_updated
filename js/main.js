// Sticky Navigation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const topBar = document.querySelector('.top-bar');
    const expertiseBanner = document.querySelector('.expertise-banner');

    if (window.scrollY > 100) {
        navbar.classList.add('navbar-sticky');
        if (topBar) {
            topBar.style.display = 'none';
        }
        if (expertiseBanner) {
            expertiseBanner.style.display = 'none';
        }
    } else {
        navbar.classList.remove('navbar-sticky');
        if (topBar) {
            topBar.style.display = '';
        }
        if (expertiseBanner) {
            expertiseBanner.style.display = '';
        }
    }
});
