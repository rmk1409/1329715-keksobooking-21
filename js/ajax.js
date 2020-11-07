'use strict';

(function () {
  const GET_DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const POST_DATA_URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT = 10000;
  const SUCCESS_STATUS_CODE = 200;

  function getData(onSuccess, onError) {
    const req = new XMLHttpRequest();

    req.open(`GET`, GET_DATA_URL);

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

    req.timeout = TIMEOUT;
    req.responseType = `json`;
    req.send();
  }

  window.ajax = {
    getData
  };
})();
