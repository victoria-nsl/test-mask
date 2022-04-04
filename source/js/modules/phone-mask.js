const FIRST_SYMBOLS ='+7 ';
const form = document.querySelector('.modal-request__form');

if (form) {
  const inputTel = form.querySelector('#telephone');

  const getInputNumbersValue = (input) => input.value.replace(/\D/g, '');

  const onPhoneFocus = (evt) =>  {
    if (!evt.target.value) {
      evt.target.value = FIRST_SYMBOLS;
    }
  };

  const onPhoneBlur = (evt) =>  {
    if (evt.target.value.length < 4 ) {
      evt.target.value = '';
    }
  };

  const onPhoneInput = (evt) => {
    const input = evt.target;
    const inputNumbersValue = getInputNumbersValue(input);
    let  formattedInputValue  = FIRST_SYMBOLS;
    if (!inputNumbersValue) {
      return input.value = '';
    }

    const selectionStart = input.selectionStart;//положение курсора: определяем, куда вносятся цифры в середину или в конец номера

    if (input.value.length !== selectionStart) {
      if (evt.data && /\D/g.test(evt.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (inputNumbersValue.length > 1) {
      formattedInputValue +=  `(${inputNumbersValue.substring(1, 4)}`;
    }

    if (inputNumbersValue.length >= 5) {
      formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`;
    }

    if (inputNumbersValue.length >= 8) {
      formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`;
    }

    if (inputNumbersValue.length >= 10) {
      formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`;
    }

    input.value = formattedInputValue;
  };

  inputTel.addEventListener('input', onPhoneInput);
  inputTel.addEventListener('focus', onPhoneFocus);
  inputTel.addEventListener('blur', onPhoneBlur);
}
