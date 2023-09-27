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

function showInvalidValueInputError(inputElement, message) {
	inputElement.style.border = '1px solid red';
	inputElement.setCustomValidity(message);
}

async function getData(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`${response.status}:, ${response.statusText}`);
	}
	const data = await response.json();
	return data;
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
	isEscEvent,
	openModal,
	postData,
	renderContent,
	showInvalidValueInputError,
};
