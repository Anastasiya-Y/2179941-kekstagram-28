import {isEscapeKey} from './util.js';

const failMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
let failMessage;
let successMessage;

const closeFailMessage = () => {
  failMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  failMessage = '';
};

const closeSuccessMessage = () => {
  successMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  successMessage = '';
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (failMessage) {
      closeFailMessage();
      return;
    }
    closeSuccessMessage();
  }
}

const onErrorButtonClick = (evt) => {
  evt.preventDefault();
  closeFailMessage();
};

const onSuccessButtonClick = (evt) => {
  evt.preventDefault();
  closeSuccessMessage();
};

const onErrorClick = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    closeFailMessage();
  }
};

const onSuccessClick = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessMessage();
  }
};

const renderFailMessage = () => {
  failMessage = failMessageTemplate.cloneNode(true);
  document.body.appendChild(failMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  failMessage.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  failMessage.addEventListener('click', onErrorClick);
};

const renderSuccessMessage = () => {
  successMessage = successMessageTemplate.cloneNode(true);
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  successMessage.querySelector('.success__button').addEventListener('click', onSuccessButtonClick);
  successMessage.addEventListener('click', onSuccessClick);
};

export {renderFailMessage, renderSuccessMessage};
