const blockCards = document.querySelector('.card');

if (blockCards) {
  const cards = blockCards.querySelectorAll('.card__item');
  const buttonUpload = blockCards.querySelector('.card__button-upload');

  let numberCardsStart = 10;
  const numberCardsAdded = 5;
  const numberCardsTotal = cards.length;

  buttonUpload.disabled = false;
  cards. forEach((card) => card.classList.add('card__item--hidden'));

  const showCards = (startNumberCards, endNumberCards) => {
    for (let i= startNumberCards ; i < endNumberCards; i++) {
      cards[i].classList.remove('card__item--hidden');
    }

    if (endNumberCards === numberCardsTotal) {
      buttonUpload.disabled = true;
    }
  };

  showCards(0, numberCardsStart);

  const onButtonUploadClick = () => {
    const numberCardsVisible = numberCardsStart;

    if (numberCardsStart + numberCardsAdded <= numberCardsTotal) {
      numberCardsStart += numberCardsAdded;
      showCards(numberCardsVisible, numberCardsStart);
    }
  };

  buttonUpload.addEventListener(('click'), onButtonUploadClick);

}


