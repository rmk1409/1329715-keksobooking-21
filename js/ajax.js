'use strict';

const GET_DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const POST_DATA_URL = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT = 10000;
const SUCCESS_STATUS_CODE = 200;

function sendRequest(onSuccess, onError, method, data) {
  const req = new XMLHttpRequest();
  req.timeout = TIMEOUT;
  req.responseType = `json`;
  if (method === `GET`) {
    req.open(`GET`, GET_DATA_URL);
  } else {
    req.open(`POST`, POST_DATA_URL);
  }

  req.addEventListener(`load`, function () {
    switch (req.status) {
      case SUCCESS_STATUS_CODE:
        onSuccess(req.response);
        break;
      default:
        onError(`Status code is ${req.status}`);
        break;
    }
  });
  req.addEventListener(`error`, function () {
    onError(`Connection error`);
  });
  req.addEventListener(`timeout`, function () {
    onError(`Timout error`);
  });

  if (data) {
    req.send(data);
  } else {
    req.send();
  }
}

function getData(onSuccess, onError) {
  sendRequest(onSuccess, onError, `GET`);
}

function sendData(onSuccess, onError, data) {
  sendRequest(onSuccess, onError, `POST`, data);
}

window.ajax = {
  getData,
  sendData
};
