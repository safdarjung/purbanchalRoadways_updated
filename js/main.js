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

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (mobileMenuBtn && navMenu) {
        // Toggle menu
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            mobileMenuBtn.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(event.target) && 
                !mobileMenuBtn.contains(event.target)) {
                navMenu.classList.remove('active');
                body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Handle escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
