/*
const moreLinksBtn = document.getElementsByClassName('page-header__links-more')[0]
const subNav = document.getElementsByClassName('page-header__sub-nav')[0]

const ACTIVE_SUB_NAV = 'page-header__sub-nav_active'
const ACTIVE_MORE_LINKS_BTN = 'page-header__links-more_active'

function revertSubNavigation() {
  if (subNav.classList.contains(ACTIVE_SUB_NAV)) {
    moreLinksBtn.classList.remove(ACTIVE_MORE_LINKS_BTN);
    subNav.classList.remove(ACTIVE_SUB_NAV);
  } else {
    moreLinksBtn.classList.add(ACTIVE_MORE_LINKS_BTN);
    subNav.classList.add(ACTIVE_SUB_NAV);
  };
}







 function init() {
  console.log('js inited');
  document
    .getElementsByClassName('page-header__links-more')[0]
    .addEventListener('click', revertSubNavigation);
}


if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

*/









/* SLIDER CONTROLLER  */
function setSliderFrame({ target }) {

  const firstNodeOfSlider = document.getElementsByClassName('slider__item')[0];

  if (!target.classList.contains('slider__nav-item') && !target.dataset.sliderNumber) {
    return;
  }


  firstNodeOfSlider.style.marginLeft = `-${(target.dataset.sliderNumber -1) * 1160}px`;
}



 function init() {
  console.log('js inited');
  document
    .getElementsByClassName('slider__nav')[0]
    .addEventListener('click', setSliderFrame);
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}