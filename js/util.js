'use strict';

(function () {
  function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getNumberValueFromStrPX(str) {
    return +(str.substring(0, str.length - 2));
  }

  window.util = {
    generateRandom,
    getNumberValueFromStrPX
  };
})();
