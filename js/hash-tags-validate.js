import { checkingForCorrectFormat } from './utils.js';

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

	const isStartNotHashTag = checkingForCorrectFormat(
		hashTagsArr,
		hashTag => hashTag.at(0) !== '#'
	);
	if (isStartNotHashTag)
		hashTagInput.setCustomValidity('Хэш-тег должен начинаться с символа #');

	const isOnlyLatticeHashTag = checkingForCorrectFormat(
		hashTagsArr,
		hashTag => hashTag === '#'
	);
	if (isOnlyLatticeHashTag)
		hashTagInput.setCustomValidity('Хэш-тег не может состоять только из #');

	const hasHashTagsDuplicate = checkingForCorrectFormat(
		hashTagsArr,
		(val, i, arr) => arr.indexOf(val, i + 1) >= i + 1
	);
	if (hasHashTagsDuplicate)
		hashTagInput.setCustomValidity('Хэш-теги не должны повторяться');

	const isSplitSpaсeHashTag = checkingForCorrectFormat(
		hashTagsArr,
		hashTag => hashTag.indexOf('#', 1) >= 1
	);
	if (isSplitSpaсeHashTag)
		hashTagInput.setCustomValidity('Хэш-теги разделяются пробелами');

	const isContainsUnvalidSymbol = hashTagsArr.some(hashTag =>
		forbiddenSymbols.some(symbol => hashTag.indexOf(symbol) >= 1)
	);
	if (isContainsUnvalidSymbol)
		hashTagInput.setCustomValidity('Хэш-тег имеет запрещенный символ');

	const isLongHashTag = checkingForCorrectFormat(
		hashTagsArr,
		hashTag => hashTag.length > 20
	);
	if (isLongHashTag)
		hashTagInput.setCustomValidity('Максимальная длинна хэш-тега 20 символов');

	const isHashTagsMoreFive = hashTagsArr.length > 5;
	if (isHashTagsMoreFive)
		hashTagInput.setCustomValidity('Максимум 5 хэш-тегов');

	const arrayOfValidityChecks = [
		isStartNotHashTag,
		isOnlyLatticeHashTag,
		hasHashTagsDuplicate,
		isSplitSpaсeHashTag,
		isContainsUnvalidSymbol,
		isLongHashTag,
	];

	if (
		checkingForCorrectFormat(arrayOfValidityChecks, item => item === true) ||
		isHashTagsMoreFive
	) {
		hashTagInput.style.border = '1px solid red';
	} else {
		hashTagInput.style.border = 'none';
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
