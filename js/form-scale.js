const SCALE_STEP = 25;
const PERCENT_DIVIDER = 100;
const SCALE_MIN = '25%';
const SCALE_MAX = '100%';
// const SCALE_DEFAULT = '100%';

const image = document.querySelector('.img-upload__preview img');
const scaleControl = document.querySelector('.scale__control--value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');

const changeScale = (value) => {
  image.style.transform = `scale(${+value.replace('%', '') / PERCENT_DIVIDER})`;
};

const onScaleSmallerButtonClick = () => {
  if (scaleControl.value !== SCALE_MIN) {
    scaleControl.value = `${+scaleControl.value.replace('%', '') - SCALE_STEP}%`;
    changeScale(scaleControl.value);
  }
};

const onScaleBiggerButtonClick = () => {
  if (scaleControl.value !== SCALE_MAX) {
    scaleControl.value = `${+scaleControl.value.replace('%', '') + SCALE_STEP}%`;
    changeScale(scaleControl.value);
  }
};

const activateScale = () => {
  scaleSmallerButton.addEventListener('click', onScaleSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onScaleBiggerButtonClick);
};

const resetScale = () => changeScale(scaleControl.value);

export {activateScale, resetScale};
