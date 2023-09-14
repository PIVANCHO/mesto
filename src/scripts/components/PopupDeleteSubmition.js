import Popup from "./Popup.js";
import { api } from "../../index.js";

export default class PopupDeleteSubmition extends Popup {
  constructor({popupSelector}) {
    super({popupSelector});
    this._popup = document.querySelector(popupSelector);
  }

  setDeleteSubmition(cardId) {
    this._form = document.forms.form_delete;
    this._form.addEventListener('submit', () => {
      api.deleteCard(cardId);
      super.close();
    });
  }
}