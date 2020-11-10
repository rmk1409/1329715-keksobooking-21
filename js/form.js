'use strict';

const VALUE_FOR_NOT_GUESTS = 0;
const VALUE_FOR_MANY_ROOMS = 100;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`, `jfif`];

const TypePriceRestricts = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

const adForm = document.querySelector(`.ad-form`);
const roomNumber = adForm.querySelector(`#room_number`);
const capacityNumber = adForm.querySelector(`#capacity`);
const checkin = adForm.querySelector(`#timein`);
const checkout = adForm.querySelector(`#timeout`);
const type = adForm.querySelector(`#type`);
const price = adForm.querySelector(`#price`);
const address = adForm.querySelector(`#address`);
const resetButton = adForm.querySelector(`.ad-form__reset`);
const avatar = adForm.querySelector(`#avatar`);
const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
const image = adForm.querySelector(`#images`);
const imgPreview = adForm.querySelector(`.ad-form__photo`);

address.readOnly = true;

function isRoomsAndPlacesOkay(evt) {
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

  return Boolean(!msg);
}

function onFormSubmit(evt) {
  if (isRoomsAndPlacesOkay(evt)) {
    evt.preventDefault();
    window.ajax.sendData(window.page.onSuccess, window.page.onError, new FormData(adForm));
    window.page.deactivation();
  }
}

function onTimeinChange() {
  checkout.querySelector(`option[value="${checkin.value}"]`).selected = true;
}

function onTimeoutChange() {
  checkin.querySelector(`option[value="${checkout.value}"]`).selected = true;
}

function onTypeChange() {
  const min = TypePriceRestricts[type.value.toUpperCase()];
  price.min = min;
  price.placeholder = min;
}

function addListeners() {
  roomNumber.addEventListener(`change`, isRoomsAndPlacesOkay);
  capacityNumber.addEventListener(`change`, isRoomsAndPlacesOkay);
  adForm.addEventListener(`submit`, onFormSubmit);
  checkin.addEventListener(`change`, onTimeinChange);
  checkout.addEventListener(`change`, onTimeoutChange);
  type.addEventListener(`change`, onTypeChange);
  resetButton.addEventListener(`click`, onResetButtonClick);
  avatar.addEventListener(`change`, onAvatarChange);
  image.addEventListener(`change`, onImagesChange);
}

function onResetButtonClick() {
  window.page.deactivation();
}

function isImageFile(file) {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
}

function onAvatarChange() {
  const file = avatar.files[0];
  if (isImageFile(file)) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      avatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
}

function onImagesChange() {
  const file = image.files[0];
  if (isImageFile(file)) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      imgPreview.style.backgroundImage = `url(${reader.result})`;
      imgPreview.style.backgroundSize = `cover`;
      imgPreview.style.backgroundPosition = `center`;
    });
    reader.readAsDataURL(file);
  }
}

function setAddressField() {
  const y = window.page.isActive() ? window.pin.mainData.getActiveY() : window.pin.mainData.getInactiveY();
  const x = window.pin.mainData.getX();
  address.value = `${x}, ${y}`;
}

function activation() {
  adForm.classList.remove(`ad-form--disabled`);
  for (let fieldset of adForm.children) {
    fieldset.disabled = false;
  }
  setAddressField();
}

function resetImagePreviews() {
  avatarPreview.src = `img/muffin-grey.svg`;
  imgPreview.style.backgroundImage = ``;
}

function deactivation() {
  adForm.classList.add(`ad-form--disabled`);
  for (let fieldset of adForm.children) {
    fieldset.disabled = true;
  }
  adForm.reset();
  setAddressField();
  resetImagePreviews();
  onTypeChange();
}

addListeners();

window.form = {
  activation,
  deactivation,
  setAddressField
};
