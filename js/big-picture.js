import {isEscapeKey} from './util.js';

const COMMENT_COUNTER = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCommentsElement = bigPicture.querySelector('.social__comment');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');

let comments = [];
let showingComments = 0;

const fillCommentCount = () => {
  socialCommentsCount.innerHTML = `${showingComments} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const createComment = (comment) => {
  const commentTemplate = socialCommentsElement.cloneNode(true);
  const img = commentTemplate.querySelector('.social__picture');
  commentTemplate.querySelector('.social__text').textContent = comment.message;
  img.alt = comment.avatar;
  img.alt = comment.name;
  return commentTemplate;
};

const renderComments = () => {
  const currentComments = comments.slice(showingComments, showingComments + COMMENT_COUNTER);
  showingComments += COMMENT_COUNTER;
  showingComments = Math.min(showingComments, comments.length);
  currentComments.forEach((comment) => socialCommentsList.append(createComment(comment)));
  fillCommentCount();
  if (showingComments >= comments.length) {
    socialCommentsLoader.classList.add('hidden');
    return;
  }
  socialCommentsLoader.classList.remove('hidden');
};

const fillBigPicture = (item) => {
  bigPictureImg.src = item.url;
  bigPictureImg.alt = item.description;
  likesCount.textContent = item.likes;
  socialCaption.textContent = item.description;
};

// Функция закрытия модального окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  socialCommentsLoader.removeEventListener('click', onSocialCommentsLoaderClick);
  comments = [];
  showingComments = 0;
};
// Функция открытия модального окна
const openBigPicture = (item) => {
  socialCommentsList.innerHTML = '';
  comments = item.comments;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  fillBigPicture(item);
  renderComments();
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  socialCommentsLoader.addEventListener('click', onSocialCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onSocialCommentsLoaderClick(evt) {
  evt.preventDefault();
  renderComments();
}

function onBigPictureCancelClick(evt) {
  evt.preventDefault();
  closeBigPicture();
}


function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !evt.target.closest('.social__footer-text')) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture};
