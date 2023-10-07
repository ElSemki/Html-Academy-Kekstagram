import { displayFilterPhotos } from './display-filter-photos.js';
import { renderFullSizeImage } from './render-full-size-image.js';
import { getData, renderContent } from './utils.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document
	.querySelector('#picture')
	.content.querySelector('.picture');

let photos;

function createPhoto({ url, likes, comments }) {
	const pictureElement = pictureTemplate.cloneNode(true);
	pictureElement.querySelector('.picture__img').src = url;
	pictureElement.querySelector('.picture__likes').textContent = likes;
	pictureElement.querySelector('.picture__comments').textContent =
		comments.length;

	return pictureElement;
}

async function renderPhotos() {
	try {
		photos = await getData(
			'https://23.javascript.pages.academy/kekstagram/data'
		);
		renderContent(photos, picturesList, createPhoto);
		displayFilterPhotos();
		renderFullSizeImage();
	} catch (e) {
		alert(e);
	}
}

export { createPhoto, photos, picturesList, renderPhotos };
