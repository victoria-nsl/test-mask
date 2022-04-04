const header = document.querySelector('.page-header');
const page = document.body;

if (header) {
  const buttonToggle = header.querySelector('.page-header__button');

  header.classList.remove('page-header--nojs');

  const closeMenu = () => {
    header.classList.remove('page-header--opened');
    header.classList.add('page-header--closed');
    page.classList.remove('page-body--no-scroll');
  };

  const openMenu = () => {
    header.classList.remove('page-header--closed');
    header.classList.add('page-header--opened');
    page.classList.add('page-body--no-scroll');
  };

  const onButtonToggleClick = () => {
    if (header.classList.contains('page-header--closed')) {
      openMenu();
      return;
    }
    closeMenu();
  };

  buttonToggle.addEventListener('click', onButtonToggleClick);
}
