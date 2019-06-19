const firstServiceDescription = document.getElementsByClassName('services__desc-item')[0]
const servicesStepPixels = 1010; // width of element




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

// MAIN
function init() {
  console.log('js inited');
  document
    .getElementsByClassName('slider__nav')[0]
    .addEventListener('click', setSliderFrame);

  const activeClassName = 'services__item_active';
  const serviceItems = document.getElementsByClassName('services__item');

  /* MODAL Variables */
  const modalActiveClass = 'modal_display_block';

  /* MODAL MAP NODES */
  const mapPopup =      document.querySelector('.modal__map-popup');
  const mapButtonOpen = document.querySelector('.information__map-link');
  const mapButtonClose = mapPopup.querySelector('.modal__close');
  
  /* MODAL FORM NODES */
  const formPopup =       document.querySelector('.modal__wrtite-us');
  const formButtonOpen =  document.querySelector('.information__write-us-button');
  const formButtonClose = formPopup.querySelector('.modal__close');



  /* EVENTS */

  /* services events */
  for (const item of serviceItems) {
    item.addEventListener('click', (evt) => {
      clearActiveClass(serviceItems, activeClassName)
      setServiceSlider(evt, activeClassName)
    })
  }

  /* modal-map events */
  //      OPEN
  mapButtonOpen.addEventListener('click', (evt) => {
    evt.preventDefault();
    
    mapPopup.classList.add(modalActiveClass);
  })
  //     CLOSE
  mapButtonClose.addEventListener('click', (evt) => {
    evt.preventDefault();
    
    mapPopup.classList.remove(modalActiveClass);
  })

  /* modal-form events */
  //      OPEN
  formButtonOpen.addEventListener('click', (evt) => {
    evt.preventDefault();
    
    formPopup.classList.add(modalActiveClass);
  })
  //     CLOSE
  formButtonClose.addEventListener('click', (evt) => {
    evt.preventDefault();
    
    formPopup.classList.remove(modalActiveClass);
  })

}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}