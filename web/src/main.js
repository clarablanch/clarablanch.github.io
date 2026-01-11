/* ==========================================
   Language Switcher
   ========================================== */
// Dictionary for translations
const translations = {
    en: {
        title: 'artfolio en clarobscur',
        text: 'text',
        image: 'image'
    },
    cat: {
        title: 'artfolio el clarobscur',
        text: 'text',
        image: 'imatge'
    }
};

function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const selectedLang = btn.getAttribute('data-lang');
            updateContent(selectedLang);
        });
    });
}

function updateContent(lang) {
    // Update title
    const title = document.querySelector('.main-title span');
    if (title) {
        title.textContent = translations[lang].title;
        splitTextIntoChars(title);
    }
    
    // Update translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.style.opacity = 0;
            setTimeout(() => {
                element.textContent = translations[lang][key];
                element.style.opacity = 1;
            }, 200);
        }
    });
}

/* ==========================================
   Character Split Animation
   ========================================== */
function splitTextIntoChars(element) {
    const text = element.textContent;
    element.textContent = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${index * 0.03}s`;
        element.appendChild(span);
    });
}

/* ==========================================
   3D Concave Carousel Animation
   ========================================== */
const items = document.querySelectorAll('.carousel-item');
const speed = 0.12;
let progress = 0;

function animateCarousel() {
    progress += speed;
    
    const totalItems = items.length;
    
    items.forEach((item, index) => {
        const offset = (index * (100 / totalItems));
        let itemPos = (progress + offset) % 100;
        
        // Map 0..100 to 1..-1 (right to left)
        let nPos = 1 - (itemPos / 50); 
        
        // Distance from center
        const dist = Math.abs(nPos);
        
        // X Position (horizontal spread)
        const x = nPos * 60; 
        
        // Z Position (depth) - edges close, center far
        const z = (dist * 400) - 300;
        
        // Scale - edges big, center small
        const scale = 0.6 + (dist * 0.4);
        
        // Rotation - rotate inwards
        const rotateY = -nPos * 30;
        
        // Opacity - fade at edges
        const opacity = dist > 0.9 ? 1 - ((dist - 0.9) * 10) : 1;
        
        // Z-Index - edges on top
        const zIndex = Math.round(dist * 100);

        item.style.transform = `
            translate3d(${x}vw, 0, ${z}px) 
            rotateY(${rotateY}deg) 
            scale(${scale})
        `;
        item.style.opacity = opacity;
        item.style.zIndex = zIndex;
    });

    requestAnimationFrame(animateCarousel);
}

/* ==========================================
   Initialize on Page Load
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const titleSpan = document.querySelector('[data-split="char"]');
    if (titleSpan) {
        splitTextIntoChars(titleSpan);
    }
    
    initLanguageSwitcher();
    animateCarousel();
    
    // Video hover functionality
    const imageWord = document.querySelector('.word-image');
    const video = document.querySelector('.hover-video');
    
    if (imageWord && video) {
        imageWord.addEventListener('mouseenter', () => {
            video.play();
        });
        
        imageWord.addEventListener('mouseleave', () => {
            video.pause();
        });
    }
});
