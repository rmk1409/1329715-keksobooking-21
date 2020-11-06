'use strict';

(function () {
  const MAIN_BUTTON_CODE = 0;

  const SHIFT_PIN_X = 25;
  const SHIFT_PIN_Y = 70;

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  function setupPin(pinData) {
    const pin = pinTemplate.cloneNode(true);
    const img = pin.querySelector(`img`);

    pin.dataset.id = pinData.id;
    pin.style.left = `${pinData.location.x + SHIFT_PIN_X}px`;
    pin.style.top = `${pinData.location.y + SHIFT_PIN_Y}px`;
    img.src = pinData.author.avatar;
    img.alt = pinData.offer.title;

    return pin;
  }

  function locatePins() {
    const fragment = document.createDocumentFragment();
    const pinsData = window.data.ads;

    for (let i = 0; i < pinsData.length; i++) {
      const pin = setupPin(pinsData[i]);
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

  function onMainPinAddListeners() {
    mainPin.addEventListener(`mousedown`, onMainPinClick);
    mainPin.addEventListener(`keydown`, onMainPinEnterClick);
  }

  function onMainPinRemoveListeners() {
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinEnterClick);
  }

  window.pin = {
    locateData: locatePins,
    onMainPinAddListeners,
    onMainPinRemoveListeners
  };
})();
