import { closeModal, isEscEvent, openModal } from '../utils.js';
import { filterPhoto, resetFilterEffects } from './filter-photo.js';
import { hashTagsValidate, resetHashTagInput } from './hash-tags-validate.js';
import { resetScalePhoto, scalePhoto } from './scale-photo.js';
import { deleteUploadFormEventListener, sendForm } from './send-form.js';

const uploadFileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const previewImage = overlay.querySelector('.img-upload__preview > img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const uploadCloseBtn = overlay.querySelector('#upload-cancel');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

function openPreviewImage() {
	const file = uploadFileInput.files[0];
	const fileName = file.name.toLowerCase();
	const matches = FILE_TYPES.some(it => fileName.endsWith(it));

	if (!matches) return;

	const reader = new FileReader();

	reader.addEventListener('load', () => {
		previewImage.src = reader.result;
		effectsPreviews.forEach(
			preview => (preview.style.backgroundImage = `url(${reader.result})`)
		);
	});

	reader.readAsDataURL(file);
}

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
	openPreviewImage();
	scalePhoto();
	filterPhoto();
	hashTagsValidate();
	sendForm();
	openModal(overlay);
	document.addEventListener('keydown', onUploadFileEscKeydown);
}

uploadFileInput.addEventListener('change', uploadFile);

uploadCloseBtn.addEventListener('click', closeUploadFile);

export { closeUploadFile, previewImage };
