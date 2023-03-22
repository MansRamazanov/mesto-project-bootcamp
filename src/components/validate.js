function showInputError(formElement, inputElement, errorMessage, validateConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validateConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validateConfig.errorClass);
}

function hasInvalidInput(inputList, validateConfig) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function hideInputError(formElement, inputElement, validateConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validateConfig.inputErrorClass);
  errorElement.classList.remove(validateConfig.errorClass);
  errorElement.textContent = "";
}

export function enableValidation(validateConfig) {
  const formList = Array.from(document.querySelectorAll(validateConfig.formElement));
  formList.forEach((formElement) => {
    setInputEventListeners(formElement, validateConfig);
  });
}

function isValid(formElement, inputElement, validateConfig) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validateConfig);
  } else {
    hideInputError(formElement, inputElement, validateConfig);
  }
}

function toggleButtonSubmit(inputList,buttonElement, validateConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validateConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validateConfig.inactiveButtonClass);
  }
}

function setInputEventListeners(formElement, validateConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validateConfig.formInput));
  const buttonElement = formElement.querySelector(validateConfig.buttonElement)

  toggleButtonSubmit(inputList, buttonElement, validateConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validateConfig);
      toggleButtonSubmit(inputList, buttonElement, validateConfig);
    });
  });
}
