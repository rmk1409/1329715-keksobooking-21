'use strict';

const map = document.querySelector(`.map`);
const mapFilters = map.querySelector(`.map__filters`);

const locateData = (pinData) => {
  if (!window.data.ads) {
    window.data.ads = pinData;
  }
  for (let i = 0; i < pinData.length; i++) {
    pinData[i].id = i;
  }
  window.pin.locateData();
};

const removeData = () => {
  const info = document.querySelector(`.map__card`);
  if (info) {
    info.remove();
  }
  document.querySelectorAll(`.map__pin:not(.map__pin--main)`)
    .forEach((el) => el.remove());
};

const activation = () => {
  map.classList.remove(`map--faded`);
  for (let child of mapFilters.children) {
    child.disabled = false;
  }
  if (!window.data.ads) {
    window.ajax.getData(locateData, window.page.errorMsg);
  } else {
    locateData(window.data.ads);
  }
};

const deactivation = () => {
  map.classList.add(`map--faded`);
  for (let child of mapFilters.children) {
    child.disabled = true;
  }
  removeData();
  mapFilters.reset();
};

window.map = {
  domElement: map,
  activation,
  deactivation,
  removeData
};
