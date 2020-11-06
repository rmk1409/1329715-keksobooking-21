'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`);

  function locateData() {
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

    locateData();
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
    deactivation
  };
})();
