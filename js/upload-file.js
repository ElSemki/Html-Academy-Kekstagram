import {
	deleteEffectsListEventListener,
	filterPhoto,
	resetFilterEffects,
} from './filter-photo.js';
import {
	deleteScaleContainerEventListener,
	resetScalePhoto,
	scalePhoto,
} from './scalePhoto.js';
import { closeModal, isEscEvent, openModal } from './utils.js';

const uploadFileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const previewImage = overlay.querySelector('.img-upload__preview > img');
const uploadCloseBtn = overlay.querySelector('#upload-cancel');

function resetValues() {
	resetScalePhoto();
	resetFilterEffects();
	previewImage.classList.forEach(className =>
		previewImage.classList.remove(className)
	);
}

function closeUploadFile() {
	deleteScaleContainerEventListener();
	deleteEffectsListEventListener();
	document.removeEventListener('keydown', onUploadFileEscKeydown);
	resetValues();
	closeModal(overlay);
}

function onUploadFileEscKeydown(evt) {
	if (isEscEvent(evt)) {
		closeUploadFile();
	}
}

function uploadFile() {
	uploadFileInput.addEventListener('change', () => {
		openModal(overlay);
		scalePhoto();
		filterPhoto();
		document.addEventListener('keydown', onUploadFileEscKeydown);
	});

	uploadCloseBtn.addEventListener('click', closeUploadFile);
}

export { previewImage, uploadFile };
