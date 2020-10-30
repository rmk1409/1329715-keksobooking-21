'use strict';

const mainPinData = {
  defaultTop: 375,
  defaultLeft: 570,
  width: 62,
  height: 62,
  pinHeight: 84,
  getY() {
    return this.defaultTop + this.height / 2;
  },
  getDefaultActiveY() {
    return this.defaultTop + this.pinHeight / 2;
  },
  getX() {
    return this.defaultLeft + this.width / 2;
  }
};

const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);

const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const address = document.querySelector(`#address`);

let state = false;

function setAddress() {
  const y = state ? mainPinData.getDefaultActiveY() : mainPinData.getY();
  const x = mainPinData.getX();

  address.value = `${x}, ${y}`;
}

function onMainPinClick(evt) {
  const MAIN_BUTTON_CODE = 0;

  evt.preventDefault();

  if (evt.button === MAIN_BUTTON_CODE) {
    pageActivation();
    setAddress();
  }
}

function onMainPinEnterClick(evt) {
  evt.preventDefault();

  if (evt.key === `Enter`) {
    pageActivation();
  }
}

mainPin.addEventListener(`mousedown`, onMainPinClick);
mainPin.addEventListener(`keydown`, onMainPinEnterClick);

function pageInActivation() {
  state = false;
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);

  for (let fieldset of adForm) {
    fieldset.disabled = true;
  }
  for (let child of mapFilters) {
    child.disabled = true;
  }

  setAddress();
}

function pageActivation() {
  state = true;
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  for (let fieldset of adForm) {
    fieldset.disabled = false;
  }
  for (let child of mapFilters) {
    child.disabled = false;
  }

  const pinsData = window.data.generateAds();
  window.data.locatePins(pinsData);
  const info = window.data.fillCardInfo(pinsData[0]);
  mapFiltersContainer.insertAdjacentElement(`beforebegin`, info);
}

pageInActivation();
