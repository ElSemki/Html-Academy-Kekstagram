import { filterPhoto, resetFilterEffects } from './filter-photo.js';
import { hashTagsValidate, resetHashTagInput } from './hash-tags-validate.js';
import { resetScalePhoto, scalePhoto } from './scale-photo.js';
import { deleteUploadFormEventListener, sendForm } from './send-form.js';
import { closeModal, isEscEvent, openModal } from './utils.js';

const uploadFileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const previewImage = overlay.querySelector('.img-upload__preview > img');
const uploadCloseBtn = overlay.querySelector('#upload-cancel');

function closeUploadFile() {
	resetScalePhoto();
	resetFilterEffects();
	resetHashTagInput();
	document.querySelector('.text__description').value = '';
	previewImage.classList.forEach(className =>
		previewImage.classList.remove(className)
	);
	deleteUploadFormEventListener();
	document.removeEventListener('keydown', onUploadFileEscKeydown);
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
	openModal(overlay);
	scalePhoto();
	filterPhoto();
	hashTagsValidate();
	sendForm();
	document.addEventListener('keydown', onUploadFileEscKeydown);
}

uploadFileInput.addEventListener('change', uploadFile);

uploadCloseBtn.addEventListener('click', closeUploadFile);

export { closeUploadFile, previewImage };
