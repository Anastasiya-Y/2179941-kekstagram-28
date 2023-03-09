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

const POST_COUNTER = 25;

let photoId = 1;
let commentsId = 1;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateComments = () => ({
  id: commentsId++,
  avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
  message: Array.from(new Set(Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(COMMENT_MESSAGE)))).join(' '),
  name: getRandomArrayElement(COMMENT_NAME),
});

const createPublication = () => ({
  id: photoId,
  url: 'photos/' + photoId++ + '.jpg',
  description: getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1, 10)}, generateComments),
});

const increasePublications = () => Array.from({length: POST_COUNTER}, createPublication);

increasePublications();
