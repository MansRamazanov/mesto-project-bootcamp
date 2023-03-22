import { openPopup } from "./modal";
import { deleteCardFromServer } from "./api";
import { toggleLike } from "../script.js";

const popupCardOpen = document.querySelector(".popup_type_open-card");
const popupCardOpenImage = popupCardOpen.querySelector(".popup__open-img");
const popupCardOpenCaption = popupCardOpen.querySelector(".popup__caption");
const cardTemplateElement = document.getElementById("card-template");
const cardPrototypeElement =
  cardTemplateElement.content.querySelector(".photo-card");
const cardContainer = document.querySelector(".cards");

export function createCard(card, userId) {
  const cardElement = cardPrototypeElement.cloneNode(true);
  const titleElement = cardElement.querySelector(".photo-card__title");
  const imgElement = cardElement.querySelector(".photo-card__img");
  const buttonLikeCard = cardElement.querySelector(".photo-card__button-like");
  const buttonDeleteCard = cardElement.querySelector(
    ".photo-card__button-delete"
  );
  const likeCounter = cardElement.querySelector(".photo-card__like-counter");
  const likes = card.likes;
  likes.forEach((obj) => {
    if (obj._id === userId) {
      buttonLikeCard.classList.add("photo-card__button-like_active");
    }
  });

  titleElement.textContent = card.name;
  imgElement.src = card.link;
  imgElement.alt = card.name;
  likeCounter.textContent = card.likes.length;

  if (card.owner._id == userId) {
    buttonDeleteCard.addEventListener("click", (event) => {
      deleteCardFromServer(card._id);
      deleteCard(event);
    });
  } else {
    buttonDeleteCard.remove();
  }

  buttonLikeCard.addEventListener("click", () =>
    toggleLike(buttonLikeCard, card._id, likeCounter)
  );

  imgElement.addEventListener("click", () => openImagePopup(card));

  return cardElement;
}

export function addCard(card, userId) {
  const newCard = createCard(card, userId);
  cardContainer.prepend(newCard);
}

function openImagePopup(card) {
  openPopup(popupCardOpen);
  popupCardOpenImage.src = card.link;
  popupCardOpenImage.alt = card.name;
  popupCardOpenCaption.textContent = card.name;
}

function deleteCard(event) {
  event.target.closest(".photo-card").remove();
}
