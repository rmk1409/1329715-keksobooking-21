'use strict';

const DEBOUNCE_INTERVAL = 500;

let timeout;

function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getNumberValueFromStrPX(str) {
  return +(str.substring(0, str.length - 2));
}

function debounce(cb) {
  if (timeout) {
    window.clearTimeout(timeout);
  }
  timeout = setTimeout(function () {
    cb();
  }, DEBOUNCE_INTERVAL);
}

window.util = {
  generateRandom,
  getNumberValueFromStrPX,
  debounce
};
