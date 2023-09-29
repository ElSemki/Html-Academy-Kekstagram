import { displayFilterPhotos } from './display-filter-photos.js';
import { getData, renderContent } from './utils.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document
	.querySelector('#picture')
	.content.querySelector('.picture');
const photosFilter = document.querySelector('.img-filters');
let photos;

function renderPhoto({ url, likes, comments }) {
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
		renderContent(photos, picturesList, renderPhoto);

		photosFilter.classList.remove('img-filters--inactive');
		displayFilterPhotos();
	} catch (e) {
		console.log('hello');
		alert(e);
	}
}

renderPhotos();

export { photos, picturesList, renderPhoto };
