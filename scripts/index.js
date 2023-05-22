const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelectorAll('.popup__close-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('#popup_edit');
const popupAdd = document.querySelector('#popup_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const popupFormEdit = document.querySelector('#form_profile-edit');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const imageLinkInput = document.querySelector('.popup__input_type_image-link');
const popupFormAdd = document.querySelector('#popup__form_add');
const imagePopup = document.querySelector('#big-image');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;


function openPopup(popup) {             //Open any popup
  popup.classList.add('popup_opened');
}

function closePopup(popup) {            //Close any popup
  popup.classList.remove('popup_opened');
}

function createCard(cardData) {        //Creating a card
  const itemElement = cardTemplate.cloneNode(true);
  const itemElementSignature = itemElement.querySelector('.element__signature');
  const itemElementImage = itemElement.querySelector('.element__image');
  const imagePopupPicture = imagePopup.querySelector('.popup__image');
  const imagePopupSignature = imagePopup.querySelector('.popup__signature');
  const cardLikeButton = itemElement.querySelector('.element__like');
  const cardDeleteButton = itemElement.querySelector('.element__delete');
  itemElementSignature.textContent = cardData.name;
  itemElementImage.src = cardData.link;
  itemElementImage.addEventListener('click', (evt) => {
    openPopup(imagePopup);
    imagePopupPicture.src = cardData.link;
    imagePopupSignature.textContent = cardData.name;
  });
  cardLikeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  cardDeleteButton.addEventListener('click', (evt) => {
    const item = evt.target.closest('.element');
    item.remove();
  });
  return itemElement;
}

function addCard(card) {                //Adding a card to container 
  cardsContainer.prepend(card);
}

buttonClose.forEach((item) => {            // Close opened popup by button
  item.addEventListener('click', (evt) => {
    closePopup(evt.target.closest('.popup'));
  });
});

popupFormEdit.addEventListener('submit', (evt) => { //Edit form submititon
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEdit);
});

buttonEdit.addEventListener('click', () => {   //Open edit popup
  openPopup(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

buttonAdd.addEventListener('click', () => {    //Open card adding popup
  popupAdd.classList.add('popup_opened');
});

popupFormAdd.addEventListener('submit', (evt) => {   //Add form submititon
  evt.preventDefault();
  addCard(createCard({name: cardNameInput.value, link: imageLinkInput.value}));
  popupFormAdd.reset();
  closePopup(popupAdd);
});

initialCards.forEach((item) => {            //Adding initial cards to container
  addCard(createCard(item));
})
