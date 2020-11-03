'use strict';

const MAIN_BUTTON_CODE = 0;

const SHIFT_PIN_X = 25;
const SHIFT_PIN_Y = 70;

const mainPinData = {
  defaultTop: 375,
  defaultLeft: 570,
  width: 62,
  height: 62,
  heightWithPin: 84,
  getInactiveY() {
    return this.defaultTop + this.height / 2;
  },
  getActiveY() {
    return this.defaultTop + this.heightWithPin / 2;
  },
  getX() {
    return this.defaultLeft + this.width / 2;
  }
};

const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);
const mapFilters = map.querySelector(`.map__filters`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);
const mapPins = map.querySelector(`.map__pins`);

const adForm = document.querySelector(`.ad-form`);
const address = adForm.querySelector(`#address`);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

let isPageActive = false;

function onMainPinClick(evt) {
  if (evt.button === MAIN_BUTTON_CODE) {
    pageActivation();
  }
}

function onMainPinEnterClick(evt) {
  if (evt.key === `Enter`) {
    pageActivation();
  }
}

function removeData() {
  const info = document.querySelector(`.map__card`);
  if (info) {
    info.remove();
  }
  document.querySelectorAll(`.map__pin[type=button]`)
    .forEach((el) => el.remove());
}

function setAddressField() {
  const y = isPageActive ? mainPinData.getActiveY() : mainPinData.getInactiveY();
  const x = mainPinData.getX();

  address.value = `${x}, ${y}`;
}

function pageInactivation() {
  mainPin.addEventListener(`mousedown`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinEnterClick);

  isPageActive = false;

  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  for (let fieldset of adForm.children) {
    fieldset.disabled = true;
  }
  for (let child of mapFilters.children) {
    child.disabled = true;
  }

  removeData();
  setAddressField();
}

function locateData() {
  const pinsData = window.data.ads;
  const info = window.data.fillCardInfo(pinsData[0]);

  locatePins(pinsData);
  mapFiltersContainer.insertAdjacentElement(`beforebegin`, info);
}

function pageActivation() {
  mainPin.removeEventListener(`mousedown`, onMainPinClick);
  mainPin.removeEventListener(`keydown`, onMainPinEnterClick);

  isPageActive = true;

  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  for (let fieldset of adForm.children) {
    fieldset.disabled = false;
  }
  for (let child of mapFilters.children) {
    child.disabled = false;
  }

  locateData();
  setAddressField();
}


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

function locatePins(pinsData) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < pinsData.length; i++) {
    const pin = setupPin(pinsData[i]);
    fragment.appendChild(pin);
  }

  mapPins.appendChild(fragment);
}

pageInactivation();
address.disabled = true;

window.page = {
  activation: pageActivation,
  inactivation: pageInactivation
};
