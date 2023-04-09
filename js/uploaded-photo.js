const IMAGE_FORMAT = ['jpeg', 'jpg', 'png', 'gif', 'heic', 'webp'];
const imgPreview = document.querySelector('.img-upload__preview img');

const getUploadedPhoto = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = IMAGE_FORMAT.some((ending) => fileName.endsWith(ending));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

export {getUploadedPhoto};
