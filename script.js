const slides = [
 'IMG_001.jpg', 'IMG_002.jpg', 'IMG_003.jpg', 'IMG_004.jpg', 'IMG_005.jpg',
 'IMG_006.jpg', 'IMG_007.jpg', 'IMG_008.jpg', 'IMG_009.jpg', 'IMG_010.jpg',
 'IMG_011.jpg', 'IMG_012.jpg', 'IMG_013.jpg', 'IMG_014.jpg', 'IMG_015.jpg',
 'IMG_016.jpg', 'IMG_017.jpg', 'IMG_018.jpg', 'IMG_019.jpg', 'IMG_020.jpg',
 'IMG_021.jpg', 'IMG_022.jpg', 'IMG_023.jpg', 'logo_1.jpg'
];
let currentIndex = 0;
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const gallery = document.getElementById('gallery');
const catalogModal = document.getElementById('catalogModal');
function openModal(index) {
    currentIndex = index;
    modalImage.src = slides[index];
    modalImage.alt = Drveni proizvod ;
    modal.style.display = 'flex';
    modalImage.focus();
}
function closeModal() {
    modal.style.display = 'none';
}
function changeImage(direction) {
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    modalImage.src = slides[currentIndex];
    modalImage.alt = Drveni proizvod ;
}
function openCatalogModal() {
    catalogModal.style.display = 'flex';
}
function closeCatalogModal() {
    catalogModal.style.display = 'none';
}
slides.forEach((slide, index) => {
    const img = document.createElement('img');
    img.src = slide;
    img.alt = Drveni proizvod ;
    img.loading = 'lazy';
    img.onerror = () => console.error(Greška pri učitavanju slike: );
    img.onclick = () => openModal(index);
    gallery.appendChild(img);
});
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'Escape') closeModal();
    }
    if (catalogModal.style.display === 'flex' && e.key === 'Escape') closeCatalogModal();
});
function acceptCookies() {
    document.getElementById('cookieConsent').style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
}
function calculatePrice() {
    const lengthInput = document.getElementById('lengthInput');
    const widthInput = document.getElementById('widthInput');
    const textInput = document.getElementById('engraveText');
    const priceResult = document.getElementById('priceResult');

const length = parseFloat(lengthInput.value);
const width = parseFloat(widthInput.value);
const text = textInput.value || '';

if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
    priceResult.innerHTML = 'Molimo unesite validne dimenzije (veće od 0).';
    priceResult.style.color = 'red';
    return;
}

// Ako je proizvod manji od 400x400 mm, i dalje koristimo celu ploču zbog otpada
const materialCost = 75; // Cela ploča 400x400 mm

// Procena gravirane površine (1 cm² po karakteru, max 30 karaktera)
const engravedArea = Math.min(text.length, 30) * 1;
const engravingCost = engravedArea * 1; // 1 din/cm² za graviranje

// Vreme rada lasera (0,5 min/cm² graviranja)
const engravingTime = engravedArea * 0.5;
const laserCost = engravingTime * 0.5; // 0,5 din/min

// Struja (1 din/sat, odnosno 0,0167 din/min)
const electricityCost = engravingTime * 0.0167;

// Održavanje mašine
const maintenanceCost = 50;

// Poštarina
const shippingCost = 40;

// Ukupni troškovi pre marže
const totalCost = materialCost + engravingCost + laserCost + electricityCost + maintenanceCost + shippingCost;

// Marža od 600% (povećana da cena bude bliža 1000–1500 din)
const totalWithMargin = totalCost * 6;

// Raspon ±10%
const lowerBound = Math.round(totalWithMargin * 0.9);
const upperBound = Math.round(totalWithMargin * 1.1);

priceResult.innerHTML = Procenjena cena:  -  dinara;
priceResult.style.color = '#2c3e50';
}
if (!localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookieConsent').style.display = 'block';
}
// Provera konzole za greške
console.log('Skripta je učitana. Proverite da li su sve slike prisutne i da kalkulator radi.');
