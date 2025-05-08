const slides = [
  './Images/IMG_003.webp',
  './Images/IMG_004.webp',
  './Images/IMG_005.webp',
  './Images/IMG_006.webp'
];

let currentIndex = 0;
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const gallery = document.getElementById('gallery');

// Load gallery images (za gallery.html)
if (gallery) {
  const gallerySlides = [
    './Images/IMG_001.webp', './Images/IMG_002.webp', './Images/IMG_003.webp',
    './Images/IMG_004.webp', './Images/IMG_005.webp', './Images/IMG_006.webp',
    './Images/IMG_007.webp', './Images/IMG_008.webp', './Images/IMG_009.webp',
    './Images/IMG_010.webp', './Images/IMG_011.webp', './Images/IMG_012.webp',
    './Images/IMG_013.webp', './Images/IMG_014.webp', './Images/IMG_015.webp',
    './Images/IMG_016.webp', './Images/IMG_017.webp', './Images/IMG_018.webp',
    './Images/IMG_019.webp', './Images/IMG_020.webp', './Images/IMG_021.webp',
    './Images/IMG_022.webp', './Images/IMG_023.webp', './Images/IMG_024.webp',
    './Images/IMG_025.webp', './Images/IMG_026.webp', './Images/IMG_027.webp',
    './Images/IMG_028.webp', './Images/IMG_029.webp', './Images/IMG_030.webp',
    './Images/IMG_031.webp', './Images/IMG_032.webp', './Images/IMG_033.webp',
    './Images/IMG_034.webp', './Images/IMG_035.webp', './Images/IMG_036.webp',
    './Images/IMG_037.webp', './Images/IMG_038.webp', './Images/IMG_039.webp',
    './Images/IMG_040.webp', './Images/IMG_041.webp', './Images/IMG_042.webp',
    './Images/IMG_043.webp', './Images/IMG_044.webp', './Images/logo_1.webp'
  ];
  gallerySlides.forEach((slide, index) => {
    const img = document.createElement('img');
    img.src = slide;
    const altText = slide.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace("./Images/", "");
    img.alt = altText;
    img.loading = 'lazy';
    img.classList.add('hover-glow');
    img.onclick = () => openModal(index, gallerySlides);
    gallery.appendChild(img);
  });
}

// Modal functions for gallery
function openModal(index, slideArray = slides) {
  if (modal && modalImage) {
    currentIndex = index;
    modalImage.src = slideArray[index];
    const altText = slideArray[index].replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace("./Images/", "");
    modalImage.alt = altText;
    modal.classList.add('show');
    modalImage.focus();
  }
}

function closeModal() {
  if (modal) {
    modal.classList.remove('show');
  }
}

function changeImage(direction) {
  if (modal && modalImage) {
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    modalImage.src = slides[currentIndex];
    const altText = slides[currentIndex].replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace("./Images/", "");
    modalImage.alt = altText;
  }
}

// Keyboard navigation for gallery modal
document.addEventListener('keydown', (e) => {
  if (modal && modal.classList.contains('show')) {
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'Escape') closeModal();
  }
});

// External link modal handling
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing external link modal');
  const externalLinkBtn = document.getElementById('external-link-btn');
  const externalLinkModal = document.getElementById('external-link-modal');
  const externalLinkContinue = document.getElementById('external-link-continue');
  const externalLinkCancel = document.getElementById('external-link-cancel');

  if (!externalLinkBtn || !externalLinkModal || !externalLinkContinue || !externalLinkCancel) {
    console.error('External link modal elements missing:', {
      externalLinkBtn: !!externalLinkBtn,
      externalLinkModal: !!externalLinkModal,
      externalLinkContinue: !!externalLinkContinue,
      externalLinkCancel: !!externalLinkCancel
    });
    return;
  }

  console.log('External link modal elements found');
  externalLinkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const url = externalLinkBtn.getAttribute('data-url');
    console.log('External link button clicked, URL:', url);
    if (url) {
      externalLinkContinue.setAttribute('href', url);
      console.log('Set href on continue button:', externalLinkContinue.getAttribute('href'));
      externalLinkModal.classList.remove('hidden');
      console.log('Modal opened, classList:', externalLinkModal.classList);
      externalLinkModal.focus();
    } else {
      console.error('External link URL is missing');
    }
  });

  externalLinkContinue.addEventListener('click', () => {
    console.log('Continue button clicked, redirecting to:', externalLinkContinue.getAttribute('href'));
    externalLinkModal.classList.add('hidden');
  });

  externalLinkCancel.addEventListener('click', () => {
    console.log('Cancel button clicked');
    externalLinkModal.classList.add('hidden');
  });

  // Close modal on outside click
  externalLinkModal.addEventListener('click', (e) => {
    if (e.target === externalLinkModal) {
      console.log('Modal closed by clicking outside');
      externalLinkModal.classList.add('hidden');
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !externalLinkModal.classList.contains('hidden')) {
      console.log('Modal closed by Escape key');
      externalLinkModal.classList.add('hidden');
    }
  });
});

// Cookie Consent Handling
document.addEventListener('DOMContentLoaded', () => {
  const cookieConsent = document.getElementById('cookie-consent');
  const acceptCookies = document.getElementById('accept-cookies');
  const declineCookies = document.getElementById('decline-cookies');
  const tiktokFeed = document.getElementById('sk-tiktok-feed');
  const tiktokFallback = document.getElementById('tiktok-fallback');

  if (cookieConsent && acceptCookies && declineCookies) {
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
      cookieConsent.classList.remove('hidden');
    }

    acceptCookies.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieConsent.classList.add('hidden');
      // Load TikTok feed
      if (tiktokFeed) {
        console.log('Cookies accepted, loading SociableKit TikTok feed');
        tiktokFeed.classList.remove('hidden');
        tiktokFallback.classList.add('hidden');
        // Trigger widget load if necessary
        const script = document.createElement('script');
        script.src = 'https://widgets.sociablekit.com/tiktok-feed/widget.js';
        script.async = true;
        document.body.appendChild(script);
      }
    });

    declineCookies.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieConsent.classList.add('hidden');
      // Show fallback if TikTok feed is blocked
      if (tiktokFeed && tiktokFallback) {
        console.log('Cookies declined, showing TikTok fallback');
        tiktokFeed.classList.add('hidden');
        tiktokFallback.classList.remove('hidden');
      }
    });
  }

  // Check if SociableKit TikTok feed loaded successfully
  if (tiktokFeed && tiktokFallback) {
    const checkFeedLoaded = () => {
      const feedContent = tiktokFeed.querySelector('.sk-ww-tiktok-feed');
      if (feedContent && feedContent.children.length > 0) {
        console.log('SociableKit TikTok feed loaded successfully');
        tiktokFeed.classList.remove('hidden');
        tiktokFallback.classList.add('hidden');
      } else {
        console.error('SociableKit TikTok feed failed to load');
        tiktokFeed.classList.add('hidden');
        tiktokFallback.classList.remove('hidden');
      }
    };

    // Check after a delay to allow widget to load
    setTimeout(checkFeedLoaded, 5000);

    // Re-check on script load
    const widgetScript = document.querySelector('script[src="https://widgets.sociablekit.com/tiktok-feed/widget.js"]');
    if (widgetScript) {
      widgetScript.addEventListener('load', checkFeedLoaded);
    }
  }
});

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (form && formMessage) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (!name || !email || !message) {
        formMessage.textContent = 'Molimo popunite sva obavezna polja!';
        formMessage.classList.add('text-red-600');
        return;
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });

        if (response.ok) {
          formMessage.textContent = 'Poruka je uspešno poslata! Uskoro ćemo vam se javiti.';
          formMessage.classList.remove('text-red-600');
          formMessage.classList.add('text-green-600');
          form.reset();
        } else {
          const error = await response.json();
          formMessage.textContent = 'Došlo je do greške. Pokušajte ponovo ili nas kontaktirajte direktno.';
          formMessage.classList.add('text-red-600');
          console.error('Formspree error:', error);
        }
      } catch (err) {
        formMessage.textContent = 'Došlo je do greške. Proverite internet vezu ili nas kontaktirajte direktno.';
        formMessage.classList.add('text-red-600');
        console.error('Network error:', err);
      }
    });
  }
});

// Fade-in animacije prilikom skrolovanja
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = '0.2s';
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
});