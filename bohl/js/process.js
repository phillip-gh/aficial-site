document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.process-filters .license-filter-btn');
    const timelines = document.querySelectorAll('.process-timeline');

    // Function to handle filtering
    function filterProcesses(category) {
        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-process-filter') === category) {
                btn.classList.add('active');
            }
        });

        // Show/hide timelines
        timelines.forEach(timeline => {
            if (timeline.getAttribute('data-process-category') === category) {
                timeline.style.display = 'block';
            } else {
                timeline.style.display = 'none';
            }
        });
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-process-filter');
            filterProcesses(category);
            button.blur();
        });
    });

    // Initialize with Klasse B
    filterProcesses('B');
}); 