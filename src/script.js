import "./index.css";
import {formElement, formInput, showInputError, hasInvalidInput, isValid} from './components/validate.js';
import {addCard} from './components/card.js';
import {closePopup, closePopupOverlay, openPopup} from './components/modal.js';


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

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach(function (card) {
  addCard(card.name, card.link);
});

function addInputValueEditProfile() {
  openPopup(popupEditProfile);
  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;
}

function submitNameForm() {
  profileName.textContent = fieldName.value;
  profileAbout.textContent = fieldAbout.value;
  closePopup(popupEditProfile);
}

function toggleButtonSubmit(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button-save_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button-save_inactive");
  }
}

enableValidation();

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    setInputEventListeners(formElement);
  });
}


function setInputEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__text"));
  const buttonElement = formElement.querySelector(".popup__button-save");
  toggleButtonSubmit(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonSubmit(inputList, buttonElement);
    });
  });
}







popupList.forEach((popup) => {
  popup.addEventListener("mousedown", closePopupOverlay);
  const buttonClosePopup = popup.querySelector(".popup__close-button");
  buttonClosePopup.addEventListener("click", () => closePopup(popup));
});

buttonEditProfile.addEventListener("click", addInputValueEditProfile);

formEditProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  submitNameForm();
  closePopup(popupAddCard);
});

buttonAddCard.addEventListener("click", () => openPopup(popupAddCard));

popupAddCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addCard(fieldTitlePopupAdd.value, fieldLinkPopupAdd.value);
  closePopup(popupAddCard);
  evt.target.reset();
});
