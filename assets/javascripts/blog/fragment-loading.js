'use strict';

class FragmentLoading {
  constructor() {
    if (window.location.hash) {
      if (performance.navigation.type != performance.navigation.TYPE_RELOAD) {
        html.classList.add('fragment-loading');
      }
    }
  }
}

export { FragmentLoading };
