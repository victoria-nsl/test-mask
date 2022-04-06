import {isEscEvent, setFocusTab} from './utils.js';

const page = document.body;
const modal = document.querySelector('.modal-request');

/*============Закрытие модального окна===============*/
const closeModal = () => {
  modal.classList.remove('modal-request--opened');
  page.classList.remove('page-body--no-scroll');
};

if (modal) {
  const buttonsLeaveRequest = document.querySelectorAll('[data-request]');
  const buttonClose = modal.querySelector('.modal-request__button-close');

  const elementsPopupFocusable = modal.querySelectorAll('input, textarea,button, a');
  const firstElementPopupFocusable = elementsPopupFocusable[0];
  const lastElementPopupFocusable = elementsPopupFocusable[[elementsPopupFocusable.length-1]];

  /*=========Открытие модального окна и обработчики при открытом окне===========*/

  const onDocumentKeydown = (evt) => {
    if(isEscEvent(evt)) {
      closeModal();
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  };

  const onPopupClick = (evt) => {
    if (evt.target.matches('section'))  {
      closeModal();
    }
  };

  const onElementFocusableKeydown = (evt) => {
    setFocusTab(evt, firstElementPopupFocusable, lastElementPopupFocusable);
  };

  const openPopup = () => {
    modal.classList.add('modal-request--opened');
    page.classList.add('page-body--no-scroll');
    firstElementPopupFocusable.focus();

    document.addEventListener('keydown', onDocumentKeydown);
    modal.addEventListener('click', onPopupClick);
    firstElementPopupFocusable.addEventListener('keydown', onElementFocusableKeydown);
    lastElementPopupFocusable.addEventListener('keydown', onElementFocusableKeydown);
  };

  /*====================Обработчики для открытия/закрытия окна=================*/

  const onButtonCloseClick = () => {
    closeModal();
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

export {closeModal};
