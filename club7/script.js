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
                "title": "Ü30 LADIES EDITION",
                "description": "Ein besonderes Event für alle über 30. Genießen Sie entspannte Musik, gute Gespräche und eine angenehme Atmosphäre in unserem Club.",
                "date": "2025-08-30",
                "time": "22:00",
                "image": "Images/Events/ue30Event.jpg",
                "ticketUrl": "#",
                "category": "UE30"
            },
            {
                "id": 2,
                "title": "Ü30 PARTY",
                "description": "Die große UE30 Party! Feiern Sie mit Gleichgesinnten in einer exklusiven Atmosphäre. Live-Musik, Cocktails und unvergessliche Momente.",
                "date": "2025-08-09",
                "time": "22:00",
                "image": "Images/Events/ue30PartyEvent.jpg",
                "ticketUrl": "#",
                "category": "UE30 Party"
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
                <div class="event-content">
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                    <div class="event-date">
                        <div class="date-left">
                            <div class="date-day">${dateInfo.day}</div>
                            <div class="date-month">${dateInfo.month}</div>
                            <div class="date-weekday">${dateInfo.weekday}</div>
                        </div>
                        <div class="date-right">
                            <div class="date-title">${event.title}</div>
                            <div class="date-time">${event.time} Uhr</div>
                        </div>
                    </div>
                    <a href="lounge-reservierung.html" class="event-ticket">Lounge reservieren</a>
                </div>
            </div>
        `;
    }).join('');

    console.log('Setting innerHTML with events'); // Debug log
    eventsGrid.innerHTML = eventsHTML;
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

// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
}

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
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initialize intersection observer after events are loaded
    setTimeout(() => {
        initIntersectionObserver();
        initLazyLoading();
    }, 100);
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
        // Try multiple video sources if one fails
        const videoSources = [
            'https://static.videezy.com/system/resources/previews/000/000/168/original/Record.mp4',
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        ];
        
        let currentSourceIndex = 0;
        
        video.addEventListener('error', function() {
            currentSourceIndex++;
            if (currentSourceIndex < videoSources.length) {
                // Try next video source
                this.src = videoSources[currentSourceIndex];
                this.load();
                this.play();
            } else {
                // All videos failed, use background image fallback
                this.style.display = 'none';
                const hero = document.querySelector('.hero');
                hero.style.backgroundImage = 'url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop)';
                hero.style.backgroundSize = 'cover';
                hero.style.backgroundPosition = 'center';
            }
        });
        
        // Also handle load event to ensure video plays
        video.addEventListener('loadeddata', function() {
            this.play().catch(function(error) {
                console.log('Video autoplay failed:', error);
            });
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