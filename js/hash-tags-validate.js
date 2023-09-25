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

	const hashTagInputText = hashTagInput.value.toLowerCase().trim();
	if (!hashTagInputText) return;

	const hashTagsArr = hashTagInputText.split(' ');
	if (hashTagsArr.length === 0) return;

	const isStartNotHashTag = hashTagsArr.some(hashTag => hashTag.at(0) !== '#');
	if (isStartNotHashTag)
		hashTagInput.setCustomValidity('Хэш-тег должен начинаться с символа #');

	const isOnlyLatticeHashTag = hashTagsArr.some(hashTag => hashTag === '#');
	if (isOnlyLatticeHashTag)
		hashTagInput.setCustomValidity('Хэш-тег не может состоять только из #');

	const hasHashTagsDuplicate = hashTagsArr.some(
		(val, i, arr) => arr.indexOf(val, i + 1) >= i + 1
	);
	if (hasHashTagsDuplicate)
		hashTagInput.setCustomValidity('Хэш-теги не должны повторяться');

	const isSplitSpaсeHashTag = hashTagsArr.some(
		hashTag => hashTag.indexOf('#', 1) >= 1
	);
	if (isSplitSpaсeHashTag)
		hashTagInput.setCustomValidity('Хэш-теги разделяются пробелами');

	const isContainsUnvalidSymbol = hashTagsArr.some(hashTag =>
		forbiddenSymbols.some(symbol => hashTag.indexOf(symbol) >= 1)
	);
	if (isContainsUnvalidSymbol)
		hashTagInput.setCustomValidity('Хэш-тег имеет запрещенный символ');

	const isLongHashTag = hashTagsArr.some(hashTag => hashTag.length > 20);
	if (isLongHashTag)
		hashTagInput.setCustomValidity('Максимальная длинна хэш-тега 20 символов');

	if (hashTagsArr.length > 5)
		hashTagInput.setCustomValidity('Максимум 5 хэш-тегов');

	hashTagInput.reportValidity();
}

function hashTagsValidate() {
	hashTagInput.addEventListener('input', validateHashTags);
}

export { hashTagsValidate };
