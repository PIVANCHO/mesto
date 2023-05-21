const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const popupEditWindow = document.querySelector('.popup');
const popupAddWindow = document.getElementById('add-window');
const closeAddButton = document.getElementById('closeAddWindow');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const popupFormEdit = document.querySelector('.popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const imageLinkInput = document.querySelector('.popup__input_type_image-link');
const popupFormAdd = document.getElementById('popup__form_add');
const popupImage = document.getElementById('big-image');
const closePopupImageButton = document.getElementById('closeImageWindow');



function openEditWindow() {
  popupEditWindow.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openAddWindow() {
  popupAddWindow.classList.add('popup_opened');
}

function closeEditWindow() {
  popupEditWindow.classList.remove('popup_opened');
}

function closeAddWindow() {
  popupAddWindow.classList.remove('popup_opened');
}

function closePopupImage() {
  popupImage.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeEditWindow();
}

editButton.addEventListener('click', openEditWindow);
addButton.addEventListener('click', openAddWindow);
closeButton.addEventListener('click', closeEditWindow);
closeAddButton.addEventListener('click', closeAddWindow);
popupFormEdit.addEventListener('submit', handleFormSubmit);
popupFormAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addElement(cardNameInput.value, imageLinkInput.value);
  cardNameInput.value = '';
  imageLinkInput.value = '';
  closeAddWindow();
});
closePopupImageButton.addEventListener('click', closePopupImage);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsList = document.querySelector('.elements');
const cardElement = document.querySelector('.card-template').content;

function addElement(text, link) {
  const itemElement = cardElement.cloneNode(true);
  itemElement.querySelector('.element__signature').innerText = text;
  itemElement.querySelector('.element__image').src = link;
  itemElement.querySelector('.element__image').addEventListener('click', (evt) => {
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__image').src = link;
    popupImage.querySelector('.popup__signature').innerText = text;
  });
  itemElement.querySelector('.element__like').addEventListener('click', (evt) =>{
    evt.target.classList.toggle('element__like_active');
  });
  itemElement.querySelector('.element__delete').addEventListener('click', (evt) => {
    const item = evt.target.closest('.element');
    item.remove();
  });
  cardsList.append(itemElement);
}

initialCards.forEach((item) => {
  addElement(item.name, item.link);
})
