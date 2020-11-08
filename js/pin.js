'use strict';

const MAIN_BUTTON_CODE = 0;
const SHOWN_PINS_MAX_COUNT = 5;

const DEBOUNCE_INTERVAL = 500;

const SHIFT_PIN_X = 25;
const SHIFT_PIN_Y = 70;

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const mainPin = document.querySelector(`.map__pin--main`);
const type = document.querySelector(`#housing-type`);
const price = document.querySelector(`#housing-price`);
const roomCount = document.querySelector(`#housing-rooms`);
const guestCount = document.querySelector(`#housing-guests`);
const housingFeatures = document.querySelector(`#housing-features`);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

let timeout;

function setupPin(pinData) {
  const pin = pinTemplate.cloneNode(true);
  const img = pin.querySelector(`img`);

  if (!pin.dataset.id) {
    pin.dataset.id = pinData.id;
  }
  pin.style.left = `${pinData.location.x + SHIFT_PIN_X}px`;
  pin.style.top = `${pinData.location.y + SHIFT_PIN_Y}px`;
  img.src = pinData.author.avatar;
  img.alt = pinData.offer.title;

  return pin;
}

function applyFiltering() {
  let sortedData = window.data.ads;

  const typeValue = type.value;
  if (typeValue !== `any`) {
    sortedData = sortedData.filter((e) => e.offer.type === typeValue);
  }

  const priceValue = price.value;
  if (priceValue !== `any`) {
    sortedData = sortedData.filter((e) => {
      const predicate = {
        middle: (elementPrice) => {
          return elementPrice >= 10000 && elementPrice < 50000;
        },
        low: (elementPrice) => {
          return elementPrice < 10000;
        },
        high: (elementPrice) => {
          return elementPrice >= 50000;
        }
      };
      return predicate[priceValue](e.offer.price);
    });
  }

  const roomCountValue = roomCount.value;
  if (roomCountValue !== `any`) {
    sortedData = sortedData.filter((e) => e.offer.rooms === +roomCountValue);
  }

  const guestsValue = guestCount.value;
  if (guestsValue !== `any`) {
    sortedData = sortedData.filter((e) => e.offer.guests === +guestsValue);
  }

  const checkboxes = Array.from(housingFeatures.querySelectorAll(`.map__checkbox`));
  const checkedCheckboxes = checkboxes.filter((e) => e.checked).map((e) => e.value);
  if (checkedCheckboxes.length > 0) {
    sortedData = sortedData.filter((ad) => {
      return checkedCheckboxes.every((checked) => ad.offer.features.indexOf(checked) !== -1);
    });
  }

  return sortedData;
}

function onMapPinsClick(evt) {
  const closest = evt.target.closest(`.map__pin[type=button]`);
  if (closest) {
    window.card.locateData(window.data.ads[closest.dataset.id]);
  }
}

function onMapPinsEnterClick(evt) {
  const closest = evt.target.closest(`.map__pin[type=button]`);
  if (evt.key === `Enter` && closest) {
    window.card.locateData(window.data.ads[closest.dataset.id]);
  }
}

function addListenersToMapPins() {
  mapPins.addEventListener(`click`, onMapPinsClick);
  mapPins.addEventListener(`keydown`, onMapPinsEnterClick);
}

function removeListenersToMapPins() {
  mapPins.removeEventListener(`click`, onMapPinsClick);
  mapPins.removeEventListener(`keydown`, onMapPinsEnterClick);
}

function locatePins() {
  window.map.removeData();
  removeListenersToMapPins();

  const pinsData = applyFiltering();
  const fragment = document.createDocumentFragment();
  const pinCount = pinsData.length > SHOWN_PINS_MAX_COUNT ? SHOWN_PINS_MAX_COUNT : pinsData.length;
  for (let i = 0; i < pinCount; i++) {
    const pin = setupPin(pinsData[i]);
    fragment.appendChild(pin);
  }
  mapPins.appendChild(fragment);

  addListenersToMapPins();
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

function debounce(cb) {
  if (timeout) {
    window.clearTimeout(timeout);
  }
  timeout = setTimeout(function () {
    cb();
  }, DEBOUNCE_INTERVAL);
}

type.addEventListener(`change`, () => debounce(locatePins));
price.addEventListener(`change`, () => debounce(locatePins));
roomCount.addEventListener(`change`, () => debounce(locatePins));
guestCount.addEventListener(`change`, () => debounce(locatePins));
housingFeatures.addEventListener(`change`, () => debounce(locatePins));

window.pin = {
  main: mainPin,
  locateData: locatePins,
  onMainPinAddListeners,
  onMainPinRemoveListeners
};
