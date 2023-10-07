import { postData } from '../utils.js';
import { showSendStatusPopup } from './dispatch-messages.js';
import { closeUploadFile } from './upload-file.js';

const uploadForm = document.querySelector('#upload-select-image');

async function sendPhoto(data) {
	try {
		const response = await postData(
			'https://23.javascript.pages.academy/kekstagram',
			data
		);

		console.log(response);

		showSendStatusPopup(true);
	} catch (e) {
		showSendStatusPopup(false);
		console.error(e);
	} finally {
		uploadForm.reset();
		closeUploadFile();
		deleteUploadFormEventListener();
	}
}

function uploadFormSubmitHandler(evt) {
	evt.preventDefault();

	const formData = new FormData(uploadForm);

	sendPhoto(formData);
}

function sendForm() {
	uploadForm.addEventListener('submit', uploadFormSubmitHandler);
}

function deleteUploadFormEventListener() {
	uploadForm.removeEventListener('submit', uploadFormSubmitHandler);
}

export { deleteUploadFormEventListener, sendForm };
