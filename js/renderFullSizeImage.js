import photos from './data.js';
import { isEscEvent, renderContent } from './utils.js';

const picturesList = document.querySelector('.pictures');
const bigPictureContainer = document.querySelector('.big-picture');
const pictureImg = bigPictureContainer.querySelector('.big-picture__img > img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const commentCountContainer = bigPictureContainer.querySelector(
	'.social__comment-count'
);
const commentsCount = commentCountContainer.querySelector('.comments-count');
const pictureCaption = bigPictureContainer.querySelector('.social__caption');
const commentsList = bigPictureContainer.querySelector('.social__comments');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
const bigPictureContainerCloseBtn =
	bigPictureContainer.querySelector('#picture-cancel');

const onBigPhotoContainerEscKeydown = evt => {
	if (isEscEvent(evt)) {
		closeBigPhotoContainer();
	}
};

function openBigPhotoContainer() {
	bigPictureContainer.classList.remove('hidden');
	document.body.classList.add('modal-open');

	//* Временно!
	commentCountContainer.classList.add('hidden');
	commentsLoader.classList.add('hidden');

	document.addEventListener('keydown', onBigPhotoContainerEscKeydown);
}

function closeBigPhotoContainer() {
	bigPictureContainer.classList.add('hidden');
	document.body.classList.remove('modal-open');

	document.removeEventListener('keydown', onBigPhotoContainerEscKeydown);
}

function renderBigPhoto({ url, likes, comments, description }) {
	pictureImg.src = url;
	likesCount.textContent = likes;
	commentsCount.textContent = comments.length;
	pictureCaption.textContent = description;
}

function renderCommentItem({ avatar, name, message }) {
	const photoCommentItem = document.createElement('li');
	photoCommentItem.classList.add('social__comment');
	photoCommentItem.innerHTML = `
			<img
				class="social__picture"
				src="${avatar}"
				alt="${name}"
				width="35" height="35">
			<p class="social__text">${message}</p>
			`;
	return photoCommentItem;
}

function renderFullSizeImage() {
	picturesList.addEventListener('click', evt => {
		if (!evt.target.closest('.picture')) {
			return;
		}

		evt.preventDefault();

		const currentImage = photos.find(
			photo => photo.url === evt.target.getAttribute('src')
		);

		if (!currentImage) return alert('Ошибка при показе выбранного фото');

		renderBigPhoto(currentImage);

		commentsList.innerHTML = '';
		renderContent(currentImage.comments, commentsList, renderCommentItem);

		openBigPhotoContainer();
	});

	bigPictureContainerCloseBtn.addEventListener('click', closeBigPhotoContainer);
}

export { renderFullSizeImage };
