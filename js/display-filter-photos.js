import { createPhoto, photos, picturesList } from './photos.js';
import { renderContent, shuffleArray } from './utils.js';

const photosFilter = document.querySelector('.img-filters');
const displayFilterForm = photosFilter.querySelector('.img-filters__form');
const filterButtons = photosFilter.querySelectorAll('.img-filters__button');

const filters = {
	'filter-default': () => renderContent(photos, picturesList, createPhoto),
	'filter-random': () =>
		renderContent(
			shuffleArray(photos.slice()).slice(0, 10),
			picturesList,
			createPhoto
		),
	'filter-discussed': () =>
		renderContent(
			photos.slice().sort((a, b) => b.comments.length - a.comments.length),
			picturesList,
			createPhoto
		),
};

function displayFilterPhotos() {
	photosFilter.classList.remove('img-filters--inactive');

	displayFilterForm.addEventListener('click', evt => {
		if (!evt.target.closest('.img-filters__button')) return;

		filterButtons.forEach(btn =>
			btn.classList.remove('img-filters__button--active')
		);

		picturesList.querySelectorAll('.picture').forEach(a => a.remove());

		filters[evt.target.id]();

		evt.target.classList.add('img-filters__button--active');
	});
}

export { displayFilterPhotos };
