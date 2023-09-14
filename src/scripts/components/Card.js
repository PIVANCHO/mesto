import Popup from "./Popup.js";
import {
  userInfo,
  api
} from "../../index.js";
import PopupWithForm from "./PopupWithForm.js";

export default class Card {
  constructor({image, signature, likes, owner, id}, cardSelectors, handleCardClick, handleDeleteClick) {
    this._image = image;
    this._signature = signature;
    this._likes = likes;
    this._owner = owner;
    this.id = id;
    this._cardSelectors = cardSelectors;
    this.handleDeleteClick = handleDeleteClick;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelectors.template)
      .content
      .querySelector(this._cardSelectors.element)
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeButton(cardLikeButton) {
    if (!cardLikeButton.classList.contains(this._cardSelectors.likeActive)) {
      cardLikeButton.classList.toggle(this._cardSelectors.likeActive);
      api.putLike(this.id, this._owner);
    } else {
      cardLikeButton.classList.toggle(this._cardSelectors.likeActive);
      api.deleteLike(this.id);
    }
  }

  _setEventListeners(cardLikeButton, imageElement) {
    cardLikeButton.addEventListener('click', () => {
      this._handleLikeButton(cardLikeButton);
    });

    imageElement.addEventListener('click', () => {
      this.handleCardClick(this._signature, this._image);
    });
  }

  _checkLike() {
    this._likes.forEach((user) => {
      if (user.name !== userInfo.getUserInfo().name) {
        this._like.classList.remove(this._cardSelectors.likeActive);
      } else {
        this._like.classList.add(this._cardSelectors.likeActive);
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardSelectors.image);
    this._cardSignature = this._element.querySelector(this._cardSelectors.signature);
    this._like = this._element.querySelector(this._cardSelectors.like);
    this._delete = this._element.querySelector(this._cardSelectors.delete);

    if (userInfo.getUserInfo().name === this._owner.name) {
      this._delete.addEventListener('click', () => {
        this.handleDeleteClick(this.id);
      });
    } else {
      this._delete.disabled = true;
      this._delete.style.opacity = 0;
    }

    this._checkLike();

    this._likeAmount = this._element.querySelector(this._cardSelectors.likeAmount);

    this._cardImage.src = this._image;
    this._cardImage.alt = this._signature;
    this._cardSignature.textContent = this._signature;
    this._likeAmount.textContent = this._likes.length.toString();

    this._setEventListeners(this._like, this._cardImage);

    return this._element;
  }
}