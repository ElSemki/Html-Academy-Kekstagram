import { getRandomIntInclusive } from './utils.js';

const descriptionsPhotos = [
	'🪄🪄🪄',
	'💥💥💥',
	'👍👍👍',
	'😍😍😍',
	'♥️♥️♥️♥️♥️♥️♥️♥️♥️',
	'🙌🙌🙌',
];

const commentsPhotos = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const namesUsers = [
	'Артем',
	'Игорь',
	'Татьяна',
	'Сергей',
	'Александр',
	'Евгений',
	'Гриша',
	'Наталья',
	'Виктория',
];

const photos = [];

function addPhotos() {
	for (let i = 0; i < 25; i++) {
		photos.push({
			id: i + 1,
			url: `../photos/${i + 1}.jpg`,
			description:
				descriptionsPhotos[
					getRandomIntInclusive(0, descriptionsPhotos.length - 1)
				],
			likes: getRandomIntInclusive(15, 200),
			comments: [],
		});
	}
}

function addPhotoComments() {
	photos.forEach(photo => {
		for (let i = 0; i < getRandomIntInclusive(1, 6); i++) {
			photo.comments.push({
				id: getRandomIntInclusive(1, 500),
				avatar: `../img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
				message:
					commentsPhotos[getRandomIntInclusive(0, commentsPhotos.length - 1)],
				name: namesUsers[getRandomIntInclusive(0, namesUsers.length - 1)],
			});
		}
	});
}

addPhotos();
addPhotoComments();

export default photos;
