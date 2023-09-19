function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkingDeepLongStrings(str, length) {
	return str.length > length ? false : true;
}

export { checkingDeepLongStrings, getRandomIntInclusive };
