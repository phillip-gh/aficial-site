document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.process-filters .license-filter-btn');
    const timelines = document.querySelectorAll('.process-timeline');
    const processSection = document.querySelector('.process-section');

    // Speichere die ursprüngliche Scroll-Position
    let originalScrollY = window.scrollY;
    let originalScrollX = window.scrollX;
    let isProcessingClick = false;

    // Überwache Scroll-Änderungen und stelle sie sofort wieder her
    let scrollRestoreTimeout;
    function restoreScrollPosition() {
        if (isProcessingClick) {
            clearTimeout(scrollRestoreTimeout);
            scrollRestoreTimeout = setTimeout(() => {
                window.scrollTo(originalScrollX, originalScrollY);
            }, 0);
        }
    }

    // Event-Listener für Scroll-Änderungen
    window.addEventListener('scroll', restoreScrollPosition);

    // Globaler Event-Listener für die gesamte process-section
    if (processSection) {
        processSection.addEventListener('click', (e) => {
            // Wenn ein Button in der process-section geklickt wird
            if (e.target.classList.contains('license-filter-btn')) {
                // Verhindere alle anderen Event-Listener
                e.stopImmediatePropagation();
                e.preventDefault();
                
                // Markiere, dass wir einen Klick verarbeiten
                isProcessingClick = true;
                
                // Speichere die aktuelle Scroll-Position
                originalScrollY = window.scrollY;
                originalScrollX = window.scrollX;
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');

                const filter = e.target.getAttribute('data-process-filter');

                // Show/hide timelines
                timelines.forEach(timeline => {
                    const category = timeline.getAttribute('data-process-category');
                    if (category === filter) {
                        timeline.style.display = 'block';
                    } else {
                        timeline.style.display = 'none';
                    }
                });
                
                // Verhindere Focus
                e.target.blur();
                
                // Stelle die Scroll-Position sofort wieder her
                requestAnimationFrame(() => {
                    window.scrollTo(originalScrollX, originalScrollY);
                });
                
                // Mehrfache Wiederherstellung der Scroll-Position
                setTimeout(() => {
                    window.scrollTo(originalScrollX, originalScrollY);
                }, 10);
                
                setTimeout(() => {
                    window.scrollTo(originalScrollX, originalScrollY);
                }, 50);
                
                setTimeout(() => {
                    window.scrollTo(originalScrollX, originalScrollY);
                }, 100);
                
                setTimeout(() => {
                    window.scrollTo(originalScrollX, originalScrollY);
                }, 200);
                
                // Beende die Verarbeitung nach 300ms
                setTimeout(() => {
                    isProcessingClick = false;
                }, 300);
                
                return false;
            }
        }, true); // capture phase
        
        // Verhindere auch alle anderen Events in der process-section
        processSection.addEventListener('focus', (e) => {
            if (e.target.classList.contains('license-filter-btn')) {
                e.preventDefault();
                e.stopPropagation();
                e.target.blur();
                return false;
            }
        }, true);
        
        processSection.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('license-filter-btn')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);
        
        processSection.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('license-filter-btn') && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);
    }
}); 