const PHOTO_DESCRIPTION = [
  'Мы растем, помогая расти другим',
  'Легких путей не бывает',
  'Угадайте, где я',
  'Запасаюсь воспоминаниями',
  'Лучше один раз увидеть',
  'Время перемен',
  'Вдруг вы забыли, как я выгляжу',
  'Сарказм навсегда',
  'Дорогой сон, спасибо за попытку, но интернет оказался убедительнее',
  'Пришел, увидел, забыл, что хотел',
];

const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENT_NAME = [
  'Геральт',
  'Гервант',
  'Гербольд',
  'Равикс',
  'Gwynbleidd',
  'Возьмак',
];

const NUMBER_OF_ID_MIN = 1;

const NUMBER_OF_ID_MAX = 25;

const NUMBER_OF_URL_MIN = 1;

const NUMBER_OF_URL_MAX = 25;

const NUMBER_OF_LIKES_MIN = 15;

const NUMBER_OF_LIKES_MAX = 200;

const NUMBER_OF_COMMENT_URL_MIN = 1;

const NUMBER_OF_COMMENT_URL_MAX = 6;

const NUMBER_OF_COMMENTS_MIN = 1;

const NUMBER_OF_COMMENTS_MAX = 10;


const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomNumberFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generatePhotoId = createRandomNumberFromRangeGenerator(NUMBER_OF_ID_MIN, NUMBER_OF_ID_MAX); // Создает уникальный id в диапазоне от 1 до 25

const generatePhotoUrl = createRandomNumberFromRangeGenerator(NUMBER_OF_URL_MIN, NUMBER_OF_URL_MAX); // Создает уникальный адрес url в диапазоне от 1 до 25

const generateNumberOfLikes = createRandomNumberFromRangeGenerator(NUMBER_OF_LIKES_MIN, NUMBER_OF_LIKES_MAX); // Генерирует случайное количество лайков под фотографией в диапазоне от 15 до 200

const generateCommentId = createIdGenerator(); // Создает уникальный id комментария

const generateCommentUrl = createRandomNumberFromRangeGenerator(NUMBER_OF_COMMENT_URL_MIN, NUMBER_OF_COMMENT_URL_MAX); // Создает адрес url аватара в диапазоне от 1 до 6

const generateComments = () => {
  return {
    id: generateCommentId(),
    avatar: 'img/avatar-' + generateCommentUrl() + '.svg',
    message: getRandomArrayElement(COMMENT_MESSAGE),
    name: getRandomArrayElement(COMMENT_NAME),
  };
};

const numberOfComments = createRandomNumberFromRangeGenerator(NUMBER_OF_COMMENTS_MIN, NUMBER_OF_COMMENTS_MAX); // Генерирует случайно число комментариев от 1 до 10

const createArray = Array.from({length: numberOfComments}, generateComments);

const createPublication = () => {
  return {
    id: generatePhotoId(),
    url: 'photos/' + generatePhotoUrl() + '.jpg',
    description: getRandomArrayElement(PHOTO_DESCRIPTION),
    likes: generateNumberOfLikes(),
    comments: createArray,
  };
};

const increasePublications = Array.from({length: 25}, createPublication);
