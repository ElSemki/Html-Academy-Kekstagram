import photos from './data.js';
import { renderContent } from './utils.js';

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

const renderPhotos = () => renderContent(photos, picturesList, renderPhoto);

export { renderPhotos };
