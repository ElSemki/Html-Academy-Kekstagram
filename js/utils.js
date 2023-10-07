function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function showInvalidValueInputError(inputElement, message) {
	inputElement.style.border = '1px solid red';
	inputElement.setCustomValidity(message);
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

async function getData(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`${response.status}:, ${response.statusText}`);
	}
	return await response.json();
}

async function postData(url, data) {
	const response = await fetch(url, {
		method: 'POST',
		body: data,
	});

	return await response.json();
}

export {
	closeModal,
	closeModalEscEvent,
	getData,
	getRandomIntInclusive,
	isEscEvent,
	openModal,
	postData,
	renderContent,
	showInvalidValueInputError,
	shuffleArray,
};
