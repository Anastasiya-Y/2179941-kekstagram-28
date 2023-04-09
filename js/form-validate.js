const MAX_COMMENT_LENGTH = 140;
const HASHTAG_TEXT = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const VALIDATION_ERROR_COMMENT_LENGTH = 'Длина комментария не может составлять больше 140 символов';
const VALIDATION_ERROR_HASHTAG_SYMBOLS = 'Хэш-теги должны начинаться с #, состоять из букв и чисел; максимальная длина хэш-тега 20 символов, включая решётку';
const VALIDATION_ERROR_HASHTAG_COUNT = 'Количество хэш-тегов не должно превышать 5';
const VALIDATION_ERROR_HASHTAG_REPEAT = 'Хэш-теги не должны повторяться';

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

// Проверка длины комментария
const isValidCommentLength = (comment) => comment.length <= MAX_COMMENT_LENGTH;

// Создание массива для проверки
const createHashtagArray = (value) => value.trim().split(' ').filter((item) => item !== '');

// Проверка на правильность введенных символов в хэш-теге
const isValidHashtag = (value) => {
  if (!value) {
    return true;
  }

  const hashtagArray = createHashtagArray(value);

  return hashtagArray.every((hashtag) => HASHTAG_TEXT.test(hashtag));
};

// Проверка количества хэш-тегов
const isValidHashtagCount = (value) => {
  const hashtagArray = createHashtagArray(value);
  return hashtagArray.length <= MAX_HASHTAG_COUNT;
};

// Проверка на уникальность хэш-тегов
const isHashtagUnique = (value) => {
  const hashtagArray = createHashtagArray(value);
  const newHashtagArray = new Set(hashtagArray);
  return newHashtagArray.size === hashtagArray.length;
};

const addValidator = () => {
  pristine.addValidator(
    commentInput,
    isValidCommentLength,
    VALIDATION_ERROR_COMMENT_LENGTH,
  );

  pristine.addValidator(
    hashtagInput,
    isValidHashtag,
    VALIDATION_ERROR_HASHTAG_SYMBOLS, 1, true
  );

  pristine.addValidator(
    hashtagInput,
    isValidHashtagCount,
    VALIDATION_ERROR_HASHTAG_COUNT, 1, true
  );

  pristine.addValidator(
    hashtagInput,
    isHashtagUnique,
    VALIDATION_ERROR_HASHTAG_REPEAT, 1, true
  );
};

const resetPristine = () => pristine.reset();
const validatePristine = () => pristine.validate();

export {addValidator, resetPristine, validatePristine};
