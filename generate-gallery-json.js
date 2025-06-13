// Node.js script to generate gallery.json from all images in the Images folder
// Run: node generate-gallery-json.js

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'Images');
const outputJson = path.join(__dirname, 'gallery.json');

// Supported image extensions
const exts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function getImagesList(dir) {
  return fs.readdirSync(dir)
    .filter(file => exts.includes(path.extname(file).toLowerCase()))
    .map(file => ({
      filename: file,
      url: `Images/${file}`
    }));
}

const images = getImagesList(imagesDir);

// Try to safely overwrite gallery.json
try {
  if (fs.existsSync(outputJson)) {
    fs.unlinkSync(outputJson); // remove old file if exists
  }
  fs.writeFileSync(outputJson, JSON.stringify(images, null, 2), 'utf8');
  console.log(`gallery.json generated with ${images.length} images.`);
} catch (err) {
  console.error('Error writing gallery.json:', err);
}
