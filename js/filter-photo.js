import { previewImage } from './upload-file.js';

const effectLevelContainer = document.querySelector('.effect-level');
const slider = effectLevelContainer.querySelector('.effect-level__slider');
const sliderValue = effectLevelContainer.querySelector('.effect-level__value');

const effectsList = document.querySelector('.effects__list');
const effectsRadios = effectsList.querySelectorAll('.effects__radio');

let effectValue;

function effectsListChangeHandler(evt) {
	if (!evt.target.closest('.effects__radio')) return;

	effectValue = evt.target.value;

	previewImage.classList.forEach(className =>
		previewImage.classList.remove(className)
	);

	if (effectValue === 'none') {
		effectLevelContainer.classList.add('hidden');
		previewImage.classList.remove(`effects__preview--${effectValue}`);
		previewImage.style.filter = 'none';
		sliderValue.value = '';
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

function filterPhoto() {
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
}

function resetFilterEffects() {
	previewImage.style.filter = 'none';

	effectLevelContainer.classList.add('hidden');

	effectsRadios.forEach(radio => (radio.checked = false));

	effectsRadios[0].checked = true;

	effectValue = effectsRadios[0].value;

	sliderValue.value = '';

	slider.noUiSlider.destroy();
}

function deleteEffectsListEventListener() {
	effectsList.removeEventListener('change', effectsListChangeHandler);
}

export { deleteEffectsListEventListener, filterPhoto, resetFilterEffects };
