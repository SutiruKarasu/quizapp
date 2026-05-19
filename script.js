// --- 1. Multilingual JSON Logic ---
let translations = {};

fetch('lang.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        setLanguage('en'); // Standardsprache
    })
    .catch(error => console.error('Error loading lang.json:', error));

document.getElementById('lang-select').addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// --- 2. Custom Cursor Fluid Logic ---
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

function setupCursorListeners() {
    document.querySelectorAll('a, button, .album-card, select, .close-modal').forEach(item => {
        item.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}
// Initial ausführen
setupCursorListeners();

// --- 3. Scroll Intersection Observer (Fade-In) ---
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// --- 4. Portfolio Album Core & Masonry Injector ---
const albumData = {
    spring: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
        'https://images.unsplash.com/photo-1550614000-4b95d466f251?w=800',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800'
    ],
    vogue: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800',
        'https://images.unsplash.com/photo-1506422748879-887454f9cdff?w=800',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800'
    ],
    street: [
        'https://images.unsplash.com/photo-1529139574466-a303027c028b?w=800',
        'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
        'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=800'
    ]
};

const modal = document.getElementById('album-modal');
const modalGallery = document.getElementById('modal-gallery');

function openAlbum(albumId) {
    modalGallery.innerHTML = '';
    
    albumData[albumId].forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Fashion Photography Tatiana Lumos';
        modalGallery.appendChild(img);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Da neue Elemente (Schließen-Button / Bilder) sichtbar sind, Cursor-Listener updaten
    setupCursorListeners();
}

function closeAlbum() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeAlbum();
    }
}
