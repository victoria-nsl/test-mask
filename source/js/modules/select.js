import { isEscEvent, isTabEvent } from './utils.js';

const body = document.body;
const selectBlock = document.querySelector('.info-user__item--select');


if (selectBlock) {
  const buttonSelect = selectBlock.querySelector('.info-user__button-select');
  const listSelect = selectBlock.querySelector('.info-user__list-select');
  const itemsSelect = selectBlock.querySelectorAll('.info-user__item-select');
  const inputSelect = selectBlock.querySelector('#type-package');

  const onButtonSelect = (evt) => {
    evt.stopPropagation();
    listSelect.classList.toggle('info-user__list-select--active');
  };

  const onItemSelect = (evt) => {
    itemsSelect.forEach((itemSelect) => {
      itemSelect.classList.remove('info-user__item-select--active');
    });
    evt.target.classList.add('info-user__item-select--active');
    inputSelect.value = evt.target.dataset.value;
    buttonSelect.textContent = evt.target.textContent;
    buttonSelect.classList.add('info-user__button-select--active');
    listSelect.classList.remove('info-user__list-select--active');
  };

  const onClickBody = () => {
    listSelect.classList.remove('info-user__list-select--active');
  };

  const onDocumentKeydown = (evt) => {
    if (isEscEvent(evt) || isTabEvent(evt)) {
      listSelect.classList.remove('info-user__list-select--active');
    }
  };

  body.addEventListener('click', onClickBody);
  document.addEventListener('keydown', onDocumentKeydown);
  buttonSelect.addEventListener('click', onButtonSelect);
  itemsSelect.forEach((itemSelect) => {
    itemSelect.addEventListener('click', onItemSelect);
  });
}
