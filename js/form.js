'use strict';

(function () {
  const VALUE_FOR_NOT_GUESTS = 0;
  const VALUE_FOR_MANY_ROOMS = 100;

  const typePriceRestricts = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

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

  const adForm = document.querySelector(`.ad-form`);
  const roomNumber = adForm.querySelector(`#room_number`);
  const capacityNumber = adForm.querySelector(`#capacity`);
  const checkin = adForm.querySelector(`#timein`);
  const checkout = adForm.querySelector(`#timeout`);
  const type = adForm.querySelector(`#type`);
  const price = adForm.querySelector(`#price`);
  const address = adForm.querySelector(`#address`);

  address.disabled = true;

  function checkRoomsAndPlaces(evt) {
    const rooms = +roomNumber.value;
    const places = +capacityNumber.value;
    let msg = ``;

    if (rooms === VALUE_FOR_MANY_ROOMS && places !== VALUE_FOR_NOT_GUESTS
      || places === VALUE_FOR_NOT_GUESTS && rooms !== VALUE_FOR_MANY_ROOMS) {
      msg = `Для такого варианта доступно соответствие '100 комнат' и 'не для гостей'`;
    } else if (rooms < places) {
      msg = `Каждая комната не больше 1 гостя, выберите более просторный вариант`;
    }
    if (msg) {
      evt.preventDefault();
    }
    roomNumber.setCustomValidity(msg);
    roomNumber.reportValidity();
  }

  function onTimeinChange() {
    checkout.querySelector(`option[value="${checkin.value}"]`).selected = true;
  }

  function onTimeoutChange() {
    checkin.querySelector(`option[value="${checkout.value}"]`).selected = true;
  }

  function onTypeChange() {
    const min = typePriceRestricts[type.value];
    price.min = min;
    price.placeholder = min;
  }

  function addListeners() {
    roomNumber.addEventListener(`change`, checkRoomsAndPlaces);
    capacityNumber.addEventListener(`change`, checkRoomsAndPlaces);
    adForm.addEventListener(`submit`, checkRoomsAndPlaces);
    checkin.addEventListener(`change`, onTimeinChange);
    checkout.addEventListener(`change`, onTimeoutChange);
    type.addEventListener(`change`, onTypeChange);
  }

  function removeListeners() {
    roomNumber.removeEventListener(`change`, checkRoomsAndPlaces);
    capacityNumber.removeEventListener(`change`, checkRoomsAndPlaces);
    adForm.removeEventListener(`submit`, checkRoomsAndPlaces);
    checkin.removeEventListener(`change`, onTimeinChange);
    checkout.removeEventListener(`change`, onTimeoutChange);
    type.removeEventListener(`change`, onTypeChange);
  }

  function setAddressField() {
    const y = window.page.isActive ? mainPinData.getActiveY() : mainPinData.getInactiveY();
    const x = mainPinData.getX();

    address.value = `${x}, ${y}`;
  }

  function activation() {
    adForm.classList.remove(`ad-form--disabled`);
    addListeners();

    for (let fieldset of adForm.children) {
      fieldset.disabled = false;
    }

    setAddressField();
  }

  function deactivation() {
    adForm.classList.add(`ad-form--disabled`);
    removeListeners();

    for (let fieldset of adForm.children) {
      fieldset.disabled = true;
    }

    setAddressField();
  }

  window.form = {
    activation,
    deactivation
  };
})();
