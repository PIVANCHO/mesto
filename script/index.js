let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let popupWindow = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job')
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let popupForm = document.querySelector('.popup__form');

function openEditWindow() {
  popupWindow.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closeEditWindow() {
  popupWindow.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeEditWindow();
}

editButton.addEventListener('click', openEditWindow);
closeButton.addEventListener('click', closeEditWindow);
popupForm.addEventListener('submit', handleFormSubmit);