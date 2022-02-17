const KEYCODE_TAB = 9;

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

export { setFocusTab };
