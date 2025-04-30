// Load stored images on page load
window.onload = function () {
  const savedImages = JSON.parse(localStorage.getItem('bestieImages')) || [];
  savedImages.forEach((imgData, index) => {
    addImageToGallery(imgData, index);
  });
};

// Add uploaded images
function uploadImages() {
  const input = document.getElementById('imageUpload');
  const files = input.files;

  if (files.length === 0) {
    alert("Please select images!");
    return;
  }

  const savedImages = JSON.parse(localStorage.getItem('bestieImages')) || [];

  for (let i = 0; i < files.length; i++) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const imgData = event.target.result;
      savedImages.push(imgData);
      localStorage.setItem('bestieImages', JSON.stringify(savedImages));
      addImageToGallery(imgData, savedImages.length - 1);
    };
    fileReader.readAsDataURL(files[i]);
  }

  input.value = ''; // Reset input after upload
}

// Add image to gallery with delete button
function addImageToGallery(imgData, index) {
  const gallery = document.getElementById('gallery');
  const card = document.createElement('div');
  card.className = 'image-card';

  const img = document.createElement('img');
  img.src = imgData;

  const btn = document.createElement('button');
  btn.innerText = "🗑️ Delete";
  btn.className = "delete-btn";
  btn.onclick = function () {
    const confirmDelete = confirm("Delete this image?");
    if (confirmDelete) {
      deleteImage(index);
    }
  };

  card.appendChild(img);
  card.appendChild(btn);
  gallery.appendChild(card);
}

// Delete image from localStorage and refresh gallery
function deleteImage(indexToRemove) {
  let savedImages = JSON.parse(localStorage.getItem('bestieImages')) || [];
  savedImages.splice(indexToRemove, 1);
  localStorage.setItem('bestieImages', JSON.stringify(savedImages));
  document.getElementById('gallery').innerHTML = '';
  savedImages.forEach((img, index) => addImageToGallery(img, index));
}
