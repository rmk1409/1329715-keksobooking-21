'use strict';

const body = document.querySelector(`body`);
const main = body.querySelector(`main`);

const successTemplate = body.querySelector(`#success`).content;
const errorTemplate = body.querySelector(`#error`).content;

let activeFlag = false;

function pageActivation() {
  if (!activeFlag) {
    activeFlag = true;
    window.map.activation();
    window.form.activation();
  }
}

function pageDeactivation() {
  activeFlag = false;
  window.pin.setMainToDefaultState();
  window.map.deactivation();
  window.form.deactivation();
}

function isPageActive() {
  return activeFlag;
}

function setPageActive(newValue) {
  activeFlag = newValue;
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

  body.appendChild(errorMsgDiv);
}

function onSuccess() {
  main.appendChild(successTemplate.cloneNode(true));

  function msgSuccessWindowClose() {
    document.querySelector(`.success`).remove();
    document.removeEventListener(`click`, msgSuccessWindowClose);
    document.removeEventListener(`keydown`, onEscKeydownClick);
  }

  function onEscKeydownClick(evt) {
    if (evt.key === `Escape`) {
      msgSuccessWindowClose();
    }
  }

  document.addEventListener(`click`, msgSuccessWindowClose);
  document.addEventListener(`keydown`, onEscKeydownClick);
}

function onError() {
  const errorMsgDiv = errorTemplate.cloneNode(true);
  const errorButton = errorMsgDiv.querySelector(`.error__button`);
  main.appendChild(errorMsgDiv);

  function msgErrorWindowClose() {
    document.querySelector(`.error`).remove();
    document.removeEventListener(`click`, msgErrorWindowClose);
    document.removeEventListener(`keydown`, onEscKeydownClick);
    errorButton.removeEventListener(`click`, msgErrorWindowClose);
  }

  function onEscKeydownClick(evt) {
    if (evt.key === `Escape`) {
      msgErrorWindowClose();
    }
  }

  errorButton.addEventListener(`click`, msgErrorWindowClose);
  document.addEventListener(`click`, msgErrorWindowClose);
  document.addEventListener(`keydown`, onEscKeydownClick);
}

window.page = {
  isActive: isPageActive,
  activation: pageActivation,
  deactivation: pageDeactivation,
  errorMsg,
  onSuccess,
  onError,
  setFlag: setPageActive
};

pageDeactivation();
