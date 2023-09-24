import { closeModal, isEscEvent, openModal } from './utils.js';

const uploadFileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const previewImage = overlay.querySelector('.img-upload__preview > img');
const uploadCloseBtn = overlay.querySelector('#upload-cancel');

const scaleContainer = overlay.querySelector('.img-upload__scale');
const controlInput = scaleContainer.querySelector('.scale__control--value');

const effectsList = overlay.querySelector('.effects__list');
const effectsRadios = effectsList.querySelectorAll('.effects__radio');
const effectLevelContainer = overlay.querySelector('.effect-level');

const slider = effectLevelContainer.querySelector('.effect-level__slider');
const sliderValue = effectLevelContainer.querySelector('.effect-level__value');

let effectValue;

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

function effectsListChangeHandler(evt) {
	if (!evt.target.closest('.effects__radio')) return;

	effectValue = evt.target.value;

	previewImage.classList.forEach(className =>
		previewImage.classList.remove(className)
	);

	if (effectValue === 'none') {
		effectLevelContainer.classList.add('hidden');
		previewImage.classList.remove(`effects__preview--${effectValue}`);
	} else {
		effectLevelContainer.classList.remove('hidden');
		previewImage.classList.add(`effects__preview--${effectValue}`);
	}

	switch (effectValue) {
		case 'chrome':
		case 'sepia':
			slider.noUiSlider.updateOptions({
				range: {
					min: 0,
					max: 1,
				},
				start: 1,
				step: 0.1,
			});
			break;
		case 'marvin':
			slider.noUiSlider.updateOptions({
				range: {
					min: 0,
					max: 100,
				},
				start: 100,
				step: 1,
			});
			break;
		case 'phobos':
			slider.noUiSlider.updateOptions({
				range: {
					min: 0,
					max: 3,
				},
				start: 3,
				step: 0.1,
			});
			break;
		case 'heat':
			slider.noUiSlider.updateOptions({
				range: {
					min: 1,
					max: 3,
				},
				start: 3,
				step: 0.1,
			});
			break;
	}
}

function resetValues() {
	controlInput.value = '100%';

	previewImage.style.transform = 'scale(1)';

	previewImage.classList.forEach(className =>
		previewImage.classList.remove(className)
	);

	previewImage.style.filter = 'none';

	effectLevelContainer.classList.add('hidden');

	effectsRadios.forEach(radio => (radio.checked = false));

	effectsRadios[0].checked = true;

	effectValue = effectsRadios[0].value;

	sliderValue.value = '';
}

function closeUploadFile() {
	scaleContainer.removeEventListener('click', scaleContainerClickHandler);
	effectsList.removeEventListener('change', effectsListChangeHandler);
	document.removeEventListener('keydown', onUploadFileEscKeydown);

	resetValues();

	slider.noUiSlider.destroy();

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

		scaleContainer.addEventListener('click', scaleContainerClickHandler);

		noUiSlider.create(slider, {
			range: {
				min: 0,
				max: 100,
			},
			start: 100,
			step: 1,
			connect: 'lower',
			format: {
				to: function (value) {
					if (Number.isInteger(value)) {
						return value.toFixed(0);
					}
					return value.toFixed(1);
				},
				from: function (value) {
					return parseFloat(value);
				},
			},
		});

		effectsList.addEventListener('change', effectsListChangeHandler);

		slider.noUiSlider.on('update', (values, handle) => {
			sliderValue.value = values[handle];
			switch (effectValue) {
				case 'none':
					previewImage.style.filter = 'none';
					sliderValue.value = '';
					break;
				case 'chrome':
					previewImage.style.filter = `grayscale(${sliderValue.value})`;
					break;
				case 'sepia':
					previewImage.style.filter = `sepia(${sliderValue.value})`;
					break;
				case 'marvin':
					previewImage.style.filter = `invert(${sliderValue.value}%)`;
					break;
				case 'phobos':
					previewImage.style.filter = `blur(${sliderValue.value}px)`;
					break;
				case 'heat':
					previewImage.style.filter = `brightness(${sliderValue.value})`;
					break;
			}
		});

		document.addEventListener('keydown', onUploadFileEscKeydown);
	});

	uploadCloseBtn.addEventListener('click', closeUploadFile);
}

export { uploadFile };
