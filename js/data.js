'use strict';

(function () {
  // const AD_COUNT = 8;
  const APARTMENT_TYPES = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  // const TIMES = [`12:00`, `13:00`, `14:00`];
  // const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  // const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  //   `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  //
  // const MIN_ROOM_COUNT = 2;
  // const MAX_ROOM_COUNT = 4;
  // const MIN_GUEST_COUNT = 2;
  // const MAX_GUEST_COUNT = 10;
  // const MIN_FEATURE_COUNT = 1;
  // const MIN_PHOTO_COUNT = 1;
  //
  // const grid = {
  //   minX: 250,
  //   maxX: 1100,
  //   minY: 130,
  //   maxY: 560
  // };

  let adsData;

  // function generateAds() {
  //   const ads = [];
  //
  //   for (let i = 0; i < AD_COUNT; i++) {
  //     const number = i + 1;
  //
  //     const x = window.util.generateRandom(grid.minX, grid.maxX);
  //     const y = window.util.generateRandom(grid.minY, grid.maxY);
  //     const types = Object.keys(APARTMENT_TYPES);
  //     const curAd = {
  //       id: i,
  //       author: {
  //         avatar: `img/avatars/user0${number}.png`
  //       },
  //       offer: {
  //         title: `some-header0${number}`,
  //         address: `${x}, ${y}`,
  //         price: window.util.generateRandom(1000, 10000),
  //         type: types[window.util.generateRandom(0, types.length)],
  //         rooms: window.util.generateRandom(MIN_ROOM_COUNT, MAX_ROOM_COUNT),
  //         guests: window.util.generateRandom(MIN_GUEST_COUNT, MAX_GUEST_COUNT),
  //         checkin: TIMES[window.util.generateRandom(0, TIMES.length)],
  //         checkout: TIMES[window.util.generateRandom(0, TIMES.length)],
  //         features: FEATURES.slice(0, window.util.generateRandom(MIN_FEATURE_COUNT, FEATURES.length + 1)),
  //         description: `description of 0${number}`,
  //         photos: PHOTOS.slice(0, window.util.generateRandom(MIN_PHOTO_COUNT, PHOTOS.length + 1))
  //       },
  //       location: {
  //         x,
  //         y
  //       }
  //     };
  //
  //     ads.push(curAd);
  //   }
  //   return ads;
  // }

  window.data = {
    ads: adsData,
    types: APARTMENT_TYPES
  };
})();
