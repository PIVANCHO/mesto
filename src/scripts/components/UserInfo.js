export default class UserInfo {
  constructor({userNameSelector, userDescriptionSelector, userAvatarSelctor}) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelctor);
    this._userId = '';
    this._userCohort = '';
  }

  getUserInfo() {
    const userInfoObject = {
      name: this._userName.textContent,
      about: this._userDescription.textContent,
      avatar: this._userAvatar.src,
      _id: this._userId,
      cohort: this._userCohort
    };

    return userInfoObject;
  }

  setInitialUserInfo({name, about, avatarUrl, userId, userCohort}) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._userAvatar.src = avatarUrl;
    this._userId = userId;
    this._userCohort = userCohort;
  }

  setUserInfo({name, about}) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
  }
}