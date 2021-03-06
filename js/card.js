'use strict';

const mapFiltersContainer = window.map.domElement.querySelector(`.map__filters-container`);

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
let cardInfo;

const addPhotos = (pinData) => {
  const photos = cardInfo.querySelector(`.popup__photos`);
  const fragment = document.createDocumentFragment();
  const photoTemplate = photos.children[0];

  for (let photoSrc of pinData.offer.photos) {
    const photo = photoTemplate.cloneNode(true);
    photo.src = photoSrc;
    fragment.appendChild(photo);
  }
  photoTemplate.remove();
  photos.appendChild(fragment);
};

const addFeatures = (pinData) => {
  const popupFeatures = cardInfo.querySelector(`.popup__features`);
  const featuresCopy = [...popupFeatures.children];

  for (let feature of featuresCopy) {
    const modifier = feature.classList[1].split(`--`)[1];

    if (pinData.offer.features.indexOf(modifier) === -1) {
      popupFeatures.removeChild(feature);
    }
  }
};

const fillCardInfo = (pinData) => {
  cardInfo = cardTemplate.cloneNode(true);

  cardInfo.querySelector(`.popup__title`).textContent = pinData.offer.title;
  cardInfo.querySelector(`.popup__text--address`).textContent = pinData.offer.address;
  cardInfo.querySelector(`.popup__text--price`).textContent = `${pinData.offer.price}₽/ночь`;
  cardInfo.querySelector(`.popup__type`).textContent = window.data.types[pinData.offer.type.toUpperCase()];
  cardInfo.querySelector(`.popup__text--capacity`).textContent = `${pinData.offer.rooms} комнаты для ${pinData.offer.guests} гостей`;
  cardInfo.querySelector(`.popup__text--time`).textContent = `Заезд после ${pinData.offer.checkin}, выезд до ${pinData.offer.checkout}`;
  addFeatures(pinData);
  cardInfo.querySelector(`.popup__description`).textContent = pinData.offer.description;
  addPhotos(pinData);
  cardInfo.querySelector(`.popup__avatar`).src = pinData.author.avatar;
};

const closeCardInfo = () => {
  if (cardInfo) {
    cardInfo.remove();
    document.removeEventListener(`keydown`, onDocumentEscapeKeydown);
  }
};

const locateCardInfo = (pinData = window.data.ads[0]) => {
  closeCardInfo();
  fillCardInfo(pinData);
  mapFiltersContainer.insertAdjacentElement(`beforebegin`, cardInfo);

  cardInfo.querySelector(`.popup__close`).addEventListener(`click`, closeCardInfo);
  document.addEventListener(`keydown`, onDocumentEscapeKeydown);
};

const onDocumentEscapeKeydown = (evt) => {
  if (evt.key === `Escape`) {
    closeCardInfo();
  }
};

window.card = {
  locateData: locateCardInfo,
  close: closeCardInfo
};
