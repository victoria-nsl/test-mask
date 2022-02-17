const order = document.querySelector('.form-order');

if (order) {

  let productsSelected = order.querySelectorAll('.product__item');
  const totalPriceProductsSelected = order.querySelector('#total-price');
  const buttonsQuantity = order.querySelectorAll('.product__button-quantity');
  const buttonsDelete = order.querySelectorAll('.product__button-delete');

  const formatNumber = (number) => number.toString().replace(/\B(?=(?:\d{3})*$)/g, ' ');

  const calculatePriceProduct = (quantity) => Number(quantity.value) * Number(quantity.dataset.price);

  const calculatePriceCart = (products) => {
    let totalPrice = 0;
    products.forEach((product) => {
      const quantity = product.querySelector('input');
      totalPrice += calculatePriceProduct(quantity);
    });

    totalPriceProductsSelected.textContent = `${formatNumber(totalPrice)} руб.`;
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

    priceProduct.textContent = `${calculatePriceProduct(quantityProduct)} руб.`;

    calculatePriceCart(productsSelected);
  };

  const onButtonsDelete = (evt) => {
    const product = evt.target.closest('.product__item');
    product.remove();
    productsSelected = order.querySelectorAll('.product__item');
    calculatePriceCart(productsSelected);
  };

  buttonsQuantity.forEach((buttonQuantity) => {
    buttonQuantity.addEventListener('click', onButtonQuantity);
  });

  buttonsDelete.forEach((buttonDelete) => {
    buttonDelete.addEventListener('click', onButtonsDelete);
  });

}
