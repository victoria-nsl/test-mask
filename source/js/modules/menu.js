const header = document.querySelector('.page-header');

if (header && document.documentElement.clientWidth < 1023) {
  const buttonToggle = header.querySelector('.page-header__button');

  header.classList.remove('page-header--nojs');

  const toggleMenu = () => {
    if (header.classList.contains('page-header--closed')) {
      header.classList.remove('page-header--closed');
      header.classList.add('page-header--opened');
    } else {
      header.classList.remove('page-header--opened');
      header.classList.add('page-header--closed');
    }
  };

  buttonToggle.addEventListener('click', toggleMenu);
}
