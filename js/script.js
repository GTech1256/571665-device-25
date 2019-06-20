const firstServiceDescription = document.getElementsByClassName('services__desc-item')[0]
const servicesStepPixels = 1010; // width of element
const modalClassError = 'modal_animation_error';

/* STORAGE */
let isStorageSupport = true;
let storageLogin = null;
const storageLoginKey = 'user-login';
try {
  storageLogin = localStorage.getItem(storageLoginKey);
} catch (err) {
  isStorageSupport = false;
}

/* MODAL Variables */
const modalClassActive = 'modal_display_block';

/* SLIDER CONTROLLER  */
function setSliderFrame({ target }) {

  const firstNodeOfSlider = document.getElementsByClassName('slider__item')[0];

  // if target !== input[type=radio,data-slider-number="1"]
  if (!target.classList.contains('slider__nav-item') && !target.dataset.sliderNumber) {
    return;
  }


  firstNodeOfSlider.style.marginLeft = `-${(target.dataset.sliderNumber -1) * 1160}px`;
}

/* SERVICES CONTROLLER */
function setServiceSlider({ target }, activeClassName) {
  target.classList.add(activeClassName);
  firstServiceDescription.style.marginLeft = `-${target.dataset.counter * servicesStepPixels}px`;
}

function clearActiveClass(items, activeClassName) {
  for (const item of items) {
    item.classList.remove(activeClassName);
  }
}

function checkFormValid(form, evt) {
  let inputs = form.querySelectorAll('input');
  inputs = [...form.querySelectorAll('textarea'), ...inputs];
    
  let isFormWritenCorrect = true;

  for (const inputNode of inputs) {
    if (!inputNode.validity.valid) {
      isFormWritenCorrect = false;
      break;
    }
  }

  if (isFormWritenCorrect) return; // STOP

  evt.preventDefault();

  form.classList.remove(modalClassError);
  form.offsetWidth = form.offsetWidth;
  form.classList.add(modalClassError);
}

function closeAllPopups(popups) {
  for (const popup of popups) {
    popup.classList.remove(modalClassActive);
  }
}

// MAIN
function init() {
  console.log('js inited');
  document
    .getElementsByClassName('slider__nav')[0]
    .addEventListener('click', setSliderFrame);

  const activeClassName = 'services__item_active';
  const serviceItems = document.getElementsByClassName('services__item');


  /* MODAL MAP NODES */
  const mapPopup =      document.querySelector('.modal__map-popup');
  const mapButtonOpen = document.querySelector('.information__map-link');
  const mapButtonClose = mapPopup.querySelector('.modal__close');
  
  /* MODAL FORM NODES */
  const formPopup =       document.querySelector('.modal__wrtite-us');
  const formButtonOpen =  document.querySelector('.information__write-us-button');
  const formButtonClose = formPopup.querySelector('.modal__close');
  const formButtonSend = formPopup.querySelector('.btn');
  const [formFirstInput, formSecondInput] = formPopup.querySelectorAll('input');
  
 

  //console.log(formPopup.querySelector('input'))

  /* EVENTS */

  /* SERVICES events */
  for (const item of serviceItems) {
    item.addEventListener('click', (evt) => {
      clearActiveClass(serviceItems, activeClassName)
      setServiceSlider(evt, activeClassName)
    })
  }

  /* MODAL-MAP events */
  //      OPEN
  mapButtonOpen.addEventListener('click', (evt) => {
    evt.preventDefault();
    
    mapPopup.classList.add(modalClassActive);
  })
  //     CLOSE
  mapButtonClose.addEventListener('click', (evt) => {
    evt.preventDefault();
    
    mapPopup.classList.remove(modalClassActive);
  })

  /* MODAL-FORM events */
  //      OPEN
  formButtonOpen.addEventListener('click', (evt) => {
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
  formButtonClose.addEventListener('click', (evt) => {
    evt.preventDefault();
    
    formPopup.classList.remove(modalClassActive);
  })
  //     PRE-SUMBMIT
  formButtonSend.addEventListener(
    'click', 
    (evt) => checkFormValid(formPopup, evt)
  )
  //     SUBMIT
  
  formPopup.addEventListener('submit', (evt) => {
    localStorage.setItem(storageLoginKey, formFirstInput.value);
    formPopup.classList.remove(modalClassActive);
  })

  /* CLOSE ALL FORMS */
  //        BY CLICK OUT OF MODAL
  window.addEventListener('click', (evt) => {
    let isModalClick = false

    for (const path of evt.path) {
      if (path.classList && path.classList.contains('modal')) {
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