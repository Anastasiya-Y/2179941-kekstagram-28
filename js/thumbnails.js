import {increasePublications} from './data.js';

const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const picturesGenerated = increasePublications();

picturesGenerated.forEach(({url, description, likes, comments}) => {
  const pictureAdded = pictureTemplate.cloneNode(true);
  pictureAdded.querySelector('.picture__img').src = url;
  pictureAdded.querySelector('.picture__img').alt = description;
  pictureAdded.querySelector('.picture__likes').textContent = likes;
  pictureAdded.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.appendChild(pictureAdded);

  return pictureAdded;
});

const renderThumbnails = container.appendChild(picturesFragment);

export {renderThumbnails};
