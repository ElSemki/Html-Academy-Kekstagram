import { getData, renderContent } from './utils.js';

const pictureTemplate = document
	.querySelector('#picture')
	.content.querySelector('.picture');

const picturesList = document.querySelector('.pictures');

function renderPhoto({ url, likes, comments }) {
	const pictureElement = pictureTemplate.cloneNode(true);
	pictureElement.querySelector('.picture__img').src = url;
	pictureElement.querySelector('.picture__likes').textContent = likes;
	pictureElement.querySelector('.picture__comments').textContent =
		comments.length;

	return pictureElement;
}

let photos;

async function renderPhotos() {
	try {
		photos = await getData(
			'https://23.javascript.pages.academy/kekstagram/data'
		);
		renderContent(photos, picturesList, renderPhoto);
	} catch (e) {
		alert(e);
	}
}
export { photos, renderPhotos };
