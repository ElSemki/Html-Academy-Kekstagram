import {
	deleteEffectsListEventListener,
	filterPhoto,
	resetFilterEffects,
} from './filter-photo.js';
import {
	deleteHashTagInputEventListener,
	hashTagsValidate,
	resetValuesHashTag,
} from './hash-tags-validate.js';
import {
	deleteScaleContainerEventListener,
	resetScalePhoto,
	scalePhoto,
} from './scale-photo.js';
import { deleteUploadFormEventListener, sendForm } from './send-form.js';
import { closeModal, isEscEvent, openModal } from './utils.js';

const uploadFileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const previewImage = overlay.querySelector('.img-upload__preview > img');
const uploadCloseBtn = overlay.querySelector('#upload-cancel');

function resetValues() {
	resetScalePhoto();
	resetFilterEffects();
	resetValuesHashTag();
	document.querySelector('.text__description').value = '';
	previewImage.classList.forEach(className =>
		previewImage.classList.remove(className)
	);
}

function closeUploadFile() {
	deleteScaleContainerEventListener();
	deleteEffectsListEventListener();
	deleteHashTagInputEventListener();
	deleteUploadFormEventListener();
	document.removeEventListener('keydown', onUploadFileEscKeydown);
	resetValues();
	closeModal(overlay);
}

function onUploadFileEscKeydown(evt) {
	if (
		isEscEvent(evt) &&
		!document.activeElement.closest('.text__hashtags') &&
		!document.activeElement.closest('.text__description')
	) {
		closeUploadFile();
	}
}

function uploadFile() {
	uploadFileInput.addEventListener('change', () => {
		openModal(overlay);
		scalePhoto();
		filterPhoto();
		hashTagsValidate();
		sendForm();
		document.addEventListener('keydown', onUploadFileEscKeydown);
	});

	uploadCloseBtn.addEventListener('click', closeUploadFile);
}

export { closeUploadFile, previewImage, uploadFile };
