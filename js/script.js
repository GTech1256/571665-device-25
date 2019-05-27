const subNav = document.getElementsByClassName('page-header__sub-nav')[0]

const ACTIVE_SUB_NAV = 'page-header__sub-nav_active'

function revertSubNavigation() {
  console.log(subNav);
  if (subNav.classList.contains(ACTIVE_SUB_NAV)) {
    subNav.classList.remove(ACTIVE_SUB_NAV);
  } else {
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
