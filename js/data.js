'use strict';

const AD_COUNT = 8;
const APARTMENT_TYPES = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const MIN_ROOM_COUNT = 2;
const MAX_ROOM_COUNT = 4;
const MIN_GUEST_COUNT = 2;
const MAX_GUEST_COUNT = 10;
const MIN_FEATURE_COUNT = 1;
const MIN_PHOTO_COUNT = 1;

const point = {
  minX: 250,
  maxX: 1100,
  minY: 130,
  maxY: 560
};

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const adsData = generateAds();

function generateAds() {
  const ads = [];

  for (let i = 0; i < AD_COUNT; i++) {
    const number = i + 1;

    const x = window.generateRandom(point.minX, point.maxX);
    const y = window.generateRandom(point.minY, point.maxY);
    const types = Object.keys(APARTMENT_TYPES);
    const curAd = {
      id: i,
      author: {
        avatar: `img/avatars/user0${number}.png`
      },
      offer: {
        title: `some-header0${number}`,
        address: `${x}, ${y}`,
        price: window.generateRandom(1000, 10000),
        type: types[window.generateRandom(0, types.length)],
        rooms: window.generateRandom(MIN_ROOM_COUNT, MAX_ROOM_COUNT),
        guests: window.generateRandom(MIN_GUEST_COUNT, MAX_GUEST_COUNT),
        checkin: TIMES[window.generateRandom(0, TIMES.length)],
        checkout: TIMES[window.generateRandom(0, TIMES.length)],
        features: FEATURES.slice(0, window.generateRandom(MIN_FEATURE_COUNT, FEATURES.length + 1)),
        description: `description of 0${number}`,
        photos: PHOTOS.slice(0, window.generateRandom(MIN_PHOTO_COUNT, PHOTOS.length + 1))
      },
      location: {
        x,
        y
      }
    };

    ads.push(curAd);
  }
  return ads;
}

function addPhotos(info, pinData) {
  const photos = info.querySelector(`.popup__photos`);
  const fragment = document.createDocumentFragment();
  const photoTemplate = photos.children[0];

  for (let photoSrc of pinData.offer.photos) {
    const photo = photoTemplate.cloneNode(true);

    photo.src = photoSrc;

    fragment.appendChild(photo);
  }
  photoTemplate.remove();
  photos.appendChild(fragment);
}

function addFeatures(info, pinData) {
  const popupFeatures = info.querySelector(`.popup__features`);
  const copyChildren = [...popupFeatures.children];

  for (let feature of copyChildren) {
    const modifier = feature.classList[1].split(`--`)[1];

    if (pinData.offer.features.indexOf(modifier) === -1) {
      popupFeatures.removeChild(feature);
    }
  }
}

function fillCardInfo(pinData) {
  const info = cardTemplate.cloneNode(true);

  info.querySelector(`.popup__title`).textContent = pinData.offer.title;
  info.querySelector(`.popup__text--address`).textContent = pinData.offer.address;
  info.querySelector(`.popup__text--price`).textContent = `${pinData.offer.price}₽/ночь`;
  info.querySelector(`.popup__type`).textContent = APARTMENT_TYPES[pinData.offer.type];
  info.querySelector(`.popup__text--capacity`).textContent = `${pinData.offer.rooms} комнаты для ${pinData.offer.guests} гостей`;
  info.querySelector(`.popup__text--time`).textContent = `Заезд после ${pinData.offer.checkin}, выезд до ${pinData.offer.checkout}`;
  addFeatures(info, pinData);
  info.querySelector(`.popup__description`).textContent = pinData.offer.description;
  addPhotos(info, pinData);
  info.querySelector(`.popup__avatar`).src = pinData.author.avatar;

  return info;
}

window.data = {
  ads: adsData,
  fillCardInfo
};
