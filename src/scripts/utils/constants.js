const buttonEdit = document.querySelector('.profile__edit-button');
const buttonsClose = document.querySelectorAll('.popup__close-button');
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
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupSignature = imagePopup.querySelector('.popup__signature');
const popupList = Array.from(document.querySelectorAll('.popup'));
const formList = Array.from(document.querySelectorAll('.popup__form'));
const avatarChangeButton = document.querySelector('.profile__change-avatar');
const popupAvatarChange = document.querySelector('.popup_change-avatar');
const popupAvatarChangeCloseButton = document.querySelector('#closeChangeAvatarWindow');
const formChangeAvatar = document.querySelector('#popup__form_change-avatar');
const avatar = document.querySelector('.profile__avatar');

const validationSelectors = {
  errorInput: '.popup__input_type_error',
  input: '.popup__input',
  buttonSave: '.popup__save-button'
};

const cardSelectors = {
  template: '.card-template',
  element: '.element',
  likeActive: 'element__like_active',
  image: '.element__image',
  signature: '.element__signature',
  like: '.element__like',
  delete: '.element__delete',
  deletePopup: '.popup_delete',
  likeAmount: '.element__like-amount'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
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


export {
  buttonEdit,
  buttonsClose,
  buttonAdd,
  popupEdit,
  popupAdd,
  nameInput,
  jobInput,
  nameProfile,
  jobProfile,
  popupFormEdit,
  cardNameInput,
  imageLinkInput,
  popupFormAdd,
  imagePopup,
  cardsContainer,
  cardTemplate,
  imagePopupPicture,
  imagePopupSignature,
  popupList,
  formList,
  validationSelectors,
  cardSelectors,
  initialCards,
  avatarChangeButton,
  popupAvatarChange,
  popupAvatarChangeCloseButton,
  formChangeAvatar,
  avatar
}