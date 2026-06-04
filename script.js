// =========================================
// CUSTOM CURSOR
// =========================================
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, input, textarea, select, .portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// =========================================
// NAVBAR SCROLL EFFECT
// =========================================
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// =========================================
// MOBILE MENU TOGGLE
// =========================================
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Hamburger Icon Animation
        hamburger.classList.toggle('is-active');
    });

    // Menü schließen, wenn ein Link geklickt wird
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('is-active');
        });
    });
}

// =========================================
// FADE-IN SCROLL ANIMATION
// =========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// =========================================
// TRANSLATION LOGIC (i18n)
// =========================================
let translations = {};

// Lade die JSON Datei
fetch('lang.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        // Standardmäßig auf Englisch (oder der Browsersprache)
        const userLang = navigator.language || navigator.userLanguage;
        const defaultLang = userLang.startsWith('cs') ? 'cs' : userLang.startsWith('ru') ? 'ru' : 'en';
        
        const langSelect = document.getElementById('lang-select');
        if (langSelect) {
            langSelect.value = defaultLang;
            changeLanguage(defaultLang);
            
            // Event Listener für das Dropdown
            langSelect.addEventListener('change', (e) => {
                changeLanguage(e.target.value);
            });
        } else {
            changeLanguage(defaultLang);
        }
    })
    .catch(error => console.error('Error loading translations:', error));

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Falls es sich um HTML handelt (z.B. wegen <strong> oder <br>)
            el.innerHTML = translations[lang][key];
        }
    });

    // Button-Text "Read More" bei Sprachwechsel updaten, falls er gerade offen/zu ist
    const aboutMoreContent = document.getElementById('about-more');
    const readMoreBtn = document.getElementById('read-more-btn');
    if (aboutMoreContent && readMoreBtn) {
        if (aboutMoreContent.classList.contains('expanded')) {
            readMoreBtn.innerHTML = translations[lang]?.btn_read_less || 'Read Less';
            readMoreBtn.setAttribute('data-i18n', 'btn_read_less');
        } else {
            readMoreBtn.innerHTML = translations[lang]?.btn_read_more || 'Read More';
            readMoreBtn.setAttribute('data-i18n', 'btn_read_more');
        }
    }
}

// =========================================
// ABOUT ME - READ MORE BUTTON
// =========================================
const readMoreBtn = document.getElementById('read-more-btn');
const aboutMoreContent = document.getElementById('about-more');

if (readMoreBtn && aboutMoreContent) {
    readMoreBtn.addEventListener('click', () => {
        aboutMoreContent.classList.toggle('expanded');
        
        // Aktuell gewählte Sprache auslesen
        const langSelect = document.getElementById('lang-select');
        const currentLang = langSelect ? langSelect.value : 'en';
        
        if (aboutMoreContent.classList.contains('expanded')) {
            readMoreBtn.innerHTML = translations[currentLang]?.btn_read_less || 'Read Less';
            readMoreBtn.setAttribute('data-i18n', 'btn_read_less');
        } else {
            readMoreBtn.innerHTML = translations[currentLang]?.btn_read_more || 'Read More';
            readMoreBtn.setAttribute('data-i18n', 'btn_read_more');
        }
    });
}

// =========================================
// MODAL LOGIC (IMPRESSUM)
// =========================================
const modal = document.getElementById('info-modal');
const openBtn = document.getElementById('open-info');
const closeBtn = document.getElementById('close-info');

if (modal && openBtn && closeBtn) {
    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}
