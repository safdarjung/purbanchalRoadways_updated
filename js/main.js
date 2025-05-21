// Sticky Navigation
let lastScrollTop = 0;
let ticking = false;
const scrollThreshold = 20; // Minimum scroll difference to detect direction
const showDelay = 200; // Delay before showing navbar on scroll up (ms)
let lastHideTime = 0;

function onScroll() {
    const navbar = document.querySelector('.navbar');
    const topBar = document.querySelector('.top-bar');
    const expertiseBanner = document.querySelector('.expertise-banner');
    const currentScroll = window.scrollY;
    const now = Date.now();

    if (currentScroll > 100) {
        navbar.classList.add('navbar-sticky');
        if (topBar) {
            topBar.style.display = 'none';
        }
        if (expertiseBanner) {
            expertiseBanner.style.display = 'none';
        }
        if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
            if (currentScroll > lastScrollTop) {
                // Scrolling down
                navbar.classList.add('navbar-hidden');
                lastHideTime = now;
            } else {
                // Scrolling up
                if (now - lastHideTime > showDelay) {
                    navbar.classList.remove('navbar-hidden');
                }
            }
        }
    } else {
        navbar.classList.remove('navbar-sticky');
        navbar.classList.remove('navbar-hidden');
        if (topBar) {
            topBar.style.display = '';
        }
        if (expertiseBanner) {
            expertiseBanner.style.display = '';
        }
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    ticking = false;
}

function adjustMainPadding() {
    const main = document.querySelector('main');
    const topBar = document.querySelector('.top-bar');
    const navbar = document.querySelector('.navbar');
    const expertiseBanner = document.querySelector('.expertise-banner');

    let totalHeight = 0;
    if (topBar && window.getComputedStyle(topBar).display !== 'none') {
        totalHeight += topBar.offsetHeight;
    }
    if (navbar && window.getComputedStyle(navbar).display !== 'none') {
        totalHeight += navbar.offsetHeight;
    }
    if (expertiseBanner && window.getComputedStyle(expertiseBanner).display !== 'none') {
        totalHeight += expertiseBanner.offsetHeight;
    }

    if (main) {
        main.style.paddingTop = totalHeight + 'px';
    }
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
    }
});

window.addEventListener('resize', adjustMainPadding);
window.addEventListener('load', adjustMainPadding);

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
