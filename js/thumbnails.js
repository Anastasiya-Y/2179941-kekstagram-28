import {increasePublications} from './data.js';
import {openBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const picturesGenerated = increasePublications();

picturesGenerated.forEach((item) => {
  const pictureAdded = pictureTemplate.cloneNode(true);
  pictureAdded.querySelector('.picture__img').src = item.url;
  pictureAdded.querySelector('.picture__img').alt = item.description;
  pictureAdded.querySelector('.picture__likes').textContent = item.likes;
  pictureAdded.querySelector('.picture__comments').textContent = item.comments.length;
  pictureAdded.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(item);
  });
  picturesFragment.appendChild(pictureAdded);

  return pictureAdded;
});

const renderThumbnails = () => container.appendChild(picturesFragment);

export {renderThumbnails};
