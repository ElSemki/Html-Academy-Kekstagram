import { previewImage } from './upload-file.js';

const scaleContainer = document.querySelector('.img-upload__scale');
const controlInput = document.querySelector('.scale__control--value');

function changeOfScale(operation) {
	let numericValueInput = parseInt(controlInput.value);
	controlInput.value =
		operation === 'smaller'
			? `${(numericValueInput -= 25)}%`
			: `${(numericValueInput += 25)}%`;
	previewImage.style.transform = `scale(${numericValueInput / 100})`;
}

function scaleContainerClickHandler(evt) {
	if (evt.target.closest('.scale__control--smaller')) {
		if (parseInt(controlInput.value) <= 25) return;
		changeOfScale('smaller');
	}

	if (evt.target.closest('.scale__control--bigger')) {
		if (parseInt(controlInput.value) >= 100) return;
		changeOfScale('bigger');
	}
}

function scalePhoto() {
	scaleContainer.addEventListener('click', scaleContainerClickHandler);
}

function resetScalePhoto() {
	controlInput.value = '100%';
	previewImage.style.transform = 'scale(1)';
}

const deleteScaleContainerEventListener = () =>
	scaleContainer.removeEventListener('click', scaleContainerClickHandler);

export { deleteScaleContainerEventListener, resetScalePhoto, scalePhoto };
