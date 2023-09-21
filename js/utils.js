function getRandomIntInclusive(min, max) {
	if (typeof min !== 'number' || typeof max !== 'number') {
		return alert('Введите числовое значение!');
	}

	if (min > max) {
		[min, max] = [max, min];
	}

	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const checkingDeepLongStrings = (str, length) =>
	str.length > length ? false : true;

const isEscEvent = evt => evt.code === ('Escape' || 'Esc');

export { checkingDeepLongStrings, getRandomIntInclusive, isEscEvent };
