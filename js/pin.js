'use strict';

const MAIN_BUTTON_CODE = 0;
const SHOWN_PINS_MAX_COUNT = 5;

const MIN_LEFT_POSITION_VALUE = 0;
const MAX_RIGHT_POSITION_VALUE = 1140;
const MIN_TOP_POSITION_VALUE = 88;
const MAX_TOP_POSITION_VALUE = 588;

const ANY_VALUE = `any`;

const FIRST_PRICE_LIMIT = 10000;
const SECOND_PRICE_LIMIT = 50000;

const mainPinData = {
  defaultX: 570,
  defaultY: 375,
  width: 62,
  height: 62,
  heightWithPin: 84,
  getInactiveY() {
    return window.util.getNumberValueFromStrPX(window.pin.main.style.top) + this.height / 2;
  },
  getActiveY() {
    return window.util.getNumberValueFromStrPX(window.pin.main.style.top) + this.heightWithPin / 2;
  },
  getX() {
    return window.util.getNumberValueFromStrPX(window.pin.main.style.left) + this.width / 2;
  }
};

const mapPins = window.map.domElement.querySelector(`.map__pins`);
const mainPin = window.map.domElement.querySelector(`.map__pin--main`);
const type = window.map.domElement.querySelector(`#housing-type`);
const price = window.map.domElement.querySelector(`#housing-price`);
const roomCount = window.map.domElement.querySelector(`#housing-rooms`);
const guestCount = window.map.domElement.querySelector(`#housing-guests`);
const housingFeatures = window.map.domElement.querySelector(`#housing-features`);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

function setupPin(pinData) {
  const pin = pinTemplate.cloneNode(true);
  const img = pin.querySelector(`img`);

  if (!pin.dataset.id) {
    pin.dataset.id = pinData.id;
  }
  pin.style.left = `${pinData.location.x}px`;
  pin.style.top = `${pinData.location.y}px`;
  img.src = pinData.author.avatar;
  img.alt = pinData.offer.title;

  return pin;
}

function applyFiltering() {
  let sortedData = window.data.ads;

  const typeValue = type.value;
  if (typeValue !== ANY_VALUE) {
    sortedData = sortedData.filter((e) => e.offer.type === typeValue);
  }

  const priceValue = price.value;
  if (priceValue !== ANY_VALUE) {
    sortedData = sortedData.filter((e) => {
      const predicate = {
        low: (elementPrice) => {
          return elementPrice < FIRST_PRICE_LIMIT;
        },
        middle: (elementPrice) => {
          return elementPrice >= FIRST_PRICE_LIMIT && elementPrice < SECOND_PRICE_LIMIT;
        },
        high: (elementPrice) => {
          return elementPrice >= SECOND_PRICE_LIMIT;
        }
      };
      return predicate[priceValue](e.offer.price);
    });
  }

  const roomCountValue = roomCount.value;
  if (roomCountValue !== ANY_VALUE) {
    sortedData = sortedData.filter((e) => e.offer.rooms === +roomCountValue);
  }

  const guestsValue = guestCount.value;
  if (guestsValue !== ANY_VALUE) {
    sortedData = sortedData.filter((e) => e.offer.guests === +guestsValue);
  }

  const checkboxes = Array.from(housingFeatures.querySelectorAll(`.map__checkbox:checked`))
    .map((e) => e.value);

  if (checkboxes.length > 0) {
    sortedData = sortedData.filter((ad) => {
      return checkboxes.every((checked) => ad.offer.features.indexOf(checked) !== -1);
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

function locatePins() {
  window.map.removeData();

  const pinsData = applyFiltering();
  const fragment = document.createDocumentFragment();
  const pinCount = pinsData.length > SHOWN_PINS_MAX_COUNT ? SHOWN_PINS_MAX_COUNT : pinsData.length;
  for (let i = 0; i < pinCount; i++) {
    const pin = setupPin(pinsData[i]);
    fragment.appendChild(pin);
  }
  mapPins.appendChild(fragment);
}

function onMainPinClick(evt) {
  if (evt.button === MAIN_BUTTON_CODE) {
    window.page.activation();
  }

  document.addEventListener(`mousemove`, onDocumentMove);
  document.addEventListener(`mouseup`, onDocumentMouseup);
}

function onDocumentMouseup() {
  document.removeEventListener(`mousemove`, onDocumentMove);
  document.removeEventListener(`mouseup`, onDocumentMouseup);
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
  if (newLeft < MIN_LEFT_POSITION_VALUE) {
    newLeft = MIN_LEFT_POSITION_VALUE;
  } else {
    if (newLeft > MAX_RIGHT_POSITION_VALUE) {
      newLeft = MAX_RIGHT_POSITION_VALUE;
    }
  }
  mainPin.style.left = `${newLeft}px`;

  let newTop = topValue + moveEvt.movementY;
  if (newTop < MIN_TOP_POSITION_VALUE) {
    newTop = MIN_TOP_POSITION_VALUE;
  } else {
    if (newTop > MAX_TOP_POSITION_VALUE) {
      newTop = MAX_TOP_POSITION_VALUE;
    }
  }
  mainPin.style.top = `${newTop}px`;

  window.form.setAddressField();
}

function setMainPinToDefaultState() {
  mainPin.style.left = `${window.pin.mainData.defaultX}px`;
  mainPin.style.top = `${window.pin.mainData.defaultY}px`;
}

function addListeners() {
  mainPin.addEventListener(`mousedown`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinEnterClick);

  mapPins.addEventListener(`click`, onMapPinsClick);
  mapPins.addEventListener(`keydown`, onMapPinsEnterClick);

  type.addEventListener(`change`, () => window.util.debounce(locatePins));
  price.addEventListener(`change`, () => window.util.debounce(locatePins));
  roomCount.addEventListener(`change`, () => window.util.debounce(locatePins));
  guestCount.addEventListener(`change`, () => window.util.debounce(locatePins));
  housingFeatures.addEventListener(`change`, () => window.util.debounce(locatePins));
}

addListeners();

window.pin = {
  main: mainPin,
  mainData: mainPinData,
  setMainToDefaultState: setMainPinToDefaultState,
  locateData: locatePins
};
