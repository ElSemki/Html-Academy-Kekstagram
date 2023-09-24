import photos from './data.js';
import {
	closeModal,
	closeModalEscEvent,
	openModal,
	renderContent,
} from './utils.js';

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

//* Временно!
commentCountContainer.classList.add('hidden');
commentsLoader.classList.add('hidden');

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
		if (!evt.target.closest('.picture')) return;

		evt.preventDefault();

		const currentImagePath = evt.target
			.closest('.picture')
			.querySelector('.picture__img')
			.getAttribute('src');

		const currentImage = photos.find(photo => photo.url === currentImagePath);

		if (!currentImage) return alert('Ошибка при показе выбранного фото');

		renderBigPhoto(currentImage);

		commentsList.innerHTML = '';
		renderContent(currentImage.comments, commentsList, renderCommentItem);

		openModal(bigPictureContainer);
		closeModalEscEvent(bigPictureContainer);
	});

	bigPictureContainerCloseBtn.addEventListener('click', () => {
		closeModal(bigPictureContainer);
	});
}

export { renderFullSizeImage };
