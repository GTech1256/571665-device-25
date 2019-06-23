var firstServiceDescription = document.getElementsByClassName('services__desc-item')[0]
var servicesStepPixels = 1010; // width of element
var modalClassError = 'modal_animation_error';

/* MODAL Variables */
var modalClassActive = 'modal_display_block';

/* STORAGE */
var isStorageSupport = true;
var storageLogin = null;
var storageLoginKey = 'user-login';
try {
  storageLogin = localStorage.getItem(storageLoginKey);
} catch (err) {
  isStorageSupport = false;
}

/* CHECK IE11 */
function checkIsIEEleven() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0) 
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
    return 11;

  else
    return 0; //It is not IE
}
var isIEElevenVariable = checkIsIEEleven();

/* SLIDER CONTROLLER  */
function setSliderFrame(evt) {
  var target = evt.target;
  var firstNodeOfSlider = document.getElementsByClassName('slider__item')[0];

  // if target !== input[type=radio,data-slider-number="1"]
  if (!target.classList.contains('slider__nav-item') && !target.dataset.sliderNumber) {
    return;
  }


  firstNodeOfSlider.style.marginLeft = '-' + (target.dataset.sliderNumber -1) * 1160 + 'px';
}

/* SERVICES CONTROLLER */
function setServiceSlider(evt, activeClassName) {
  evt.target.classList.add(activeClassName);
  firstServiceDescription.style.marginLeft = '-' + evt.target.dataset.counter * servicesStepPixels + 'px';
}

function clearActiveClass(items, activeClassName) {
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove(activeClassName);
  }
}

function checkFormValid(formNode, evt) {
  var inputs = [].slice.call(formNode.querySelectorAll('input'));
  inputs = inputs.concat([].slice.call(formNode.querySelectorAll('textarea')));
    
  var isFormWritenCorrect = true;

  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].validity.valid) {
      isFormWritenCorrect = false;
      break;
    }
  }

  if (isFormWritenCorrect) return; // STOP

  evt.preventDefault();

  formNode.classList.remove(modalClassError);
  formNode.offsetWidth = formNode.offsetWidth;

  formNode.classList.add(modalClassError);

}

function closeAllPopups(popups) {
  for (var i = 0; i < popups.length; i++) {
    popups[i].classList.remove(modalClassActive);
  }
}

// MAIN
function init() {
  console.log('js inited');
  document
    .getElementsByClassName('slider__nav')[0]
    .addEventListener('click', setSliderFrame);

  var activeClassName = 'services__item_active';
  var serviceItems = document.getElementsByClassName('services__item');


  /* MODAL MAP NODES */
  var mapPopup =      document.querySelector('.modal_map-popup');
  var mapButtonOpen = document.querySelector('.information__map-link');
  var mapButtonClose = mapPopup.querySelector('.modal__close');
  
  /* MODAL FORM NODES */
  var formPopup =       document.querySelector('.modal_wrtite-us');
  var formButtonOpen =  document.querySelector('.information__write-us-button');
  var formButtonClose = formPopup.querySelector('.modal__close');
  var formButtonSend = formPopup.querySelector('.btn');
  var formInputs = formPopup.querySelectorAll('input');
  var formFirstInput = formInputs[0];
  var formSecondInput = formInputs[1];
 

  //console.log(formPopup.querySelector('input'))

  /* EVENTS */

  /* IF IE11 filter:grayscale not work */
  if (isIEElevenVariable) {
    var brands = document.querySelectorAll('.brands img');

    for (var i = 0; i < brands.length; i++) {
      brands[i].src = brands[i].dataset.source + 'gray.' + brands[i].dataset.imgType;
      brands[i].addEventListener('mouseover', function(evt) {
        evt.target.src = evt.target.dataset.source + '.' + evt.target.dataset.imgType;
      })
      brands[i].addEventListener('mouseout', function(evt) {
        evt.target.src = evt.target.dataset.source + 'gray.' + evt.target.dataset.imgType;
      })
    }
  }

  /* SERVICES events */
  for (var i = 0; i < serviceItems.length; i++) {
    serviceItems[i].addEventListener('click', function(evt) {
      clearActiveClass(serviceItems, activeClassName)
      setServiceSlider(evt, activeClassName)
    })
  }

  /* MODAL-MAP events */
  //      OPEN
  mapButtonOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    
    mapPopup.classList.add(modalClassActive);
  })
  //     CLOSE
  mapButtonClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    
    mapPopup.classList.remove(modalClassActive);
  })

  /* MODAL-FORM events */
  //      OPEN
  formButtonOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    
    formPopup.classList.add(modalClassActive);

    if (isStorageSupport && storageLogin) {
      formFirstInput.value = storageLogin;
      formSecondInput.focus();
    } else {
      formFirstInput.focus();
    }
  })
  //     CLOSE
  formButtonClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    
    formPopup.classList.remove(modalClassActive);
  })
  //     PRE-SUMBMIT
  formButtonSend.addEventListener(
    'click', 
    function (evt) { checkFormValid(formPopup, evt) }
  )
  //     SUBMIT
  
  formPopup.addEventListener('submit', function (evt) {
    localStorage.setItem(storageLoginKey, formFirstInput.value);
    formPopup.classList.remove(modalClassActive);
  })

  /* CLOSE ALL FORMS */
  //        BY CLICK OUT OF MODAL
  window.addEventListener('click', function (evt) {
    var isModalClick = false

    var path = evt.path || (evt.composedPath && evt.composedPath());

    if (!path) return // IE11 broken

    for (var i = 0; i < path.length; i++) {
      if (path[i].classList && path[i].classList.contains('modal')) {
        isModalClick = true;
        break;
      }
    }

    if (!isModalClick) {
      closeAllPopups([formPopup, mapPopup])
    }
  }, true)

  // BY PRESS 'ESCAPE' ON KEYBOARD
  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      
      closeAllPopups([formPopup, mapPopup])
    }
  });

}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

