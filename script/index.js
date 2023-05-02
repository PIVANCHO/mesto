let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__save-button');
let popupWindow = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job')
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');

function openEditWindow() {
  popupWindow.classList.add('popup__opened');
  nameInput.value = nameProfile.innerText;
  jobInput.value = jobProfile.innerText;
}

function closeEditWindow() {
  popupWindow.classList.remove('popup__opened');
}

function saveEditChanges() {
  nameProfile.innerText = nameInput.value;
  jobProfile.innerText = jobInput.value;
  popupWindow.classList.remove('popup__opened');
}

editButton.addEventListener('click', openEditWindow);
closeButton.addEventListener('click', closeEditWindow);
saveButton.addEventListener('click', saveEditChanges);