document.addEventListener('DOMContentLoaded', function() {
    const licenseFilterBtns = document.querySelectorAll('.license-filter-btn');
    const licenseCards = document.querySelectorAll('.license-card');
    
    // Initial animation for all cards
    licenseCards.forEach(card => {
        card.classList.add('show');
    });

    // Filter functionality
    licenseFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            licenseFilterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-license-filter');

            // First, handle all cards that should be hidden
            licenseCards.forEach(card => {
                const category = card.getAttribute('data-license-category');
                if (filter !== 'all' && category !== filter) {
                    card.classList.remove('show');
                    card.style.display = 'none';
                }
            });

            // Then, handle all cards that should be shown
            licenseCards.forEach(card => {
                const category = card.getAttribute('data-license-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    // Small delay to ensure display property is set before animation
                    requestAnimationFrame(() => {
                        card.classList.add('show');
                    });
                }
            });
        });
    });
}); 