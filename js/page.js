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

window.page = {
  isActive: isPageActive,
  activation: pageActivation,
  deactivation: pageDeactivation
};
