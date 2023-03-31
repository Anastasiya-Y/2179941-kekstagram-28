import {isEscapeKey} from './util.js';
import {addValidator, resetPristine, validatePristine} from './form-validate.js';

const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const uploadFileForm = form.querySelector('#upload-file');
const uploadCancelButton = form.querySelector('#upload-cancel');

const openUploadFileForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancelButton.addEventListener('click', onUploadCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadFileForm = () => {
  form.reset();
  resetPristine();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadCancelButton.removeEventListener('click', onUploadCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onUploadCancelButtonClick(evt) {
  evt.preventDefault();
  closeUploadFileForm();
}

const onUploadFileFormChange = () => openUploadFileForm();

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    evt.preventDefault();
    closeUploadFileForm();
  }
}

const onFormSubmit = (evt) => {
  if (!validatePristine()) {
    evt.preventDefault();
  }
};

const addFormAction = () => {
  uploadFileForm.addEventListener('change', onUploadFileFormChange);
  form.addEventListener('submit', onFormSubmit);
  addValidator();
};

export {addFormAction};
