import {isEscEvent, setFocusTab} from './utils.js';

const page = document.body;
const popup = document.querySelector('.modal-request');

if (popup) {
  const buttonsLeaveRequest = document.querySelectorAll('[data-request]');
  const buttonClose = popup.querySelector('.modal-request__button-close');

  const elementsPopupFocusable = popup.querySelectorAll('input, textarea,button, a');
  const firstElementPopupFocusable = elementsPopupFocusable[0];
  const lastElementPopupFocusable = elementsPopupFocusable[[elementsPopupFocusable.length-1]];

  /*============Закрытие модального окна===============*/

  const closePopup = () => {
    popup.classList.remove('modal-request--opened');
    page.classList.remove('page-body--no-scroll');
  };

  /*=========Открытие модального окна и обработчики при открытом окне===========*/

  const onDocumentKeydown = (evt) => {
    if(isEscEvent(evt)) {
      closePopup();
    }
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  const onPopupClick = (evt) => {
    if (evt.target.classList.contains('modal-request'))  {
      closePopup();
    }
  };

  const onElementFocusableKeydown = (evt) => {
    setFocusTab(evt, firstElementPopupFocusable, lastElementPopupFocusable);
  };

  const openPopup = () => {
    popup.classList.add('modal-request--opened');
    page.classList.add('page-body--no-scroll');
    firstElementPopupFocusable.focus();

    document.addEventListener('keydown', onDocumentKeydown);
    popup.addEventListener('click', onPopupClick);
    firstElementPopupFocusable.addEventListener('keydown', onElementFocusableKeydown);
    lastElementPopupFocusable.addEventListener('keydown', onElementFocusableKeydown);
  };

  /*====================Обработчики для открытия/закрытия окна=================*/

  const onButtonCloseClick = () => {
    closePopup();
  };

  const onButtonLeaveRequestClick = (evt) => {
    evt.preventDefault();
    openPopup();
  };

  buttonClose.addEventListener('click', onButtonCloseClick);
  buttonsLeaveRequest.forEach((buttonLeaveRequest) => {
    buttonLeaveRequest.addEventListener('click', onButtonLeaveRequestClick);
  });
}
