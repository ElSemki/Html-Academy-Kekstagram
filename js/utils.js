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

const isEscEvent = evt => evt.code === 'Escape' || evt.code === 'Esc';

function renderContent(arr, container, callback) {
	const contentFragment = document.createDocumentFragment();
	arr.forEach(el => contentFragment.append(callback(el)));
	container.append(contentFragment);
}

function openModal(modal) {
	modal.classList.remove('hidden');
	document.body.classList.add('modal-open');
}

function closeModal(modal) {
	modal.classList.add('hidden');
	document.body.classList.remove('modal-open');
}

const closeModalEscEvent = modal => {
	document.addEventListener('keydown', evt => {
		if (!modal.classList.contains('hidden') && isEscEvent(evt))
			closeModal(modal);
	});
};

// function checkingCollectionForCorrectFormat(arr, callback) {
// 	return arr.some(callback);
// }

function showInvalidValueInputError(inputElement, message) {
	inputElement.style.border = '1px solid red';
	inputElement.setCustomValidity(message);
}

export {
	closeModal,
	closeModalEscEvent,
	getRandomIntInclusive,
	isEscEvent,
	openModal,
	renderContent,
	showInvalidValueInputError,
};
