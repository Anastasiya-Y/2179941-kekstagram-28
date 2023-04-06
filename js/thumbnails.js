import {openBigPicture} from './big-picture.js';
import {getData} from './api.js';

const GET_DATA_URL = 'https://28.javascript.pages.academy/kekstagram/data';
const ERROR_SHOW_TIME = 5000;
const container = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (data) => {
  const pictureAdded = pictureTemplate.cloneNode(true);
  pictureAdded.querySelector('.picture__img').src = data.url;
  pictureAdded.querySelector('.picture__img').alt = data.description;
  pictureAdded.querySelector('.picture__likes').textContent = data.likes;
  pictureAdded.querySelector('.picture__comments').textContent = data.comments.length;

  pictureAdded.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(data);
  });
  return pictureAdded;
};

const renderThumbnails = (data) => {
  data.forEach((item) => container.append(createThumbnail(item)));
};

const onGetSuccess = (data) => renderThumbnails(data);

const onGetFail = () => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '100';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '0';
  errorContainer.style.top = '0';
  errorContainer.style.right = '0';
  errorContainer.style.width = '100%';
  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.color = 'black';
  errorContainer.style.backgroundColor = 'red';

  errorContainer.textContent = 'Ошибка загрузки. Попробуйте еще раз';

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

const getThumbnailsData = () => getData(GET_DATA_URL, onGetSuccess, onGetFail);

export {getThumbnailsData};
