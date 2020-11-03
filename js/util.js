'use strict';

function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

window.generateRandom = generateRandom;
