export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export function closePopupOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 27) {
      closePopup(popup);
    }
  });
}
