const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupCloseEditProfile = popupEditProfile.querySelector(
  ".popup__close-button"
);
const buttonSaveProfile = popupEditProfile.querySelector(".popup__button-save");
const formEditProfile = document.getElementById("popup-edit-profile-form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const fieldName = document.querySelector(".popup-edit-profile__field-name");
const fieldAbout = document.querySelector(".popup-edit-profile__field-about");

const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
const popupCloseAddCard = popupAddCard.querySelector(".popup__close-button");
const buttonSaveCard = popupAddCard.querySelector(".popup__button-save");
const popupAddCardForm = document.getElementById("popup-add-card-form");
const fieldTitlePopupAdd = popupAddCard.querySelector(
  ".popup-add-card__field-title"
);
const fieldLinkPopupAdd = popupAddCard.querySelector(
  ".popup-add-card__field-link"
);

const popupCardOpen = document.querySelector(".popup_type_open-card");
const popupCardOpenImage = popupCardOpen.querySelector(".popup__open-img");
const popupCardOpenCaption = popupCardOpen.querySelector(".popup__caption");
const popupCardOpenCloseButton = popupCardOpen.querySelector(
  ".popup__close-button"
);

const cardContainer = document.querySelector(".cards");

const cardTemplateElement = document.getElementById("card-template");
const cardPrototypeElement =
  cardTemplateElement.content.querySelector(".photo-card");

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

function addCard(name, imageUrl) {
  const cardElement = cardPrototypeElement.cloneNode(true);
  const titleElement = cardElement.querySelector(".photo-card__title");
  const imgElement = cardElement.querySelector(".photo-card__img");
  const buttonLikeCard = cardElement.querySelector(".photo-card__button-like");
  const buttonDeleteCard = cardElement.querySelector(
    ".photo-card__button-delete"
  );

  titleElement.textContent = name;
  imgElement.src = imageUrl;

  buttonLikeCard.addEventListener("click", setLike);

  buttonDeleteCard.addEventListener("click", deleteCard);

  imgElement.addEventListener("click", () => {
    openPopup(popupCardOpen);
    popupCardOpenImage.src = imgElement.src;
    popupCardOpenImage.alt = titleElement.textContent;
    popupCardOpenCaption.textContent = titleElement.textContent;
  });

  cardContainer.prepend(cardElement);
}

function setLike (event) {
  event.target.classList.toggle("photo-card__button-like_active");
}

function deleteCard (event) {
  event.target.parentElement.remove();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

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

buttonEditProfile.addEventListener("click", addInputValueEditProfile);

popupCloseEditProfile.addEventListener("click", () =>
  closePopup(popupEditProfile)
);

formEditProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  submitNameForm();
  closePopup(popupAddCard);
});

buttonAddCard.addEventListener("click", () => openPopup(popupAddCard));

popupCloseAddCard.addEventListener("click", () => closePopup(popupAddCard));

popupAddCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addCard(fieldTitlePopupAdd.value, fieldLinkPopupAdd.value);
  closePopup(popupAddCard);
});

popupCardOpenCloseButton.addEventListener("click", () =>
  closePopup(popupCardOpen)
);
