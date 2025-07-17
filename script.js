let currentSlideArray = [];
let currentIndex = 0;
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const gallery = document.getElementById('gallery');

// Load gallery images (za gallery.html)
if (gallery) {

  // PAGINATION SETTINGS
  const IMAGES_PER_PAGE = 12;
  let galleryData = [];
  let currentPage = 1;
  let totalPages = 1;
  const paginationContainer = document.getElementById('gallery-pagination');

  // Fetch gallery.json and render gallery
  fetch('gallery.json')
    .then(res => res.json())
    .then(data => {
      galleryData = data;
      totalPages = Math.ceil(galleryData.length / IMAGES_PER_PAGE);
      renderGalleryPage(currentPage);
    })
    .catch(err => {
      gallery.innerHTML = '<p class="text-red-600">Greška pri učitavanju galerije.</p>';
      if (paginationContainer) paginationContainer.innerHTML = '';
      console.error('Greška pri učitavanju gallery.json:', err);
    });

  function renderGalleryPage(page) {
    gallery.innerHTML = '';
    const start = (page - 1) * IMAGES_PER_PAGE;
    const end = start + IMAGES_PER_PAGE;
    const pageImages = galleryData.slice(start, end);
    pageImages.forEach((imgObj, idx) => {
      const img = document.createElement('img');
      img.src = imgObj.url;
      const altText = imgObj.filename.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
      img.alt = altText;
      img.loading = 'lazy';
      img.classList.add('hover-glow');
      img.onclick = () => openModal(idx, pageImages.map(i => i.url));
      gallery.appendChild(img);
    });
    renderPagination(page);
  }

  function renderPagination(page) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';

    // << button (first page)
    const firstBtn = document.createElement('button');
    firstBtn.textContent = '<<';
    firstBtn.className = 'px-3 py-2 rounded bg-gray-300 text-gray-700 hover:bg-green-600 hover:text-white font-poppins';
    firstBtn.disabled = page === 1;
    firstBtn.onclick = () => {
      if (currentPage !== 1) {
        currentPage = 1;
        renderGalleryPage(currentPage);
      }
    };
    paginationContainer.appendChild(firstBtn);

    // < button (previous page)
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '<';
    prevBtn.className = 'px-3 py-2 rounded bg-gray-300 text-gray-700 hover:bg-green-600 hover:text-white font-poppins';
    prevBtn.disabled = page === 1;
    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderGalleryPage(currentPage);
      }
    };
    paginationContainer.appendChild(prevBtn);

    // Dynamic page numbers (show max 5, center on current)
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);
    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 4);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - 4);
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = i;
      pageBtn.className = 'px-3 py-2 rounded font-poppins ' + (i === page ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white');
      if (i === page) pageBtn.disabled = true;
      pageBtn.onclick = () => {
        currentPage = i;
        renderGalleryPage(currentPage);
      };
      paginationContainer.appendChild(pageBtn);
    }

    // > button (next page)
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '>';
    nextBtn.className = 'px-3 py-2 rounded bg-gray-300 text-gray-700 hover:bg-green-600 hover:text-white font-poppins';
    nextBtn.disabled = page === totalPages;
    nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderGalleryPage(currentPage);
      }
    };
    paginationContainer.appendChild(nextBtn);

    // >> button (last page)
    const lastBtn = document.createElement('button');
    lastBtn.textContent = '>>';
    lastBtn.className = 'px-3 py-2 rounded bg-gray-300 text-gray-700 hover:bg-green-600 hover:text-white font-poppins';
    lastBtn.disabled = page === totalPages;
    lastBtn.onclick = () => {
      if (currentPage !== totalPages) {
        currentPage = totalPages;
        renderGalleryPage(currentPage);
      }
    };
    paginationContainer.appendChild(lastBtn);
  }
  }
}

// Modal functions for gallery
function openModal(index, slideArray) {
  if (modal && modalImage) {
    currentSlideArray = slideArray; // Čuvamo trenutni niz slika
    currentIndex = index;
    modalImage.src = slideArray[index];
    const altText = slideArray[index].replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace("./Images/", "");
    modalImage.alt = altText;
    modal.classList.add('show');
    modalImage.focus();
    console.log('Gallery modal opened, image:', slideArray[index]);
  }
}

function closeModal() {
  if (modal) {
    modal.classList.remove('show');
    console.log('Gallery modal closed');
  }
}

function changeImage(direction) {
  if (modal && modalImage) {
    currentIndex = (currentIndex + direction + currentSlideArray.length) % currentSlideArray.length;
    modalImage.src = currentSlideArray[currentIndex];
    const altText = currentSlideArray[currentIndex].replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace("./Images/", "");
    modalImage.alt = altText;
    console.log('Gallery image changed, new image:', currentSlideArray[currentIndex]);
  }
}

// Gallery modal event listeners
document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal();
      console.log('Gallery modal closed via close button');
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => changeImage(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => changeImage(1));
  }

  // Close modal on outside click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
        console.log('Gallery modal closed by clicking outside');
      }
    });
  }
});

// Keyboard navigation for gallery modal
document.addEventListener('keydown', (e) => {
  if (modal && modal.classList.contains('show')) {
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'Escape') closeModal();
  }
});

// Hamburger menu handling
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      console.log('Mobile menu toggled:', mobileMenu.classList);
    });

    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      console.log('Mobile menu closed via close button');
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        console.log('Mobile menu closed by clicking outside');
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        console.log('Mobile menu closed by Escape key');
      }
    });

    // Close menu when a menu item is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        console.log('Mobile menu closed after selecting an item');
      });
    });
  } else {
    console.error('Mobile menu elements missing:', {
      mobileMenuBtn: !!mobileMenuBtn,
      mobileMenu: !!mobileMenu,
      mobileMenuClose: !!mobileMenuClose
    });
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
      externalLinkModal.setAttribute('aria-hidden', 'false');
      externalLinkModal.focus();
    } else {
      console.error('External link URL is missing');
    }
  });

  externalLinkContinue.addEventListener('click', () => {
    console.log('Continue button clicked, redirecting to:', externalLinkContinue.getAttribute('href'));
    externalLinkModal.classList.add('hidden');
    externalLinkModal.setAttribute('aria-hidden', 'true');
  });

  externalLinkCancel.addEventListener('click', () => {
    console.log('Cancel button clicked');
    externalLinkModal.classList.add('hidden');
    externalLinkModal.setAttribute('aria-hidden', 'true');
  });

  // Close modal on outside click
  externalLinkModal.addEventListener('click', (e) => {
    if (e.target === externalLinkModal) {
      console.log('Modal closed by clicking outside');
      externalLinkModal.classList.add('hidden');
      externalLinkModal.setAttribute('aria-hidden', 'true');
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !externalLinkModal.classList.contains('hidden')) {
      console.log('Modal closed by Escape key');
      externalLinkModal.classList.add('hidden');
      externalLinkModal.setAttribute('aria-hidden', 'true');
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
    if (!localStorage.getItem('cookieConsent')) {
      cookieConsent.classList.remove('hidden');
    }

    acceptCookies.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieConsent.classList.add('hidden');
      if (tiktokFeed) {
        console.log('Cookies accepted, loading SociableKit TikTok feed');
        tiktokFeed.classList.remove('hidden');
        tiktokFallback.classList.add('hidden');
        const script = document.createElement('script');
        script.src = 'https://widgets.sociablekit.com/tiktok-feed/widget.js';
        script.async = true;
        document.body.appendChild(script);
      }
    });

    declineCookies.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieConsent.classList.add('hidden');
      if (tiktokFeed && tiktokFallback) {
        console.log('Cookies declined, showing TikTok fallback');
        tiktokFeed.classList.add('hidden');
        tiktokFallback.classList.remove('hidden');
      }
    });
  }

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

    setTimeout(checkFeedLoaded, 5000);
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

      const formData = new FormData(form);

      // Logujemo podatke koji se šalju radi debagovanja
      console.log('Form data:', Object.fromEntries(formData));

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        console.log('Formspree response status:', response.status);

        if (response.ok) {
          formMessage.textContent = 'Poruka je uspešno poslata! Uskoro ćemo vam se javiti.';
          formMessage.classList.remove('text-red-600');
          formMessage.classList.add('text-green-600');
          form.reset();
        } else {
          const error = await response.json();
          console.error('Formspree error:', error);
          formMessage.textContent = 'Došlo je do greške. Pokušajte ponovo ili nas kontaktirajte direktno.';
          formMessage.classList.add('text-red-600');
        }
      } catch (err) {
        console.error('Network or CORS error:', err);
        formMessage.textContent = 'Došlo je do greške. Proverite internet vezu ili nas kontaktirajte direktno.';
        formMessage.classList.add('text-red-600');
      }
    });
  } else {
    console.error('Contact form elements missing:', {
      form: !!form,
      formMessage: !!formMessage
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