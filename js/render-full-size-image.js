import { photos } from './photos.js';
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
const printCommentsCount = commentCountContainer.querySelector(
	'.print-comments-count'
);

let currentImage;
let commentsLength;

function renderBigPhoto({ url, likes, comments, description }) {
	pictureImg.src = url;
	likesCount.textContent = likes;
	commentsCount.textContent = comments.length;
	pictureCaption.textContent = description;
}

function createCommentItem({ avatar, name, message }) {
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

function renderComments() {
	const printCommentsLength = commentsList.children.length;

	if (printCommentsLength + 5 >= commentsLength) {
		renderContent(
			currentImage.comments.slice(printCommentsLength),
			commentsList,
			createCommentItem
		);
		commentsLoader.classList.add('hidden');
		printCommentsCount.textContent = commentsLength;
	} else {
		renderContent(
			currentImage.comments.slice(printCommentsLength, printCommentsLength + 5),
			commentsList,
			createCommentItem
		);
		printCommentsCount.textContent = printCommentsLength + 5;
	}
}

function renderFullSizeImage(evt) {
	if (!evt.target.closest('.picture')) return;

	evt.preventDefault();

	const currentImagePath = evt.target
		.closest('.picture')
		.querySelector('.picture__img')
		.getAttribute('src');

	currentImage = photos.find(photo => photo.url === currentImagePath);

	if (!currentImage) return alert('Ошибка при показе выбранного фото');

	renderBigPhoto(currentImage);

	commentsLength = currentImage.comments.length;

	commentsList.innerHTML = '';

	if (commentsLength <= 5) {
		renderContent(currentImage.comments, commentsList, createCommentItem);
		commentsLoader.classList.add('hidden');
		printCommentsCount.textContent = commentsLength;
	}

	if (commentsLength > 5) {
		renderContent(
			currentImage.comments.slice(0, 5),
			commentsList,
			createCommentItem
		);
		printCommentsCount.textContent = 5;
		commentsLoader.classList.remove('hidden');
	}

	commentsLoader.addEventListener('click', renderComments);
	openModal(bigPictureContainer);
	closeModalEscEvent(bigPictureContainer);
}

picturesList.addEventListener('click', renderFullSizeImage);

bigPictureContainerCloseBtn.addEventListener('click', () => {
	commentsLoader.removeEventListener('click', renderComments);
	closeModal(bigPictureContainer);
});
