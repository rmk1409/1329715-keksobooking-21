'use strict';

(function () {
  const MAIN_BUTTON_CODE = 0;

  const SHIFT_PIN_X = 25;
  const SHIFT_PIN_Y = 70;

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  function setupPin(id, pinData) {
    const pin = pinTemplate.cloneNode(true);
    const img = pin.querySelector(`img`);

    pin.dataset.id = id;
    pin.style.left = `${pinData.location.x + SHIFT_PIN_X}px`;
    pin.style.top = `${pinData.location.y + SHIFT_PIN_Y}px`;
    img.src = pinData.author.avatar;
    img.alt = pinData.offer.title;

    return pin;
  }

  function locatePins(pinsData) {
    const fragment = document.createDocumentFragment();
    window.data.ads = pinsData;

    for (let i = 0; i < pinsData.length; i++) {
      const pin = setupPin(i, pinsData[i]);
      fragment.appendChild(pin);
    }

    mapPins.appendChild(fragment);

    mapPins.addEventListener(`click`, function (evt) {
      const closest = evt.target.closest(`.map__pin[type=button]`);
      if (closest) {
        window.card.locateData(window.data.ads[closest.dataset.id]);
      }
    });

    mapPins.addEventListener(`keydown`, function (evt) {
      const closest = evt.target.closest(`.map__pin[type=button]`);
      if (evt.key === `Enter` && closest) {
        window.card.locateData(window.data.ads[closest.dataset.id]);
      }
    });
  }

  function onMainPinClick(evt) {
    if (evt.button === MAIN_BUTTON_CODE) {
      window.page.activation();
    }
  }

  function onMainPinEnterClick(evt) {
    if (evt.key === `Enter`) {
      window.page.activation();
    }
  }

  function onDocumentMove(moveEvt) {
    const leftValue = window.util.getNumberValueFromStrPX(mainPin.style.left);
    const topValue = window.util.getNumberValueFromStrPX(mainPin.style.top);

    let newLeft = leftValue + moveEvt.movementX;
    if (newLeft < 250) {
      newLeft = 250;
    } else if (newLeft > 1140) {
      newLeft = 1140;
    }

    mainPin.style.left = `${newLeft}px`;
    let newTop = topValue + moveEvt.movementY;
    if (newTop < 130) {
      newTop = 130;
    } else if (newTop > 630) {
      newTop = 630;
    }
    mainPin.style.top = `${newTop}px`;

    window.form.setAddressField();
  }

  function onMainPinClickMoveListener() {
    document.addEventListener(`mousemove`, onDocumentMove);
    document.addEventListener(`mouseup`, onDocumentMouseup);
  }

  function onDocumentMouseup() {
    document.removeEventListener(`mousemove`, onDocumentMove);
    document.removeEventListener(`mouseup`, onDocumentMouseup);
  }

  function onMainPinAddListeners() {
    mainPin.addEventListener(`mousedown`, onMainPinClick);
    mainPin.addEventListener(`keydown`, onMainPinEnterClick);

    mainPin.removeEventListener(`mousedown`, onMainPinClickMoveListener);
  }

  function onMainPinRemoveListeners() {
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinEnterClick);

    mainPin.addEventListener(`mousedown`, onMainPinClickMoveListener);
  }

  window.pin = {
    main: mainPin,
    locateData: locatePins,
    onMainPinAddListeners,
    onMainPinRemoveListeners
  };
})();
