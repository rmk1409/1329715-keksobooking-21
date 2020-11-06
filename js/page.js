'use strict';

let isPageActive = false;

function pageActivation() {
  isPageActive = true;
  window.pin.onMainPinRemoveListeners();
  window.map.activation();
  window.form.activation();
}

function pageDeactivation() {
  isPageActive = false;
  window.pin.onMainPinAddListeners();
  window.form.deactivation();
  window.map.deactivation();
}

window.page = {
  isActive: isPageActive,
  activation: pageActivation,
  deactivation: pageDeactivation
};
