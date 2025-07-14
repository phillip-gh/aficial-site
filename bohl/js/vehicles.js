document.addEventListener('DOMContentLoaded', function() {
    const vehicleFilterBtns = document.querySelectorAll('.filter-btn');
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    
    // Initial animation for all cards
    vehicleCards.forEach(card => {
        card.classList.add('show');
    });

    // Filter functionality
    vehicleFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            vehicleFilterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // First, handle all cards that should be hidden
            vehicleCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter !== 'all' && category !== filter) {
                    card.classList.remove('show');
                    card.style.display = 'none';
                }
            });

            // Then, handle all cards that should be shown
            vehicleCards.forEach(card => {
                const category = card.getAttribute('data-category');
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