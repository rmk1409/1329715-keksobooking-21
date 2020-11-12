'use strict';

const DEBOUNCE_INTERVAL = 500;

let timeout;

const generateRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getNumberValueFromStrPX = (str) => {
  return +(str.substring(0, str.length - 2));
};

const debounce = (cb) => {
  if (timeout) {
    window.clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    cb();
  }, DEBOUNCE_INTERVAL);
};

window.util = {
  generateRandom,
  getNumberValueFromStrPX,
  debounce
};
