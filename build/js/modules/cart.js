const order = document.querySelector('.form-order');

if (order) {

  let productsSelected = order.querySelectorAll('.product__item');
  const totalPriceProductsSelected = order.querySelector('#total-price');

  const calculatePriceProduct = (quantity) => Number(quantity.value) * Number(quantity.dataset.price);

  const calculatePriceCart = (products) => {
    let totalPrice = 0;
    products.forEach((product) => {
      const quantityProduct = product.querySelector('input');
      totalPrice += calculatePriceProduct(quantityProduct);
    });
    totalPriceProductsSelected.textContent = `${totalPrice} руб.`;
  };

  productsSelected.forEach((productSelected) => {
    const buttonsQuantity = productSelected.querySelectorAll('.product__button-quantity');
    const quantityProductSelected = productSelected.querySelector('input');
    const priceProductSelected = productSelected.querySelector('.product__wrapper-total p');
    const buttonDelete = productSelected.querySelector('.product__button-delete');

    buttonsQuantity.forEach((buttonQuantity) => {
      buttonQuantity.addEventListener('click', () => {
        if (buttonQuantity.classList.contains('product__button-quantity--minus') && quantityProductSelected.value > 1) {
          quantityProductSelected.value--;
        } else {
          quantityProductSelected.value++;
        }
        priceProductSelected.textContent = `${calculatePriceProduct(quantityProductSelected)} руб.`;
        calculatePriceCart(productsSelected);
      });
    });

    buttonDelete.addEventListener('click', () => {
      productSelected.remove();
      productsSelected = order.querySelectorAll('.product__item');
      calculatePriceCart(productsSelected);
    });
  });

}
