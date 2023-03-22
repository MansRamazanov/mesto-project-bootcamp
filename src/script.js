import "./index.css";
import { enableValidation } from "./components/validate.js";
import { addCard } from "./components/card.js";
import {
  closePopup,
  closePopupOverlay,
  openPopup,
} from "./components/modal.js";
import {
  getCardsArray,
  getUserProfile,
  patchUserProfile,
  postNewCard,
  patchUserAvatar,
  putLikeToServer,
  deleteLikeToServer,
} from "./components/api.js";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const formEditProfile = document.getElementById("popup-edit-profile-form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const fieldName = document.querySelector(".popup-edit-profile__field-name");
const fieldAbout = document.querySelector(".popup-edit-profile__field-about");

const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupAddCardForm = document.getElementById("popup-add-card-form");
const fieldTitlePopupAdd = popupAddCard.querySelector(
  ".popup-add-card__field-title"
);
const fieldLinkPopupAdd = popupAddCard.querySelector(
  ".popup-add-card__field-link"
);

const popupList = document.querySelectorAll(".popup");

const buttonSetAvatar = document.querySelector(".profile__img");
const popupSetAvatar = document.querySelector(".popup_type_set-avatar");
const popupSetAvatarForm = document.getElementById("popup-set-avatar-form");
const fieldSetAvatar = document.querySelector(".popup-set-avatar__field-link");

const validateConfig = {
  formElement: ".popup__form",
  formInput: ".popup__text",
  buttonElement: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "form__input-error_active",
};

Promise.all([getUserProfile(), getCardsArray()])
  .then(([userInfo, cards]) => {
    profileName.textContent = userInfo.name;
    profileAbout.textContent = userInfo.about;
    buttonSetAvatar.src = userInfo.avatar;
    cards.forEach((card) => {
      addCard(card, userInfo._id);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function addInputValueEditProfile() {
  openPopup(popupEditProfile);
  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;
}

enableValidation(validateConfig);

function addNewCard(event) {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";
  postNewCard(fieldTitlePopupAdd, fieldLinkPopupAdd)
    .then((res) => {
      addCard(res, res.owner._id);
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      event.submitter.textContent = "Создать";
    });
}

function addUserAvatar(event) {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";
  patchUserAvatar(fieldSetAvatar)
    .then((res) => {
      buttonSetAvatar.src = res.avatar;
      closePopup(popupSetAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
}

export function toggleLike(buttonLikeCard, cardId, likeCounter) {
  if (buttonLikeCard.classList.contains("photo-card__button-like_active")) {
    deleteLikeToServer(cardId)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      buttonLikeCard.classList.remove("photo-card__button-like_active");
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    putLikeToServer(cardId)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
      buttonLikeCard.classList.add("photo-card__button-like_active");
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", closePopupOverlay);
  const buttonClosePopup = popup.querySelector(".popup__close-button");
  buttonClosePopup.addEventListener("click", () => closePopup(popup));
});

buttonEditProfile.addEventListener("click", addInputValueEditProfile);

formEditProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  event.submitter.textContent = "Сохранение...";
  patchUserProfile(fieldName, fieldAbout)
    .then((res) => {
      profileName.textContent = res.name;
      profileAbout.textContent = res.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      event.submitter.textContent = "Сохранить";
    });
});

buttonAddCard.addEventListener("click", () => openPopup(popupAddCard));

popupAddCardForm.addEventListener("submit", addNewCard);

buttonSetAvatar.addEventListener("click", () => openPopup(popupSetAvatar));

popupSetAvatarForm.addEventListener("submit", addUserAvatar);
