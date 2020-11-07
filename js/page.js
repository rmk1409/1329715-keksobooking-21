'use strict';

let activeFlag = false;

function pageActivation() {
  activeFlag = true;
  window.pin.onMainPinRemoveListeners();
  window.map.activation();
  window.form.activation();
}

function pageDeactivation() {
  activeFlag = false;
  window.pin.onMainPinAddListeners();
  window.form.deactivation();
  window.map.deactivation();
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

window.page = {
  isActive: isPageActive,
  activation: pageActivation,
  deactivation: pageDeactivation,
  errorMsg
};
