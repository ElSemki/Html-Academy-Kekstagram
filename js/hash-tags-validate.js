import { showInvalidValueError } from './utils.js';

const hashTagInput = document.querySelector('.text__hashtags');

const forbiddenSymbols = [
	' ',
	'@',
	'.',
	',',
	':',
	';',
	'!',
	'$',
	'%',
	'^',
	'*',
	'(',
	')',
	'-',
	'_',
	'+',
	'=',
	'\\',
	'|',
	'/',
	'|',
	"'",
	'"',
	'<',
	'>',
	'{',
	'}',
	'[',
	']',
	'`',
	'№',
	'?',
];

function validateHashTags(evt) {
	const hashTagInput = evt.target;
	hashTagInput.setCustomValidity('');
	hashTagInput.style.border = 'none';

	const hashTagInputText = hashTagInput.value.toLowerCase().trim();
	if (!hashTagInputText) return;

	const hashTagsArr = hashTagInputText.split(' ');
	if (hashTagsArr.length === 0) return;

	hashTagsArr.forEach((hashTag, i, arr) => {
		if (hashTag.at(0) !== '#') {
			showInvalidValueError(
				hashTagInput,
				'Хэш-тег должен начинаться с символа #'
			);
		}

		if (hashTag === '#') {
			showInvalidValueError(
				hashTagInput,
				'Хэш-тег не может состоять только из #'
			);
		}

		if (hashTag.indexOf('#', 1) >= 1) {
			showInvalidValueError(hashTagInput, 'Хэш-теги разделяются пробелами');
		}

		if (arr.indexOf(hashTag, i + 1) >= i + 1) {
			showInvalidValueError(hashTagInput, 'Хэш-теги не должны повторяться');
		}

		if (forbiddenSymbols.some(symbol => hashTag.indexOf(symbol) >= 1)) {
			showInvalidValueError(hashTagInput, 'Хэш-тег имеет запрещенный символ');
		}

		if (hashTag.length > 20) {
			showInvalidValueError(
				hashTagInput,
				'Максимальная длинна хэш-тега 20 символов'
			);
		}
	});

	if (hashTagsArr.length > 5) {
		showInvalidValueError(hashTagInput, 'Максимум 5 хэш-тегов');
	}

	hashTagInput.reportValidity();
}

function hashTagsValidate() {
	hashTagInput.addEventListener('input', validateHashTags);
}

function deleteHashTagInputEventListener() {
	hashTagInput.removeEventListener('input', validateHashTags);
}

function resetValuesHashTag() {
	hashTagInput.value = '';
	hashTagInput.style.border = 'none';
}

export {
	deleteHashTagInputEventListener,
	hashTagsValidate,
	resetValuesHashTag,
};
