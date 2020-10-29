'use strict';

const AD_COUNT = 8;
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const PRICE_MODIFIER = 100;

const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 3;
const MIN_GUEST_COUNT = 1;
const MAX_GUEST_COUNT = 10;
const MIN_FEATURE_COUNT = 1;
const MIN_PHOTO_COUNT = 1;

const MIN_X = 100;
const MAX_X = 1100;
const MIN_Y = 130;
const MAX_Y = 630;

const SHIFT_PIN_X = 25;
const SHIFT_PIN_Y = 70;

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);

function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateAds() {
  let ads = [];

  for (let i = 0; i < AD_COUNT; i++) {
    const number = i + 1;

    const curAd = {
      author: {
        avatar: `img/avatars/user0${number}.png`
      },
      offer: {
        title: `some-header0${number}`,
        price: number * PRICE_MODIFIER,
        type: TYPE[generateRandom(0, TYPE.length)],
        rooms: generateRandom(MIN_ROOM_COUNT, MAX_ROOM_COUNT),
        guests: generateRandom(MIN_GUEST_COUNT, MAX_GUEST_COUNT),
        checkin: TIMES[generateRandom(0, TIMES.length)],
        checkout: TIMES[generateRandom(0, TIMES.length)],
        features: FEATURES.slice(0, generateRandom(MIN_FEATURE_COUNT, FEATURES.length)),
        description: `description of 0${number}`,
        photos: PHOTOS.slice(0, generateRandom(MIN_PHOTO_COUNT, PHOTOS.length))
      },
      location: {
        x: generateRandom(MIN_X, MAX_X),
        y: generateRandom(MIN_Y, MAX_Y)
      }
    };
    curAd.address = `${curAd.location.x}, ${curAd.location.y}`;

    ads.push(curAd);
  }
  return ads;
}


function createPin(pinData) {
  const pin = pinTemplate.cloneNode(true);
  const pinImg = pin.querySelector(`img`);

  pin.style.left = `${pinData.location.x + SHIFT_PIN_X}px`;
  pin.style.top = `${pinData.location.y + SHIFT_PIN_Y}px`;

  pinImg.src = pinData.author.avatar;
  pinImg.alt = pinData.offer.title;

  return pin;
}

function createPins(pinsData) {
  const fragment = document.createDocumentFragment();

  for (let pinData of pinsData) {
    const pin = createPin(pinData);
    fragment.appendChild(pin);
  }

  mapPins.appendChild(fragment);
}

map.classList.remove(`map--faded`);
createPins(generateAds());
