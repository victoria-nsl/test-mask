import {isEscEvent, setFocusTab} from './utils.js';
import {closeModal} from './modal.js';

const form = document.querySelector('.modal-request__form');
const page = document.body;

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

  /*=============LocalStorage===========*/
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

  /*=============Закрытие окна об успешной/неуспешной отправке===========*/
  const closePopup = () => {
    popups.forEach((popup) => {
      if(popup.classList.contains('popup-show')) {
        popup.classList.remove('popup-show');
      }
    });
    page.classList.remove('page-body--no-scroll');
  };

  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt)) {
      closePopup();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  const onPopupClick = (evt) => {
    if (evt.target.matches('section')) {
      closePopup();
    }
  };

  const onButtonClick = () => {
    closePopup();
  };

  const onButtonKeydown = (evt) => {
    setFocusTab(evt, evt.target, evt.target);
  };

  /*=============Показ окона об успешной/неуспешной отправке===========*/
  const showPopup = (popup, buttonClosePopup) => {
    popup.classList.add('popup-show');
    buttonClosePopup.focus();

    document.addEventListener('keydown', onDocumentKeydown);
    buttonClosePopup.addEventListener('click', onButtonClick);
    popup.addEventListener('click', onPopupClick);
    buttonClosePopup.addEventListener('keydown', onButtonKeydown);
  };

  /*=============Отправка формы===========*/
  const onFormSubmit = (evt)  => {
    if(!inputName.value || !inputEmail.value || !textareaQuestion.value) {
      evt.preventDefault();
      fieldsRequired.forEach((fieldRequired) => {
        if(!fieldRequired.value) {
          fieldRequired.classList.add('modal-request__field-error');
        }
      });

      showPopup(popupError, buttonClosePopupError);
    //у поля появляется красная рамка, если оно не заполнено и показывается сообщение, что форма не отправлена. Pаботает если только в разметке не указано required у обязательных полей формы
    }  else {
      if(isStorageSupport) {
        localStorage.setItem('name', inputName.value);
        localStorage.setItem('email',  inputEmail.value);
        localStorage.setItem('tel',  inputPhone.value);
      }

      showPopup(popupSuccess,buttonClosePopupSuccess);
      closeModal();
      page.classList.add('page-body--no-scroll');
    }
  };
  //Удаление класса ошибки при заполнении поля(удаление красной рамки) и снятии фокуса с поля
  fieldsRequired.forEach((fieldRequired) => {
    fieldRequired.addEventListener('blur', () => {
      if(fieldRequired.value && fieldRequired.classList.contains('modal-request__field-error')) {
        fieldRequired.classList.remove('modal-request__field-error');
      }
    });
  });

  form.addEventListener('submit', onFormSubmit);
}
