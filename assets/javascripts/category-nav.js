'use strict';

class CategoryNav {
  constructor(container) {
    this.nav = document.querySelector(container);

    if (this.nav.scrollWidth > this.nav.clientWidth) {
      const list = this.nav.querySelector('ul');
      const selected = list.querySelector('.selected');

      this.nav.scrollTo(
        (
          (selected.offsetLeft + selected.offsetWidth / 2)
          - this.nav.offsetWidth / 2
        ), 0
      );
    }
  }
}

export { CategoryNav };
