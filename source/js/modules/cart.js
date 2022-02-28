const form = document.querySelector('.form-order');

if (form) {
  const productsSelected = form.getElementsByClassName('product__item');//живая коллекция, использована, чтобы при удалении карточки товаров изменялся productsSelected
  const totalPriceProductsSelected = form.querySelector('#total-price');
  const buttonsQuantity = form.querySelectorAll('.product__button-quantity');//статическая коллекция
  const buttonsDelete = form.querySelectorAll('.product__button-delete');


  Array.from(productsSelected).forEach((productSelected) => productSelected.classList.remove('product__item--nojs'));

  //const formatNumber = (number) => number.toString().replace(/\B(?=(?:\d{3})*$)/g, ' ');
  const formatNumber = (number) => {
    const formatter = new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    });//интернационализация
    return formatter.format(number.toString());
  };

  const calculatePriceProduct = (quantity) => formatNumber(Number(quantity.value) * Number(quantity.dataset.price));

  const calculatePriceCart = (products) => {
    let totalPrice = 0;
    Array.from(products).forEach((product) => {
      const quantity = product.querySelector('input');
      totalPrice += Number(quantity.value) * Number(quantity.dataset.price);
    });

    totalPriceProductsSelected.textContent = formatNumber(totalPrice);
  };

  const onButtonQuantity  = (evt) => {
    const product = evt.target.closest('.product__item');
    const quantityProduct = product.querySelector('input');
    const priceProduct = product.querySelector('.product__wrapper-total p');

    if (evt.target.classList.contains('product__button-quantity--minus') && quantityProduct.value > 1) {
      quantityProduct.value--;
    }

    if (evt.target.classList.contains('product__button-quantity--plus')) {
      quantityProduct.value++;
    }

    priceProduct.textContent = calculatePriceProduct(quantityProduct);

    calculatePriceCart(productsSelected);
  };

  const onButtonsDelete = (evt) => {
    const product = evt.target.closest('.product__item');
    product.remove();
    calculatePriceCart(productsSelected);
  };

  buttonsQuantity.forEach((buttonQuantity) => {
    buttonQuantity.addEventListener('click', onButtonQuantity);
  });

  buttonsDelete.forEach((buttonDelete) => {
    buttonDelete.addEventListener('click', onButtonsDelete);
  });

}
