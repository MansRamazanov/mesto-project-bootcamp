const popupCardOpen = document.querySelector(".popup_type_open-card");
const popupCardOpenImage = popupCardOpen.querySelector(".popup__open-img");
const popupCardOpenCaption = popupCardOpen.querySelector(".popup__caption");
const cardTemplateElement = document.getElementById("card-template");
const cardPrototypeElement = cardTemplateElement.content.querySelector(".photo-card");
const cardContainer = document.querySelector(".cards");

function createCard(name, imageUrl) {
  const cardElement = cardPrototypeElement.cloneNode(true);
  const titleElement = cardElement.querySelector(".photo-card__title");
  const imgElement = cardElement.querySelector(".photo-card__img");
  const buttonLikeCard = cardElement.querySelector(".photo-card__button-like");
  const buttonDeleteCard = cardElement.querySelector(
    ".photo-card__button-delete"
  );

  titleElement.textContent = name;
  imgElement.src = imageUrl;
  imgElement.alt = name;

  buttonLikeCard.addEventListener("click", setLike);

  buttonDeleteCard.addEventListener("click", deleteCard);

  imgElement.addEventListener("click", () => {
    openPopup(popupCardOpen);
    popupCardOpenImage.src = imgElement.src;
    popupCardOpenImage.alt = titleElement.textContent;
    popupCardOpenCaption.textContent = titleElement.textContent;
  });
  return cardElement;
}

export function addCard(name, imageUrl) {
  const card = createCard(name, imageUrl);
  cardContainer.prepend(card);
}

function setLike(event) {
  event.target.classList.toggle("photo-card__button-like_active");
}

function deleteCard(event) {
  event.target.closest(".photo-card").remove();
}
