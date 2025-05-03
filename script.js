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
   
   // Dijagnostika
   console.log('Proveravam galeriju...');
   console.log('Modal:', modal);
   console.log('Gallery element:', gallery);
   
   if (!gallery) {
       console.error('Galerija nije pronađena! Proverite ID "gallery" u HTML-u.');
   } else {
       slides.forEach((slide, index) => {
           const img = document.createElement('img');
           img.src = slide;
           img.alt = 'Drveni proizvod';
           img.loading = 'lazy';
           img.onerror = () => console.error('Greška pri učitavanju slike:', slide);
           img.onload = () => console.log('Slika učitana:', slide);
           img.onclick = () => openModal(index);
           gallery.appendChild(img);
       });
   }
   
   function openModal(index) {
       currentIndex = index;
       modalImage.src = slides[index];
       modalImage.alt = 'Drveni proizvod';
       modal.style.display = 'flex';
       modalImage.focus();
       console.log('Modal otvoren, slika:', slides[index]);
   }
   
   function closeModal() {
       modal.style.display = 'none';
       console.log('Modal zatvoren.');
   }
   
   function changeImage(direction) {
       currentIndex = (currentIndex + direction + slides.length) % slides.length;
       modalImage.src = slides[currentIndex];
       modalImage.alt = 'Drveni proizvod';
       console.log('Promena slike, nova slika:', slides[currentIndex]);
   }
   
   function openCatalogModal() {
       catalogModal.style.display = 'flex';
       console.log('Katalog modal otvoren.');
   }
   
   function closeCatalogModal() {
       catalogModal.style.display = 'none';
       console.log('Katalog modal zatvoren.');
   }
   
   document.addEventListener('keydown', (e) => {
       if (modal.style.display === 'flex') {
           if (e.key === 'ArrowLeft') changeImage(-1);
           if (e.key === 'ArrowRight') changeImage(1);
           if (e.key === 'Escape') closeModal();
       }
   });
   