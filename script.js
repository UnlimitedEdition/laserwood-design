const slides = [
  './Images/IMG_001.webp', './Images/IMG_001.webp', './Images/IMG_002.webp',
  './Images/IMG_003.webp', './Images/IMG_004.webp', './Images/IMG_005.webp',
  './Images/IMG_006.webp', './Images/IMG_007.webp', './Images/IMG_008.webp',
  './Images/IMG_009.webp', './Images/IMG_010.webp', './Images/IMG_011.webp',
  './Images/IMG_012.webp', './Images/IMG_013.webp', './Images/IMG_014.webp',
  './Images/IMG_015.webp', './Images/IMG_016.webp', './Images/IMG_017.webp',
  './Images/IMG_018.webp', './Images/IMG_019.webp', './Images/IMG_020.webp',
  './Images/IMG_021.webp', './Images/IMG_022.webp', './Images/IMG_023.webp',
  './Images/IMG_024.webp', './Images/IMG_025.webp', './Images/IMG_026.webp',
  './Images/IMG_027.webp', './Images/IMG_028.webp', './Images/IMG_029.webp',
  './Images/IMG_030.webp', './Images/IMG_031.webp', './Images/IMG_032.webp',
  './Images/IMG_033.webp', './Images/IMG_034.webp', './Images/IMG_035.webp',
  './Images/IMG_036.webp', './Images/IMG_037.webp', './Images/IMG_038.webp',
  './Images/IMG_039.webp', './Images/IMG_040.webp', './Images/IMG_041.webp',
  './Images/IMG_042.webp', './Images/IMG_043.webp', './Images/IMG_044.webp',
  './Images/logo_1.webp'
];

let currentIndex = 0;
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const gallery = document.getElementById('gallery');

// Load gallery images (only runs in gallery.html where id="gallery" exists)
if (gallery) {
  console.log('Initializing gallery...');
  slides.forEach((slide, index) => {
    const img = document.createElement('img');
    img.src = slide;
    const altText = slide.replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace("./Images/", "");
    img.alt = altText;
    img.loading = 'lazy';
    img.onerror = () => console.error('Error loading image:', slide);
    img.onload = () => console.log('Image loaded:', slide);
    img.onclick = () => openModal(index);
    gallery.appendChild(img);
  });
} else {
  console.log('No gallery element found. Skipping gallery initialization.');
}

// Gallery modal functions (only used in gallery.html)
function openModal(index) {
  if (modal && modalImage) {
    currentIndex = index;
    modalImage.src = slides[index];
    const altText = slides[index].replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace("./Images/", "");
    modalImage.alt = altText;
    modal.style.display = 'flex';
    modalImage.focus();
    console.log('Modal opened, image:', slides[index]);
  }
}

function closeModal() {
  if (modal) {
    modal.style.display = 'none';
    console.log('Modal closed.');
  }
}

function changeImage(direction) {
  if (modal && modalImage) {
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    modalImage.src = slides[currentIndex];
    const altText = slides[currentIndex].replace(/\.[^/.]+$/, "").replace(/_/g, " ").replace("./Images/", "");
    modalImage.alt = altText;
    console.log('Image changed, new image:', slides[currentIndex]);
  }
}

// Keyboard navigation for modal (only active when modal is open)
document.addEventListener('keydown', (e) => {
  if (modal && modal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'Escape') closeModal();
  }
});

// Refresh TikTok iframe on page load (only runs in index.html where id="tiktok-feed" exists)
window.addEventListener('load', () => {
  const tiktokIframe = document.getElementById('tiktok-feed');
  if (tiktokIframe) {
    const baseSrc = tiktokIframe.src.split('?')[0];
    const randomParam = 't=' + new Date().getTime();
    tiktokIframe.src = baseSrc + '?' + randomParam;
    console.log('TikTok iframe refreshed:', tiktokIframe.src);
  }
});
