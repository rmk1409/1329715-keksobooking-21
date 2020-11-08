'use strict';

const successTemplate = document.querySelector(`#success`).content;
const errorTemplate = document.querySelector(`#error`).content;

let activeFlag = false;

function pageActivation() {
  activeFlag = true;
  window.pin.activation();
  window.map.activation();
  window.form.activation();
}

function pageDeactivation() {
  activeFlag = false;
  window.pin.deactivation();
  window.map.deactivation();
  window.form.deactivation();
}

function isPageActive() {
  return activeFlag;
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

function onSuccess() {
  document.querySelector(`main`).appendChild(successTemplate.cloneNode(true));

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
  document.querySelector(`main`).appendChild(errorMsgDiv);

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
  onError
};
