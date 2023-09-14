export default class Card {
  constructor({image, signature, likes, owner, id}, userInfo, cardSelectors, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._image = image;
    this._signature = signature;
    this._likes = likes;
    this._owner = owner;
    this.id = id;
    this._userInfo = userInfo;
    this._cardSelectors = cardSelectors;
    this.handleDeleteClick = handleDeleteClick;
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelectors.template)
      .content
      .querySelector(this._cardSelectors.element)
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(cardLikeButton, imageElement) {
    cardLikeButton.addEventListener('click', () => {
      this.handleLikeClick(cardLikeButton, this._cardSelectors.likeActive, this.id, this._owner, this._likeAmount);
    });

    imageElement.addEventListener('click', () => {
      this.handleCardClick(this._signature, this._image);
    });
  }

  _checkLike() {
    this._likes.forEach((user) => {
      if (user.name !== this._userInfo.getUserInfo().name) {
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
    this._likeAmount = this._element.querySelector(this._cardSelectors.likeAmount);
    
    if (this._userInfo.getUserInfo().name === this._owner.name) {
      this._delete.addEventListener('click', () => {
        this.handleDeleteClick(this.id, this._delete, this._cardSelectors.element);
      });
    } else {
      this._delete.disabled = true;
      this._delete.style.opacity = 0;
    }

    this._checkLike();

    this._cardImage.src = this._image;
    this._cardImage.alt = this._signature;
    this._cardSignature.textContent = this._signature;
    this._likeAmount.textContent = this._likes.length.toString();

    this._setEventListeners(this._like, this._cardImage);

    return this._element;
  }
}