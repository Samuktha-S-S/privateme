function uploadImages() {
  const input = document.getElementById('imageUpload');
  const gallery = document.getElementById('gallery');
  
  const files = input.files;
  if (files.length === 0) {
    alert("Please select images!");
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const card = document.createElement('div');
      card.className = 'image-card';

      const img = document.createElement('img');
      img.src = event.target.result;

      const btn = document.createElement('button');
      btn.innerText = "🗑️ Delete";
      btn.className = "delete-btn";

      // Confirmation and delete
      btn.addEventListener('click', function () {
        const confirmDelete = confirm("Are you sure you want to delete this image?");
        if (confirmDelete) {
          card.remove();
        }
      });

      card.appendChild(img);
      card.appendChild(btn);
      gallery.appendChild(card);
    }
    fileReader.readAsDataURL(files[i]);
  }
}
