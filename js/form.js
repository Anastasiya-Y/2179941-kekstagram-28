import {isEscapeKey} from './util.js';
import {activateScale, resetScale} from './form-scale.js';
import {addValidator, resetPristine, validatePristine} from './form-validate.js';
import {chooseEffect, resetFilter, createSlider} from './form-effects.js';
import {sendData} from './api.js';
import {renderFailMessage, renderSuccessMessage} from './form-message.js';

const GET_DATA_URL = 'https://28.javascript.pages.academy/kekstagram';
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const uploadFileForm = form.querySelector('#upload-file');
const uploadCancelButton = form.querySelector('#upload-cancel');
const effectsField = form.querySelector('.effects');

const openUploadFileForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancelButton.addEventListener('click', onUploadCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadFileForm = () => {
  form.reset();
  resetScale();
  resetPristine();
  resetFilter();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadCancelButton.removeEventListener('click', onUploadCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onSendSuccess = () => {
  renderSuccessMessage();
  closeUploadFileForm();
};

const onSendFail = () => {
  renderFailMessage();
};

function onUploadCancelButtonClick(evt) {
  evt.preventDefault();
  closeUploadFileForm();
}

const onUploadFileFormChange = () => openUploadFileForm();
const onEffectsFieldChange = (evt) => chooseEffect(evt);

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    if (document.querySelector('.error')) {
      return;
    }
    evt.preventDefault();
    closeUploadFileForm();
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (validatePristine()) {
    sendData(GET_DATA_URL, onSendSuccess, onSendFail, new FormData(evt.target));
  }
};

const addFormAction = () => {
  uploadFileForm.addEventListener('change', onUploadFileFormChange);
  effectsField.addEventListener('change', onEffectsFieldChange);
  form.addEventListener('submit', onFormSubmit);
  activateScale();
  addValidator();
  createSlider();
};

export {addFormAction};
