import {renderThumbnails} from './thumbnails.js';
import {shuffleArray, debounce} from './util.js';

const COMMENTS_COUNT = 10;
const SHIFT_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');

const removeItems = (items) => {
  items.forEach((item) => item.remove());
};

const shiftThumbnails = (data, id) => {
  const dataCopy = data.slice();
  const thumbnails = document.querySelectorAll('.picture');
  removeItems(thumbnails);

  if (id === 'filter-random') {
    const sortArray = shuffleArray(dataCopy).slice(0, COMMENTS_COUNT);
    renderThumbnails(sortArray);
    return;
  }

  if (id === 'filter-discussed') {
    dataCopy.sort((a, b) => b.comments.length - a.comments.length);
  }
  renderThumbnails(dataCopy);
};

const shiftTimeout = debounce((data, id) => shiftThumbnails(data, id), SHIFT_DELAY);

const onImgFiltersClick = (evt, data) => {
  if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    const id = evt.target.id;
    shiftTimeout(data, id);
  }
};

const initFilter = (data) => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', (evt) => {
    onImgFiltersClick(evt, data);
  });
};

export {initFilter};
