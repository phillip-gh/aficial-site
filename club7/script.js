// DOM Elements
const eventsGrid = document.getElementById('eventsGrid');
const navbar = document.querySelector('.navbar');
const navLogo = document.querySelector('.nav-logo');

// Load events from JSON file
async function loadEvents() {
    try {
        console.log('Starting to load events...'); // Debug log
        
        // Try to load from events.json first
        let response = null;
        let usedPath = '';
        
        const possiblePaths = [
            'events.json',
            './events.json',
            '/events.json',
            '../events.json'
        ];
        
        for (const path of possiblePaths) {
            try {
                console.log('Trying path:', path); // Debug log
                response = await fetch(path);
                if (response.ok) {
                    usedPath = path;
                    console.log('Successfully loaded from:', path); // Debug log
                    break;
                }
            } catch (pathError) {
                console.log('Failed to load from:', path, pathError.message); // Debug log
                continue;
            }
        }
        
        if (response && response.ok) {
            // Successfully loaded from JSON file
            console.log('Response status:', response.status); // Debug log
            
            const data = await response.json();
            console.log('Loaded events data:', data); // Debug log
            console.log('Events array:', data.events); // Debug log
            console.log('Number of events:', data.events ? data.events.length : 'undefined'); // Debug log
            
            if (!data.events || !Array.isArray(data.events)) {
                throw new Error('Invalid events data structure');
            }
            
            displayEvents(data.events);
            return;
        }
        
        // If JSON loading failed, use embedded events as fallback
        console.log('JSON loading failed, using embedded events as fallback'); // Debug log
        const embeddedEvents = [
              {
      "id": 1,
      "title": "Ü30 Party",
      "description": "",
      "date": "2025-09-13",
      "time": "22:00",
      "image": "Sources/Events/A_13-09_Ü30_22.jpg",
      "ticketUrl": "#",
      "category": "Ü30"
    },
    {
      "id": 2,
      "title": "ДИСКОТЕКА Party",
      "description": "",
      "date": "2024-09-20",
      "time": "23:00",
      "image": "Sources/Events/B_20-09_ДИСКОТЕКА_23.jpeg",
      "ticketUrl": "#",
      "category": "Russian"
    },
    {
      "id": 3,
      "title": "Ü30 Ladies Edition",
      "description": "",
      "date": "2025-09-27",
      "time": "22:00",
      "image": "Sources/Events/C_27-09_Ü30LadiesEdition_22.png",
      "ticketUrl": "#",
      "category": "Ü30"
    },
    {
      "id": 4,
      "title": "Old School",
      "description": "",
      "date": "2024-10-02",
      "time": "22:00",
      "image": "Sources/Events/D_02-10_OldSchool_22.jpg",
      "ticketUrl": "#",
      "category": "Ü30"
    },
    {
      "id": 5,
      "title": "Back To 80s",
      "description": "",
      "date": "2025-10-04",
      "time": "22:00",
      "image": "Sources/Events/E_04-10_BackTo80s_22.png",
      "ticketUrl": "#",
      "category": "80s"
    },
    {
      "id": 6,
      "title": "Ü30 Party",
      "description": "",
      "date": "2025-10-11",
      "time": "22:00",
      "image": "Sources/Events/F_11-10_Ü30Party_22.png",
      "ticketUrl": "#",
      "category": "Ü30"
    },
    {
      "id": 7,
      "title": "Ü50 Party",
      "description": "",
      "date": "2025-10-18",
      "time": "21:00",
      "image": "Sources/Events/G_18-10_Ü50Party_21.png",
      "ticketUrl": "#",
      "category": "Ü50"
    },
    {
      "id": 8,
      "title": "Ü30 Halloween Edition",
      "description": "",
      "date": "2025-10-25",
      "time": "23:00",
      "image": "Sources/Events/H_25-10_Ü30HalloweenEdition_23.jpg",
      "ticketUrl": "#",
      "category": "Ü30"
    },
    {
      "id": 9,
      "title": "Halloween Party",
      "description": "",
      "date": "2025-10-31",
      "time": "22:00",
      "image": "Sources/Events/I_31-10_HalloweenParty_22.png",
      "ticketUrl": "#",
      "category": "Halloween"
    }
        ];
        
        console.log('Using embedded events:', embeddedEvents.length, 'events'); // Debug log
        displayEvents(embeddedEvents);
        
    } catch (error) {
        console.error('Error loading events:', error);
        eventsGrid.innerHTML = '<div class="error">Error loading events: ' + error.message + '</div>';
    }
}

// Display events in the grid
function displayEvents(events) {
    console.log('Displaying events:', events); // Debug log
    
    if (!events || events.length === 0) {
        console.log('No events to display'); // Debug log
        eventsGrid.innerHTML = '<div class="no-events">No upcoming events at the moment.</div>';
        return;
    }

    console.log('Creating HTML for', events.length, 'events'); // Debug log
    
    const eventsHTML = events.map((event, index) => {
        console.log('Processing event', index + 1, ':', event.title); // Debug log
        const dateInfo = formatDateForDisplay(event.date);
        return `
            <div class="event-card">
                <img src="${event.image}" alt="${event.title}" class="event-image" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop'">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-content">
                    <div class="event-date">
                        <div class="date-left">
                            <div class="date-day">${dateInfo.day}</div>
                            <div class="date-month">${dateInfo.month}</div>
                            <div class="date-weekday">${dateInfo.weekday}</div>
                        </div>
                        <div class="date-right">
                            <div class="date-time">Einlass: ${event.time} Uhr</div>
                        </div>
                    </div>
                    <a href="lounge-reservierung.html" class="event-ticket">Lounge reservieren</a>
                </div>
            </div>
        `;
    }).join('');

    console.log('Setting innerHTML with events'); // Debug log
    eventsGrid.innerHTML = eventsHTML;
    
    // Initialize slider after events are loaded
    setTimeout(() => {
        initEventsSlider();
    }, 500); // Increased delay to ensure all events are rendered
}

// Format date to German format
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('de-DE', options);
}

// Format date for display like the flyer
function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    
    const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const months = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'];
    
    return {
        day: date.getDate().toString().padStart(2, '0'),
        month: months[date.getMonth()],
        weekday: weekdays[date.getDay()].toUpperCase()
    };
}

// Navbar scroll effect - REMOVED OLD FUNCTION

// Smooth scroll for navigation links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get navbar height for proper offset calculation
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetElement.offsetTop - navbarHeight;
                
                // Ensure we scroll to the very top of the target section
                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Logo click handler
function initLogoClick() {
    navLogo.addEventListener('click', function(e) {
        e.preventDefault();
        // Check if we're on a subpage and redirect to home
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
            window.location.href = 'index.html';
        } else {
            // Remove any hash from URL and reload
            window.location.href = window.location.pathname;
        }
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// FAQ Toggle Function
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const isActive = faqAnswer.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.classList.remove('active');
    });
    
    document.querySelectorAll('.faq-question').forEach(question => {
        question.classList.remove('active');
    });
    
    // Toggle current FAQ item
    if (!isActive) {
        faqAnswer.classList.add('active');
        element.classList.add('active');
    }
}

// Drink Category Toggle Function
function toggleDrinkCategory(element) {
    const drinkCategory = element.parentElement;
    const drinkItems = drinkCategory.querySelector('.drink-items');
    const isVisible = drinkItems.style.display !== 'none';
    
    // Toggle current category
    if (isVisible) {
        drinkItems.style.display = 'none';
        element.classList.remove('active');
    } else {
        drinkItems.style.display = 'grid';
        element.classList.add('active');
    }
}

// Job Category Toggle Function
function toggleJobCategory(categoryTitle) {
    const jobDetails = categoryTitle.nextElementSibling;
    const icon = categoryTitle.querySelector('i');
    
    if (jobDetails.style.display === 'none') {
        jobDetails.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    } else {
        jobDetails.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Initialize all functionality
function init() {
    // Ensure page starts at top
    if (window.location.hash) {
        window.location.hash = '';
    }
    window.scrollTo(0, 0);
    
    // Check if events.json exists first
    console.log('Checking if events.json exists...'); // Debug log
    fetch('events.json', { method: 'HEAD' })
        .then(response => {
            console.log('events.json exists, status:', response.status); // Debug log
            loadEvents();
        })
        .catch(error => {
            console.error('events.json not found:', error); // Debug log
            console.log('Current directory structure might be different'); // Debug log
            loadEvents(); // Still try to load with multiple paths
        });
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize logo click handler
    initLogoClick();
    
    // Navbar scroll effect is handled by separate event listener below
    
    // Initialize intersection observer after events are loaded
    setTimeout(() => {
        initIntersectionObserver();
        initLazyLoading();
    }, 100);
    
    // Add resize listener for responsive slider
    window.addEventListener('resize', function() {
        // Debounce resize events
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(() => {
            console.log('Window resized, reinitializing slider');
            initEventsSlider();
        }, 250);
    });
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add error handling for video
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video');
    if (video) {
        // Primary video source (Dropbox)
        const primaryVideoSource = 'https://www.dropbox.com/scl/fi/3pxj7brbcowhlsohpa2z8/HeroVideo.m4v?rlkey=zweetvvak34i9f8ajtdgrotkv&st=rw3sbjiz&raw=1';
        
        // Fallback video sources if primary fails
        const fallbackVideoSources = [
            'https://static.videezy.com/system/resources/previews/000/000/168/original/Record.mp4',
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        ];
        
        let currentSourceIndex = 0;
        let hasTriedPrimary = false;
        
        // Set the primary video source
        video.src = primaryVideoSource;
        video.load();
        
        video.addEventListener('error', function() {
            console.log('Video failed to load, trying fallback sources...');
            
            if (!hasTriedPrimary) {
                // First try the primary source
                hasTriedPrimary = true;
                return;
            }
            
            currentSourceIndex++;
            if (currentSourceIndex < fallbackVideoSources.length) {
                // Try next fallback video source
                console.log('Trying fallback video source:', currentSourceIndex + 1);
                this.src = fallbackVideoSources[currentSourceIndex];
                this.load();
                this.play();
            } else {
                // All videos failed, use background image fallback
                console.log('All video sources failed, using background image fallback');
                this.style.display = 'none';
                const hero = document.querySelector('.hero');
                hero.style.backgroundImage = 'url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop)';
                hero.style.backgroundSize = 'cover';
                hero.style.backgroundPosition = 'center';
            }
        });
        
        // Handle successful video load
        video.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully');
            this.play().catch(function(error) {
                console.log('Video autoplay failed:', error);
                // If autoplay fails, try to play on user interaction
                document.addEventListener('click', function playVideo() {
                    video.play().then(() => {
                        document.removeEventListener('click', playVideo);
                    });
                }, { once: true });
            });
        });
        
        // Handle video can play event
        video.addEventListener('canplay', function() {
            console.log('Video can start playing');
        });
    }
});

// Add CSS for error and no-events states
const style = document.createElement('style');
style.textContent = `
    .error, .no-events {
        text-align: center;
        color: #cccccc;
        font-size: 1.1rem;
        grid-column: 1 / -1;
        padding: 2rem;
    }
    
    .error {
        color: #ff6b35;
    }
`;
document.head.appendChild(style); 

// Navbar Scroll Effect - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Set initial state
    navbar.style.background = 'transparent';
    navbar.style.backdropFilter = 'none';
    
    // Mobile Navigation Toggle
    console.log('Setting up mobile navigation...');
    console.log('navToggle:', navToggle);
    console.log('navLinks:', navLinks);
    
    navToggle.addEventListener('click', function() {
        console.log('Hamburger clicked!');
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            console.log('Menu opened');
        } else {
            document.body.style.overflow = 'auto';
            console.log('Menu closed');
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        if (window.scrollY === 0) {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.5)';
            navbar.style.backdropFilter = 'blur(15px)';
        }
    });
}); 

// Simple Events Slider - TWO BY TWO
let currentSlideIndex = 0;

// Initialize Events Slider
function initEventsSlider() {
    const eventsGrid = document.getElementById('eventsGrid');
    const sliderDots = document.getElementById('sliderDots');
    
    if (!eventsGrid || !sliderDots) return;
    
    const eventCards = eventsGrid.querySelectorAll('.event-card');
    const totalEvents = eventCards.length;
    
    console.log('Initializing slider with', totalEvents, 'events');
    
    // Generate dots for each event
    generateSliderDots(totalEvents);
    
    // Update navigation buttons
    updateSliderNavigation(totalEvents);
    
    // Set initial position
    updateSliderPosition();
}

// Generate slider dots - responsive: 2 events per slide on desktop, 1 on mobile
function generateSliderDots(totalEvents) {
    const sliderDots = document.getElementById('sliderDots');
    if (!sliderDots) return;
    
    sliderDots.innerHTML = '';
    
    // Responsive: 2 events per slide on desktop, 1 on mobile
    const eventsPerSlide = window.innerWidth <= 768 ? 1 : 2;
    const totalSlides = Math.ceil(totalEvents / eventsPerSlide);
    
    console.log('Generating dots for', totalSlides, 'slides (', eventsPerSlide, 'events per slide)');
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        sliderDots.appendChild(dot);
    }
}

// Update slider position
function updateSliderPosition() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;
    
    // Move to show the current slide (2 events per slide)
    const translateX = -(currentSlideIndex * 100);
    
    console.log('Moving to slide', currentSlideIndex, 'translateX:', translateX);
    
    eventsGrid.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    updateSliderDots();
    
    // Update navigation
    const eventCards = document.querySelectorAll('.event-card');
    updateSliderNavigation(eventCards.length);
}

// Update slider dots
function updateSliderDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

// Update slider navigation buttons
function updateSliderNavigation(totalEvents) {
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    
    // Responsive: 2 events per slide on desktop, 1 on mobile
    const eventsPerSlide = window.innerWidth <= 768 ? 1 : 2;
    const totalSlides = Math.ceil(totalEvents / eventsPerSlide);
    
    if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
    if (nextBtn) nextBtn.disabled = currentSlideIndex >= totalSlides - 1;
    
    console.log('Navigation updated:', { 
        currentSlideIndex, 
        totalEvents, 
        totalSlides,
        eventsPerSlide,
        prevDisabled: currentSlideIndex === 0, 
        nextDisabled: currentSlideIndex >= totalSlides - 1 
    });
}

// Go to specific slide
function goToSlide(slideIndex) {
    const eventCards = document.querySelectorAll('.event-card');
    const totalEvents = eventCards.length;
    const eventsPerSlide = window.innerWidth <= 768 ? 1 : 2;
    const totalSlides = Math.ceil(totalEvents / eventsPerSlide);
    
    currentSlideIndex = Math.max(0, Math.min(slideIndex, totalSlides - 1));
    console.log('Going to slide:', { slideIndex, currentSlideIndex, totalSlides, totalEvents, eventsPerSlide });
    
    updateSliderPosition();
}

// Slide events function - responsive: 2 events per slide on desktop, 1 on mobile
function slideEvents(direction) {
    const eventCards = document.querySelectorAll('.event-card');
    const totalEvents = eventCards.length;
    const eventsPerSlide = window.innerWidth <= 768 ? 1 : 2;
    const totalSlides = Math.ceil(totalEvents / eventsPerSlide);
    
    if (direction === 'prev' && currentSlideIndex > 0) {
        currentSlideIndex--;
    } else if (direction === 'next' && currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
    }
    
    console.log('Sliding events:', { direction, currentSlideIndex, totalSlides, totalEvents, eventsPerSlide });
    
    updateSliderPosition();
} 