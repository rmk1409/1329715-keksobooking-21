'use strict';

const map = document.querySelector(`.map`);
const mapFilters = map.querySelector(`.map__filters`);

function locateData(pinData) {
  if (!window.data.ads) {
    window.data.ads = pinData;
  }
  for (let i = 0; i < pinData.length; i++) {
    pinData[i].id = i;
  }
  window.pin.locateData();
  window.card.locateData();
}

function removeData() {
  const info = document.querySelector(`.map__card`);
  if (info) {
    info.remove();
  }
  document.querySelectorAll(`.map__pin[type=button]`)
    .forEach((el) => el.remove());
}

function activation() {
  map.classList.remove(`map--faded`);

  for (let child of mapFilters.children) {
    child.disabled = false;
  }

  window.ajax.getData(locateData, window.page.errorMsg);
}

function deactivation() {
  map.classList.add(`map--faded`);

  for (let child of mapFilters.children) {
    child.disabled = true;
  }

  removeData();
}

window.map = {
  activation,
  deactivation,
  removeData
};
