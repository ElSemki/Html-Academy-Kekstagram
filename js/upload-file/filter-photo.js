import { previewImage } from './upload-file.js';

const effectLevelContainer = document.querySelector('.effect-level');
const slider = effectLevelContainer.querySelector('.effect-level__slider');
const sliderValue = effectLevelContainer.querySelector('.effect-level__value');

const effectsList = document.querySelector('.effects__list');
const effectsRadios = effectsList.querySelectorAll('.effects__radio');

const effects = {
	chrome: {
		min: 0,
		max: 1,
		start: 1,
		step: 0.1,
		filter: () =>
			(previewImage.style.filter = `grayscale(${sliderValue.value})`),
	},
	sepia: {
		min: 0,
		max: 1,
		start: 1,
		step: 0.1,
		filter: () => (previewImage.style.filter = `sepia(${sliderValue.value})`),
	},
	marvin: {
		min: 0,
		max: 100,
		start: 100,
		step: 1,
		filter: () => (previewImage.style.filter = `invert(${sliderValue.value}%)`),
	},
	phobos: {
		min: 0,
		max: 3,
		start: 3,
		step: 0.1,
		filter: () => (previewImage.style.filter = `blur(${sliderValue.value}px)`),
	},
	heat: {
		min: 1,
		max: 3,
		start: 3,
		step: 0.1,
		filter: () =>
			(previewImage.style.filter = `brightness(${sliderValue.value})`),
	},
};

let effectValue;

function effectsListChangeHandler(evt) {
	if (!evt.target.closest('.effects__radio')) return;

	effectValue = evt.target.value;

	previewImage.classList.forEach(className =>
		previewImage.classList.remove(className)
	);

	if (effectValue === 'none') {
		effectLevelContainer.classList.add('hidden');
		previewImage.style.filter = 'none';
		sliderValue.value = '';
		return;
	}

	effectLevelContainer.classList.remove('hidden');
	previewImage.classList.add(`effects__preview--${effectValue}`);

	slider.noUiSlider.updateOptions({
		range: {
			min: effects[effectValue].min,
			max: effects[effectValue].max,
		},
		start: effects[effectValue].start,
		step: effects[effectValue].step,
	});
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
		effects[effectValue]?.filter();
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
	effectsList.removeEventListener('change', effectsListChangeHandler);
}

export { filterPhoto, resetFilterEffects };
