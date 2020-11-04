'use strict';

const VALUE_FOR_NOT_GUESTS = 0;
const VALUE_FOR_MANY_ROOMS = 100;

const adFormForm = document.querySelector(`.ad-form`);
const roomNumber = adFormForm.querySelector(`#room_number`);
const capacityNumber = adFormForm.querySelector(`#capacity`);
const checkin = adFormForm.querySelector(`#timein`);
const checkout = adFormForm.querySelector(`#timeout`);
const type = adFormForm.querySelector(`#type`);
const price = adFormForm.querySelector(`#price`);
const typeRestricts = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

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

roomNumber.addEventListener(`change`, checkRoomsAndPlaces);
capacityNumber.addEventListener(`change`, checkRoomsAndPlaces);
adFormForm.addEventListener(`submit`, checkRoomsAndPlaces);

function onTimeinChange() {
  checkout.querySelector(`option[value="${checkin.value}"]`).selected = true;
}

function onTimeoutChange() {
  checkin.querySelector(`option[value="${checkout.value}"]`).selected = true;
}

checkin.addEventListener(`change`, onTimeinChange);
checkout.addEventListener(`change`, onTimeoutChange);

function onTypeChange() {
  const min = typeRestricts[type.value];
  price.min = min;
  price.placeholder = min;
}

type.addEventListener(`change`, onTypeChange);
