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
    /*
    popups[i].classList.remove(modalClassActive);
    popups[i].classList.remove(modalClassError);
    */
    closeModal({ preventDefault: function () {} }, popups[i])
  }
}

/**
 * 
 * @param {Event} evt 
 * @param {HTMLNode} modal 
 */
function closeModal(evt, modal) {
  evt.preventDefault()

  modal.classList.remove(modalClassActive);
  modal.classList.remove(modalClassError);
}

// MAIN
function init() {
  var pn = document.location.pathname;
  switch (true) {
    case (pn.search('/catalog.html') !== -1) :
      initCatalogHTML();
      break;
    case (pn.search('/index.html') !== -1):
    case '/':
        initIndexHTML();
    break;
  }
}

/**
 * @description init js only in /catalog.html by init()
 */
function initCatalogHTML() {
  /* ADD :focus-within support for /catalog.html */
  var itemsChildrens = document.querySelectorAll('.content__action button');

  for (var i = 0; i < itemsChildrens.length; i++) {
    itemsChildrens[i].addEventListener('focus', function (evt) {
      evt.target.parentElement.classList.add("content__action_display_wrapper");
    })
    itemsChildrens[i].addEventListener('blur', function (evt) {
      evt.target.parentElement.classList.remove("content__action_display_wrapper");
    })
  }
}

/**
 * @description init js only in /index.html by init()
 */
function initIndexHTML() {

  /* SLIDER CONTROLLER  */

  var sliderNav = document.querySelector('.slider__nav');
  var activeSlider = 
  sliderNav
    .querySelector('input[checked]')
    .dataset['sliderNumber'] 
      - 1;
  setActiveLinkForSliderElement(activeSlider);

  function setSliderFrame(evt) {
    var target = evt.target;

    // if target !== input[type=radio,data-slider-number="1"]
    if (!target.classList.contains('slider__nav-item') && !target.dataset.sliderNumber) {
      return;
    }

    activeSlider = target.dataset.sliderNumber - 1;
    setActiveLinkForSliderElement(activeSlider)

    var firstNodeOfSlider = document.getElementsByClassName('slider__item')[0];  

    firstNodeOfSlider.style.marginLeft = '-' + (activeSlider) * 1160 + 'px';
  }

  function setActiveLinkForSliderElement(activeSlider) {
    // disable button in non active slider
    var sliderItems = document.querySelectorAll('.slider__item');

    for (var j = 0; j < sliderItems.length; j++) {
      var sliderLink = sliderItems[j].querySelector('.slider__more');
      if (activeSlider === j) {
        sliderLink.setAttribute('href', 'catalog.html');
        continue; // SKIP
      }
      
      sliderLink.removeAttribute('href');
    }
  }

  sliderNav.addEventListener('click', setSliderFrame);
  
  /* END SLIDER CONTROLLER */


  /* SERVICES CONTROLLER */
  var activeClassName = 'services__item_active';
  var serviceItems = document.getElementsByClassName('services__item');

  function setServiceSlider(evt, activeClassName) {
    evt.target.classList.add(activeClassName);
    firstServiceDescription.style.marginLeft = '-' + evt.target.dataset.counter * servicesStepPixels + 'px';
  }
  
  function disableServiceButton(target) {
    if (!target) {
      target = document.querySelector('.services__item_active'); 
    }
    
    target.setAttribute('disabled', true);
  }

  function enableAllServiceButtons() {
    [].forEach.call(serviceItems, function(item) {
      item.removeAttribute('disabled');
    })
  }

  enableAllServiceButtons();
  disableServiceButton();


  /* MODAL MAP NODES */
  var mapPopup        = document.querySelector('.modal_map-popup');
  var mapButtonOpen   = document.querySelector('.information__map-link');
  var mapButtonClose  = mapPopup.querySelector('.modal__close');
  
  /* MODAL FORM NODES */
  var formPopup       = document.querySelector('.modal_wrtite-us');
  var formButtonOpen  = document.querySelector('.information__write-us-button');
  var formButtonClose = formPopup.querySelector('.modal__close');
  var formButtonSend  = formPopup.querySelector('.btn');
  var formInputs      = formPopup.querySelectorAll('input');
  var formFirstInput  = formInputs[0];
  var formSecondInput = formInputs[1];
 

  /* EVENTS */

  if (isIEElevenVariable) {

    /* FIX filter:grayscale */
    var brands = document.querySelectorAll('.brands a');

    for (var i = 0; i < brands.length; i++) {
      var brandImg = brands[i].querySelector('img');
      brandImg.src = brandImg.dataset.source + 'gray.' + brandImg.dataset.imgType;

      brands[i].addEventListener('mouseover', function(evt) {
        evt.target.src = evt.target.dataset.source + '.' + evt.target.dataset.imgType;
      })

      brands[i].addEventListener('mouseout', function(evt) {
        evt.target.src = evt.target.dataset.source + 'gray.' + evt.target.dataset.imgType;
      })
      
      brands[i].addEventListener('focus', function(evt) {
        var target = evt.target.querySelector('img');
        target.src = target.dataset.source + '.' + target.dataset.imgType;
      })

      brands[i].addEventListener('blur', function(evt) {
        var target = evt.target.querySelector('img');
        target.src = target.dataset.source + 'gray.' + target.dataset.imgType;
      })
    }
  }

  /* SERVICES events */
  for (var k = 0; k < serviceItems.length; k++) {
    serviceItems[k].addEventListener('click', function(evt) {
      // remove attribute disable on all buttons
      enableAllServiceButtons();
      // add [disable] for active button
      disableServiceButton(evt.target)
      
      clearActiveClass(serviceItems, activeClassName)
      setServiceSlider(evt, activeClassName)
    })
  }

  /* MODAL-MAP events */
  //      OPEN
  mapButtonOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    
    mapPopup.classList.add(modalClassActive);
    // set focus on close
    document.querySelector('.modal_map-popup .modal__close').focus();
  })
  //     CLOSE
  mapButtonClose.addEventListener('click', function (evt) {    
    closeModal(evt, mapPopup)
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
    closeModal(evt, formPopup);
  })
  //     PRE-SUBMIT
  formButtonSend.addEventListener(
    'click', 
    function (evt) { checkFormValid(formPopup, evt) }
  )
  //     SUBMIT
  
  formPopup.addEventListener('submit', function (evt) {
    localStorage.setItem(storageLoginKey, formFirstInput.value);
    closeModal(evt, formPopup);

    // RESET FORM
    formPopup.querySelector('form').reset();
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

