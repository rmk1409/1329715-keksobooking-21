'use strict';

const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);

const mapFiltersContainer = document.querySelector(`.map__filters-container`);

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
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);

  for (let fieldset of adForm) {
    fieldset.disabled = true;
  }
  for (let child of mapFilters) {
    child.disabled = true;
  }
}

function pageActivation() {
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
