import { isEscEvent } from './utils.js';

const successPopup = document
	.querySelector('#success')
	.content.querySelector('.success');

const errorPopup = document
	.querySelector('#error')
	.content.querySelector('.error');

let popup;

function onPopupEscKeyDown(evt) {
	if (isEscEvent(evt)) {
		popup.remove();
	}
}

function showSendStatusPopup(isSend) {
	popup = isSend === true ? successPopup : errorPopup;
	document.body.append(popup);
	popup.addEventListener('click', evt => {
		if (
			evt.target.closest(
				isSend === true ? '.success__button' : '.error__button'
			)
		) {
			popup.remove();
		}

		document.addEventListener('keydown', onPopupEscKeyDown);
	});
}

function deleteSendStatusPopupEventListener() {
	document.removeEventListener('keydown', onPopupEscKeyDown);
}

export { deleteSendStatusPopupEventListener, showSendStatusPopup };
