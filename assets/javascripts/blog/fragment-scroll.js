'use strict';

class FragmentScroll {
  constructor() {
    const html = document.querySelector('html');

    if (html.matches('.fragment-loading')) {
      let removeClasses = function(e) {
		    html.classList.remove('fragment-loading');

        window.removeEventListener('scroll', removeClasses);
      }

      window.addEventListener('scroll', removeClasses);
    }
  }
}

export { FragmentScroll };
