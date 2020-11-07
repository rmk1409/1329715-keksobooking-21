'use strict';

(function () {
  const GET_DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  // const POST_DATA_URL = `https://21.javascript.pages.academy/keksobooking`;
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

  function errorMsg(msg) {
    const errorMsgDiv = document.createElement(`div`);

    errorMsgDiv.append(msg);
    errorMsgDiv.style.position = `fixed`;
    errorMsgDiv.style.top = `50%`;
    errorMsgDiv.style.left = `50%`;
    errorMsgDiv.style.padding = `50px 100px`;
    errorMsgDiv.style.width = `500px`;
    errorMsgDiv.style.minHeight = `200px`;
    errorMsgDiv.style.color = `white`;
    errorMsgDiv.style.backgroundColor = `#c000ff`;
    errorMsgDiv.style.boxShadow = `0 0 10px 5px black`;
    errorMsgDiv.style.transform = `translate(-50%, -50%)`;
    errorMsgDiv.style.zIndex = `100`;

    document.querySelector(`body`).appendChild(errorMsgDiv);
  }

  window.load = {
    getData,
    errorMsg
  };
})();
