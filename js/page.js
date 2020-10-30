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

  removeData();
  setAddress();
}

function locateData() {
  const pinsData = window.data.ads;
  const info = window.data.fillCardInfo(pinsData[0]);

  window.data.locatePins(pinsData);
  mapFiltersContainer.insertAdjacentElement(`beforebegin`, info);
}

function removeData() {
  document.querySelectorAll(`.map__pin[type=button]`).forEach((el) => el.remove());
  const info = document.querySelector(`.map__card`);
  if (info) {
    info.remove();
  }
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
  locateData();

  setAddress();
}

pageInActivation();

window.page = {
  activation: pageActivation,
  inactivation: pageInActivation
};
