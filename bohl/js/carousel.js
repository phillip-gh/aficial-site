class ReviewCarousel {
    constructor() {
        this.reviews = [
            {
                name: "Pascal Blum",
                rating: 5,
                text: "Super Fahrschule! Mein Zeitplan hat oft nur morgens Fahrstunden zugelassen, konnte aber alles super organisiert werden. Udo hat mir das Fahren richtig gut beigebracht und mich in meiner Situation bestens unterstützt. Richtig gutes Miteinander. Vielen Dank!", 
                timeAgo: "vor 4 Monaten"
            },
            {
                name: "Mika",
                rating: 5,
                text: "Also ich kann die Fahrschule nur weiterempfehlen. Der Udo und die Antje sind beide sehr lieb und bereiten einen auch sehr gut auf die Prüfung vor und kann aus persönlicher Erfahrung nur positives über die Fahrschule berichten. Habe heute direkt beim ersten Mal bestanden und bin sehr dankbar👍 Viele Grüße Mika", 
                timeAgo: "vor 2 Monaten"
            },
            {
                name: "Andreas Jäger",
                rating: 5,
                text: "Habe bei der Fahrschule Bohl meinen Führerschein auf BE erweitert. Mit Udo, meinem sehr freundlichen Fahrlehrer verging die Zeit im Auto auch immer wie im Flug. Und eben dem bestandenen Führerschein, gab es noch verschiedene Tipps für die spätere Praxis. Vielen Dank!", 
                timeAgo: "vor einem Monat"
            },
            {
                name: "Jesaja Bu",
                rating: 5,
                text: "Ich bin überglücklich, mich für diese Fahrschule entschieden zu haben! Von Anfang an war die Betreuung großartig. Die Anmeldung war unkompliziert, und Udo&Antje waren immer freundlich und hilfsbereit. Mein Fahrlehrerin Antje hat eine unglaubliche Geduld bewiesen und hat es verstanden, mir jede Unsicherheit zu nehmen.",
                timeAgo: "vor 6 Monaten"
            },
            {
                name: "Maurice Smusz",
                rating: 5,
                text: "Ich hab meinen Führerschein Klasse B gestern erfolgreich absolviert. Ich bedanke mich für die tolle Unterstützung und Geduld von Udo & Antje. Es war eine sehr schöne Zeit mit zwei tollen Fahrlehrern. Ich kann die Fahrschule Bohl im Raum Göppingen nur empfehlen",
                timeAgo: "vor 8 Monaten"
            },
            {
                name: "JJ",
                rating: 5,
                text: "Die beste Fahrschule im Kreis Göppingen. Antje & Udo machen einen bemerkenswerten Job. 💪💥 Du suchst noch eine Fahrschule? Ich kann dir Fahrschule Bohl wärmstens und mit gutem Gewissen empfehlen. 🤝",
                timeAgo: "vor 7 Monaten"
            },
            {
                name: "Matthias Kruppa",
                rating: 5,
                text: "Top Fahrschule! Habe meinen A1 und B, bei Antje und Udo gemacht, und werde auch meine zukünftigen Führerscheine dort absolvieren. Die günstigste Fahrschule im Landkreis Göppingen. Ich bedanke mich bei Udo und Antje für die lehrreichen und auch witzigen Fahrstunden :)",
                timeAgo: "vor 10 Monaten"
            },
            {
                name: "Alex K",
                rating: 5,
                text: "Eine super Fahrschule für Jedermann. Udo ist ein toller Fahrlehrer der auf die persönlichen Schwächen des Fahrschülers eingeht und diese mit sinnvollen Tipps korrigiert. Er bringt nicht nur das Wissen mit, sondern auch eine Menge Geduld.",
                timeAgo: "vor einem Jahr"
            }
        ];
        
        this.currentIndex = 0;
        this.carousel = document.querySelector('.reviews-carousel');
        this.interval = null;
        
        this.init();
    }
    
    getInitial(name) {
        return name.split(' ')[0][0];
    }

    getColorClass(index) {
        return `profile-color-${(index % 5) + 1}`;
    }

    truncateText(text, limit = 170) {
        if (text.length <= limit) return text;
        return text.substring(0, limit).trim() + '...';
    }
    
    init() {
        this.renderCarousel();
        this.startAutoRotation();
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoRotation());
        this.carousel.addEventListener('mouseleave', () => this.startAutoRotation());
    }
    
    renderCarousel() {
        // Add navigation dots first
        const nav = document.createElement('div');
        nav.className = 'carousel-nav';
        
        this.reviews.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToReview(index));
            nav.appendChild(dot);
        });
        
        this.carousel.appendChild(nav);

        // Create reviews container
        const reviewsContainer = document.createElement('div');
        reviewsContainer.className = 'reviews-container';
        
        // Add navigation arrows
        const prevButton = document.createElement('button');
        prevButton.className = 'carousel-arrow prev';
        prevButton.innerHTML = '&lt;';
        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prevReview();
        });
        
        const nextButton = document.createElement('button');
        nextButton.className = 'carousel-arrow next';
        nextButton.innerHTML = '&gt;';
        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextReview();
        });
        
        this.carousel.appendChild(prevButton);
        this.carousel.appendChild(nextButton);
        
        // Add reviews
        this.reviews.forEach((review, index) => {
            const reviewElement = document.createElement('div');
            reviewElement.className = `review ${index === 0 ? 'active' : ''}`;
            
            const stars = '★'.repeat(review.rating);
            const initial = this.getInitial(review.name);
            const colorClass = this.getColorClass(index);
            const truncatedText = this.truncateText(review.text);
            const needsExpansion = review.text.length > 170;
            
            reviewElement.innerHTML = `
                <div class="review-content">
                    <div class="reviewer-header">
                        <div class="reviewer-info">
                            <div class="profile-circle ${colorClass}">${initial}</div>
                            <div class="reviewer-details">
                                <div class="reviewer-name">${review.name}</div>
                                <div class="reviewer-meta">
                                    <span class="review-time">${review.timeAgo}</span>
                                </div>
                            </div>
                        </div>
                        <div class="stars">${stars}</div>
                    </div>
                    <div class="review-text-container">
                        <p class="review-text">${truncatedText}</p>
                        ${needsExpansion ? `
                            <button class="expand-review">Mehr</button>
                            <div class="full-review" style="display: none;">
                                <p class="review-text">${review.text}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;

            if (needsExpansion) {
                const expandButton = reviewElement.querySelector('.expand-review');
                const fullReview = reviewElement.querySelector('.full-review');
                const truncatedReview = reviewElement.querySelector('.review-text');

                expandButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (fullReview.style.display === 'none') {
                        truncatedReview.style.display = 'none';
                        fullReview.style.display = 'block';
                        expandButton.textContent = 'Weniger';
                    } else {
                        truncatedReview.style.display = 'block';
                        fullReview.style.display = 'none';
                        expandButton.textContent = 'Mehr';
                    }
                });
            }
            
            reviewsContainer.appendChild(reviewElement);
        });
        
        this.carousel.appendChild(reviewsContainer);
    }
    
    startAutoRotation() {
        this.interval = setInterval(() => {
            this.nextReview();
        }, 5000);
    }
    
    stopAutoRotation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    goToReview(index, direction = 'right') {
        const reviews = document.querySelectorAll('.review');
        const dots = document.querySelectorAll('.carousel-dot');
        const currentReview = reviews[this.currentIndex];
        const nextReview = reviews[index];
        
        // Entferne alte Klassen
        reviews.forEach(review => {
            review.classList.remove('slide-left', 'slide-right');
        });

        // Setze die Ausgangsposition für die neue Bewertung
        nextReview.style.display = 'block';
        nextReview.classList.add(direction === 'right' ? 'slide-right' : 'slide-left');
        
        // Force reflow
        void nextReview.offsetWidth;
        
        // Slide-Animation für aktuelle Bewertung
        currentReview.classList.add(direction === 'right' ? 'slide-left' : 'slide-right');
        currentReview.classList.remove('active');
        
        // Slide-Animation für neue Bewertung
        nextReview.classList.add('active');
        nextReview.classList.remove('slide-left', 'slide-right');
        
        // Update dots
        dots[this.currentIndex].classList.remove('active');
        dots[index].classList.add('active');
        
        // Update current index
        this.currentIndex = index;
        
        // Nach der Animation cleanup
        setTimeout(() => {
            reviews.forEach(review => {
                if (!review.classList.contains('active')) {
                    review.style.display = 'none';
                }
            });
        }, 500);
    }
    
    prevReview() {
        const newIndex = (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
        this.goToReview(newIndex, 'left');
    }
    
    nextReview() {
        const newIndex = (this.currentIndex + 1) % this.reviews.length;
        this.goToReview(newIndex, 'right');
    }
}

// Initialisiere das Karussell wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    new ReviewCarousel();
}); 