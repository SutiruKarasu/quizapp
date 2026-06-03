const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    }
});


const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerBtn.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}


let translations = {};


fetch('lang.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        

        const savedLang = localStorage.getItem('userLang');
        const browserLang = navigator.language.split('-')[0]; // z.B. 'cs' von 'cs-CZ'
        

        const initialLang = savedLang || (translations[browserLang] ? browserLang : 'en');
        
        setLanguage(initialLang);
        document.getElementById('lang-select').value = initialLang;
    })
    .catch(error => console.error('Error loading lang.json:', error));

document.getElementById('lang-select').addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    // Sprache speichern, damit sie beim nächsten Besuch erhalten bleibt
    localStorage.setItem('userLang', selectedLang);
});

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key]; 
        }
    });
}


const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

function setupCursorListeners() {
    document.querySelectorAll('a, button, .swiper-slide, select, .close-modal, .lightbox-close, .modal-content img, .slider-btn, .info-btn').forEach(item => {
        item.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}
setupCursorListeners();


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});


const albumData = {
    spring: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
        'https://images.unsplash.com/photo-1550614000-4b95d466f251?w=1200',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200'
    ],
    vogue: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200',
        'https://images.unsplash.com/photo-1506422748879-887454f9cdff?w=1200',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200'
    ],
    street: [
        'https://images.unsplash.com/photo-1529139574466-a303027c028b?w=1200',
        'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
        'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=1200'
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
        img.loading = 'lazy'; 
        
        img.addEventListener('click', () => openLightbox(imgSrc));
        modalGallery.appendChild(img);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
    setupCursorListeners(); 
}


window.openAlbum = openAlbum; 

function closeAlbum() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}


const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

window.onclick = function(event) {
    if (event.target == lightbox) {
        closeLightbox();
    } else if (event.target == modal) {
        closeAlbum();
    } else if (event.target == infoModal) {
        closeInfoModal();
    }
}


const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.innerHTML = `
            <div style="text-align: center; padding: 2rem 0; animation: fadeIn 0.8s forwards;">
                <h3 style="font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 1rem;">Thank You!</h3>
                <p style="color: var(--text-muted);">Your message has been received. I will get back to you shortly.</p>
            </div>
        `;
    });
}


const albumSwiper = new Swiper('.album-swiper', {
    loop: true,                  
    slidesPerView: 'auto',      
    spaceBetween: 40,           
    centeredSlides: true,       
    speed: 600,                 
    navigation: {
        nextEl: '.next-btn',    
        prevEl: '.prev-btn',
    },

    preventClicks: true,
    preventClicksPropagation: true
});

const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    initialCountry: "cz",
    separateDialCode: true
});


const infoBtn = document.getElementById('info-btn');
const infoModal = document.getElementById('info-modal');
const closeInfo = document.getElementById('close-info');

infoBtn.addEventListener('click', () => {
    infoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

function closeInfoModal() {
    infoModal.style.display = 'none';
    if (!modal.style.display || modal.style.display === 'none') {
        document.body.style.overflow = 'auto';
    }
}

closeInfo.addEventListener('click', closeInfoModal);


const logoImage = document.querySelector('.logo-img');
const flashOverlay = document.getElementById('camera-flash');

if (logoImage && flashOverlay) {
    logoImage.addEventListener('click', (e) => {
       
        flashOverlay.classList.add('flash-active');
        
        
        setTimeout(() => {
            flashOverlay.classList.remove('flash-active');
        }, 100);
    });
}


const readMoreBtn = document.getElementById('read-more-btn');
const aboutMoreContent = document.getElementById('about-more');

if (readMoreBtn && aboutMoreContent) {
    readMoreBtn.addEventListener('click', () => {
        aboutMoreContent.classList.toggle('expanded');
        
        
        if (aboutMoreContent.classList.contains('expanded')) {
            readMoreBtn.textContent = 'Read Less';
        } else {
            readMoreBtn.textContent = 'Read More';
        }
    });
}
