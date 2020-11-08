(()=>{"use strict";window.util={generateRandom:function(e,t){return Math.floor(Math.random()*(t-e))+e},getNumberValueFromStrPX:function(e){return+e.substring(0,e.length-2)}},(()=>{function e(e,t,n,o){const r=new XMLHttpRequest;"GET"===n?r.open("GET","https://21.javascript.pages.academy/keksobooking/data"):r.open("POST","https://21.javascript.pages.academy/keksobooking"),r.addEventListener("load",(function(){switch(r.status){case 200:e(r.response);break;default:t("Status code is "+r.status)}})),r.addEventListener("error",(function(){t("Connection error")})),r.addEventListener("timeout",(function(){t("Timout error")})),r.timeout=1e4,r.responseType="json",o?r.send(o):r.send()}window.ajax={getData:function(t,n){e(t,n,"GET")},sendData:function(t,n,o){e(t,n,"POST",o)}}})(),(()=>{const e=document.querySelector(".map").querySelector(".map__filters-container"),t=document.querySelector("#card").content.querySelector(".map__card");let n;function o(){n&&n.remove()}document.addEventListener("keydown",(function(e){"Escape"===e.key&&o()})),window.card={locateData:function(r=window.data.ads[0]){o(),function(e){n=t.cloneNode(!0),n.querySelector(".popup__title").textContent=e.offer.title,n.querySelector(".popup__text--address").textContent=e.offer.address,n.querySelector(".popup__text--price").textContent=e.offer.price+"₽/ночь",n.querySelector(".popup__type").textContent=window.data.types[e.offer.type],n.querySelector(".popup__text--capacity").textContent=`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`,n.querySelector(".popup__text--time").textContent=`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`,function(e){const t=n.querySelector(".popup__features"),o=[...t.children];for(let n of o){const o=n.classList[1].split("--")[1];-1===e.offer.features.indexOf(o)&&t.removeChild(n)}}(e),n.querySelector(".popup__description").textContent=e.offer.description,function(e){const t=n.querySelector(".popup__photos"),o=document.createDocumentFragment(),r=t.children[0];for(let t of e.offer.photos){const e=r.cloneNode(!0);e.src=t,o.appendChild(e)}r.remove(),t.appendChild(o)}(e),n.querySelector(".popup__avatar").src=e.author.avatar}(r),n.querySelector(".popup__close").addEventListener("click",(function(){o()})),e.insertAdjacentElement("beforebegin",n)},close:o}})(),(()=>{const e=document.querySelector(".map").querySelector(".map__pins"),t=document.querySelector(".map__pin--main"),n=document.querySelector("#housing-type"),o=document.querySelector("#housing-price"),r=document.querySelector("#housing-rooms"),i=document.querySelector("#housing-guests"),a=document.querySelector("#housing-features"),c=document.querySelector("#pin").content.querySelector(".map__pin");let d;function s(e){const t=c.cloneNode(!0),n=t.querySelector("img");return t.dataset.id||(t.dataset.id=e.id),t.style.left=e.location.x+25+"px",t.style.top=e.location.y+70+"px",n.src=e.author.avatar,n.alt=e.offer.title,t}function u(e){const t=e.target.closest(".map__pin[type=button]");t&&window.card.locateData(window.data.ads[t.dataset.id])}function l(e){const t=e.target.closest(".map__pin[type=button]");"Enter"===e.key&&t&&window.card.locateData(window.data.ads[t.dataset.id])}function m(){window.map.removeData(),e.removeEventListener("click",u),e.removeEventListener("keydown",l);const t=function(){let e=window.data.ads;const t=n.value;"any"!==t&&(e=e.filter((e=>e.offer.type===t)));const c=o.value;"any"!==c&&(e=e.filter((e=>({middle:e=>e>=1e4&&e<5e4,low:e=>e<1e4,high:e=>e>=5e4}[c](e.offer.price)))));const d=r.value;"any"!==d&&(e=e.filter((e=>e.offer.rooms===+d)));const s=i.value;"any"!==s&&(e=e.filter((e=>e.offer.guests===+s)));const u=Array.from(a.querySelectorAll(".map__checkbox")).filter((e=>e.checked)).map((e=>e.value));return u.length>0&&(e=e.filter((e=>u.every((t=>-1!==e.offer.features.indexOf(t)))))),e}(),c=document.createDocumentFragment(),d=t.length>5?5:t.length;for(let e=0;e<d;e++){const n=s(t[e]);c.appendChild(n)}e.appendChild(c),e.addEventListener("click",u),e.addEventListener("keydown",l)}function p(e){0===e.button&&window.page.activation()}function f(e){"Enter"===e.key&&window.page.activation()}function v(e){const n=window.util.getNumberValueFromStrPX(t.style.left),o=window.util.getNumberValueFromStrPX(t.style.top);let r=n+e.movementX;r<250?r=250:r>1140&&(r=1140),t.style.left=r+"px";let i=o+e.movementY;i<130?i=130:i>630&&(i=630),t.style.top=i+"px",window.form.setAddressField()}function w(){document.addEventListener("mousemove",v),document.addEventListener("mouseup",y)}function y(){document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",y)}function g(e){d&&window.clearTimeout(d),d=setTimeout((function(){e()}),500)}n.addEventListener("change",(()=>g(m))),o.addEventListener("change",(()=>g(m))),r.addEventListener("change",(()=>g(m))),i.addEventListener("change",(()=>g(m))),a.addEventListener("change",(()=>g(m))),window.pin={main:t,locateData:m,onMainPinAddListeners:function(){t.addEventListener("mousedown",p),t.addEventListener("keydown",f),t.removeEventListener("mousedown",w)},onMainPinRemoveListeners:function(){t.removeEventListener("mousedown",p),t.removeEventListener("keydown",f),t.addEventListener("mousedown",w)}}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__filters");function n(e){window.data.ads||(window.data.ads=e);for(let t=0;t<e.length;t++)e[t].id=t;window.pin.locateData(),window.card.locateData()}function o(){const e=document.querySelector(".map__card");e&&e.remove(),document.querySelectorAll(".map__pin[type=button]").forEach((e=>e.remove()))}window.map={activation:function(){e.classList.remove("map--faded");for(let e of t.children)e.disabled=!1;window.ajax.getData(n,window.page.errorMsg)},deactivation:function(){e.classList.add("map--faded");for(let e of t.children)e.disabled=!0;o()},removeData:o}})(),(()=>{const e={bungalow:0,flat:1e3,house:5e3,palace:1e4},t={width:62,height:62,heightWithPin:84,getInactiveY(){return window.util.getNumberValueFromStrPX(window.pin.main.style.top)+this.height/2},getActiveY(){return window.util.getNumberValueFromStrPX(window.pin.main.style.top)+this.heightWithPin/2},getX(){return window.util.getNumberValueFromStrPX(window.pin.main.style.left)+this.width/2}},n=document.querySelector(".ad-form"),o=n.querySelector("#room_number"),r=n.querySelector("#capacity"),i=n.querySelector("#timein"),a=n.querySelector("#timeout"),c=n.querySelector("#type"),d=n.querySelector("#price"),s=n.querySelector("#address"),u=n.querySelector(".ad-form__reset");function l(e){const t=+o.value,n=+r.value;let i="";return 100===t&&0!==n||0===n&&100!==t?i="Для такого варианта доступно соответствие '100 комнат' и 'не для гостей'":t<n&&(i="Каждая комната не больше 1 гостя, выберите более просторный вариант"),i&&e.preventDefault(),o.setCustomValidity(i),o.reportValidity(),Boolean(!i)}function m(e){if(l(e)){e.preventDefault();const t=new FormData(n);t.append("address",s.value),window.ajax.sendData(window.page.onSuccess,window.page.onError,t),window.page.deactivation()}}function p(){a.querySelector(`option[value="${i.value}"]`).selected=!0}function f(){i.querySelector(`option[value="${a.value}"]`).selected=!0}function v(){const t=e[c.value];d.min=t,d.placeholder=t}function w(){const e=window.page.isActive()?t.getActiveY():t.getInactiveY(),n=t.getX();s.value=`${n}, ${e}`}s.disabled=!0,window.form={activation:function(){n.classList.remove("ad-form--disabled"),o.addEventListener("change",l),r.addEventListener("change",l),n.addEventListener("submit",m),i.addEventListener("change",p),a.addEventListener("change",f),c.addEventListener("change",v),u.addEventListener("click",window.page.deactivation);for(let e of n.children)e.disabled=!1;w()},deactivation:function(){n.classList.add("ad-form--disabled"),o.removeEventListener("change",l),r.removeEventListener("change",l),n.removeEventListener("submit",m),i.removeEventListener("change",p),a.removeEventListener("change",f),c.removeEventListener("change",v),u.removeEventListener("click",window.page.deactivation);for(let e of n.children)e.disabled=!0;n.reset(),w()},setAddressField:w}})(),window.data={ads:void 0,types:{palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"}},(()=>{let e=!1;const t=document.querySelector("#success").content,n=document.querySelector("#error").content;window.page={isActive:function(){return e},activation:function(){e=!0,window.pin.onMainPinRemoveListeners(),window.map.activation(),window.form.activation()},deactivation:function(){e=!1,window.pin.onMainPinAddListeners(),window.form.deactivation(),window.map.deactivation()},errorMsg:function(e){const t=document.createElement("div");t.append(e),t.style.position="fixed",t.style.top="50%",t.style.left="50%",t.style.padding="50px 100px",t.style.width="500px",t.style.minHeight="200px",t.style.color="white",t.style.backgroundColor="#c000ff",t.style.boxShadow="0 0 10px 5px black",t.style.transform="translate(-50%, -50%)",t.style.zIndex="100",document.querySelector("body").appendChild(t)},onSuccess:function(){function e(){document.querySelector(".success").remove(),document.removeEventListener("click",e),document.removeEventListener("keydown",n)}function n(t){"Escape"===t.key&&e()}document.querySelector("main").appendChild(t.cloneNode(!0)),document.addEventListener("click",e),document.addEventListener("keydown",n)},onError:function(){const e=n.cloneNode(!0),t=e.querySelector(".error__button");function o(){document.querySelector(".error").remove(),document.removeEventListener("click",o),document.removeEventListener("keydown",r),t.removeEventListener("click",o)}function r(e){"Escape"===e.key&&o()}document.querySelector("main").appendChild(e),t.addEventListener("click",o),document.addEventListener("click",o),document.addEventListener("keydown",r)}}})(),window.page.deactivation()})();