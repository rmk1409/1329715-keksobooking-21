'use strict';

const VALUE_FOR_MANY_ROOMS = 100;
const VALUE_FOR_NOT_GUESTS = 0;

const adFormForm = document.querySelector(`.ad-form`);
const roomNumber = document.querySelector(`#room_number`);
const capacityNumber = document.querySelector(`#capacity`);

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
