const KEYCODE_TAB = 9;
const KEY_ESCAPE= 'Escape';
const KEY_ESC = 'Esc';
const KEY_TAB = 'Tab';

const setFocusTab = (evt, firstElement, lastElement) => {
  const isShiftPressed = evt.shiftKey;
  const isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);
  if (!isTabPressed) {
    return;
  }

  if (isShiftPressed && isTabPressed && document.activeElement === firstElement) {
    evt.preventDefault();
    lastElement.focus();
  }

  if (!isShiftPressed && isTabPressed && document.activeElement === lastElement) {
    evt.preventDefault();
    firstElement.focus();
  }
};
const isEscEvent = (evt) => evt.key ===  KEY_ESCAPE || evt.key === KEY_ESC;
const isTabEvent = (evt) => evt.key ===  KEY_TAB;

export { setFocusTab, isEscEvent, isTabEvent};
