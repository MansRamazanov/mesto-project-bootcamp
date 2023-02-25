const buttonEdit = document.querySelector('.profile__edit-button-img');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');

buttonEdit.addEventListener('click', function() {popup.classList.remove('popup_opened');});

popupCloseButton.addEventListener('click', function() {popup.classList.add('popup_opened');});
