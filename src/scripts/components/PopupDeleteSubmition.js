import Popup from "./Popup.js";

export default class PopupDeleteSubmition extends Popup {
  constructor({popupSelector}, handleDeleteCard) {
    super({popupSelector});
    this._popup = document.querySelector(popupSelector);
    this.handleDeleteCard = handleDeleteCard;
  }

  setDeleteSubmition(cardId, deleteButton, elementSelector) {
    this._form = document.forms.form_delete;
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault;
      this.handleDeleteCard(cardId);
      const item = deleteButton.closest(elementSelector); 
      item.remove();
      super.close();
    });
  }
}