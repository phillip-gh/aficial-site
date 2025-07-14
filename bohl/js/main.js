// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling für alle Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Schließe das Mobile Menu wenn es offen ist
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
            
            // Smooth Scroll zum Ziel
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 80px offset für den Header
                behavior: 'smooth'
            });
        }
    });
});

// Scroll zum Anfang der Seite für Impressum und Datenschutz
document.querySelectorAll('a[href="impressum.html"], a[href="datenschutz.html"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        window.location.href = href;
    });
});

// Scroll zum Anfang der Seite nach dem Laden
window.addEventListener('load', function() {
    if (window.location.pathname.includes('impressum.html') || 
        window.location.pathname.includes('datenschutz.html')) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Header wird transparent wenn man nach unten scrollt
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = '#fff';
    }
});

// Show license cards on scroll
document.addEventListener('DOMContentLoaded', function() {
    const licenseCards = document.querySelectorAll('.license-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    licenseCards.forEach(card => {
        observer.observe(card);
    });
});

// Funktion für die Standorte-Sektion
function initLocationsSection() {
    const locationCards = document.querySelectorAll('.location-card');
    const locationMap = document.querySelector('.location-map');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    locationCards.forEach(card => observer.observe(card));
    if (locationMap) observer.observe(locationMap);
}

// Initialisierung der Standorte-Sektion beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    initLocationsSection();
});

// Funktion für die News-Sektion
function initNewsSection() {
    const newsCards = document.querySelectorAll('.news-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    newsCards.forEach(card => observer.observe(card));
}

// Initialisierung der News-Sektion beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    initNewsSection();
});

// Process Section Animation
function initProcessSection() {
    const processCards = document.querySelectorAll('.process-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    processCards.forEach(card => {
        observer.observe(card);
    });
}

// Galerie Lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.getAttribute('data-fullsrc') || img.src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
            closeLightbox();
        }
    });
}

// Initialisiere die Galerie-Lightbox explizit
initGalleryLightbox();

// Initialize all sections when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initSmoothScroll();
    initHeaderTransparency();
    initLicenseSection();
    initLocationsSection();
    initNewsSection();
    initProcessSection();
    initGalleryLightbox();
}); 