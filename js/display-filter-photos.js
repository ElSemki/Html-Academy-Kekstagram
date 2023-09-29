import { photos, picturesList, renderPhoto } from './photos.js';
import { getRandomIntInclusive, renderContent } from './utils.js';

const displayFilterForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

function getDiscussedPhotos() {
	const discussedPhotos = photos
		.slice()
		.sort((a, b) => b.comments.length - a.comments.length);
	return discussedPhotos;
}

function getTenRandomPhotos() {
	const randomPhotosArr = [];
	let randomNumber;

	while (randomPhotosArr.length < 10) {
		randomNumber = getRandomIntInclusive(0, photos.length - 1);
		if (
			!randomPhotosArr.some(
				randomPhoto => randomPhoto.id === photos[randomNumber].id
			)
		) {
			randomPhotosArr.push(photos[randomNumber]);
		}
	}

	return randomPhotosArr;
}

function filterPhotos(evt, arr) {
	filterButtons.forEach(btn =>
		btn.classList.remove('img-filters__button--active')
	);
	evt.target.classList.add('img-filters__button--active');
	picturesList.querySelectorAll('a').forEach(a => a.remove());
	renderContent(arr, picturesList, renderPhoto);
}

function displayFilterPhotos() {
	displayFilterForm.addEventListener('click', evt => {
		if (evt.target.closest('#filter-default')) {
			filterPhotos(evt, photos);
		}
		if (evt.target.closest('#filter-random')) {
			filterPhotos(evt, getTenRandomPhotos());
		}

		if (evt.target.closest('#filter-discussed')) {
			filterPhotos(evt, getDiscussedPhotos());
		}
	});
}

export { displayFilterPhotos };
