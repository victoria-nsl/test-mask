import {isEscEvent, setFocusTab} from './utils.js';
import {closeModal} from './modal.js';

const form = document.querySelector('.modal-request__form');

if(form) {
  const fieldsRequired = form.querySelectorAll('[data-required]');
  const inputName = form.querySelector('#customer-name');
  const inputPhone = form.querySelector('#telephone');
  const inputEmail = form.querySelector('#e-mail');
  const textareaQuestion = form.querySelector('#question');

  const popups = document.querySelectorAll('.popup');
  const popupSuccess = document.querySelector('.popup--success');
  const buttonClosePopupSuccess = popupSuccess.querySelector('.popup__button--success');
  const popupError = document.querySelector('.popup--error');
  const buttonClosePopupError = popupError.querySelector('.popup__button--error');


  let isStorageSupport = true;
  let storageName = '';
  let storageEmail = '';
  let storageTel = '';


  try {
    storageName = localStorage.getItem('name');
    storageEmail = localStorage.getItem('email');
    storageTel = localStorage.getItem('tel');

  } catch (err) {
    isStorageSupport = false;
  }

  if (storageName  || storageEmail || storageTel) {
    inputName.value = storageName;
    inputEmail.value = storageEmail;
    inputPhone.value = storageTel;
  }


  const closePopup = () => {
    popups.forEach((popup) => {
      if(popup.classList.contains('popup-show')) {
        popup.classList.remove('popup-show');
      }
    });
    closeModal();
  };

  const onButtonClick = (evt) => {
    evt.preventDefault();
    closePopup();
  };

  const onPopupClick = (evt) => {
    if (evt.target.matches('section')) {
      evt.stopPropagation();
      closePopup();
    }
  };

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  const onButtonTabKeydown = (evt) => {
    setFocusTab(evt, evt.target, evt.target);
  };

  const showPopup = (popup, buttonClosePopup) => {
    popup.classList.add('popup-show');
    buttonClosePopup.focus();

    buttonClosePopup.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onPopupEscKeydown);
    popup.addEventListener('click', onPopupClick);
    buttonClosePopup.addEventListener('keydown', onButtonTabKeydown);
  };

  const onFormSubmit = (evt)  => {

    if(!inputName.value || !inputEmail.value || !textareaQuestion.value) {
      evt.preventDefault();
      fieldsRequired.forEach((fieldRequired) => {
        if(!fieldRequired.value) {
          fieldRequired.classList.add('modal-request__field-error');
        }
      });
      showPopup(popupError, buttonClosePopupError);

    }  else {
      if(isStorageSupport) {
        localStorage.setItem('name', inputName.value);
        localStorage.setItem('email',  inputEmail.value);
        localStorage.setItem('tel',  inputPhone.value);
      }

      fieldsRequired.forEach((fieldRequired) => {
        if(fieldRequired.value && fieldRequired.classList.contains('modal-request__field-error')) {
          fieldRequired.classList.remove('modal-request__field-error');
        }
      });

      showPopup(popupSuccess,buttonClosePopupSuccess);
    }
  };

  form.addEventListener('submit', onFormSubmit);
}
