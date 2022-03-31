const blockSlides = document.querySelector('.main-screen');

if ( blockSlides) {

  const listButtons = blockSlides.querySelector('.main-screen__list-buttons');
  const buttonsSlides = blockSlides.querySelectorAll('.main-screen__button');
  const slides = blockSlides.querySelectorAll('.main-screen__item-slide');

  const onButtonSlideClick = (evt) => {
    if (evt.target.tagName === 'BUTTON') {

      let indexButton;

      buttonsSlides.forEach((buttonSlide, index) => {
        if (buttonSlide === evt.target) {
          indexButton = index;
        }
        buttonSlide.classList.remove('main-screen__button--active');
      });

      slides.forEach((slide) => {
        slide.classList.remove('main-screen__item-slide--active');
      });

      evt.target.classList.add('main-screen__button--active');
      slides[indexButton].classList.add('main-screen__item-slide--active');
    }
  };

  listButtons.addEventListener('click', onButtonSlideClick);
}
