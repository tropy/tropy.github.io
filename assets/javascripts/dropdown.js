'use strict';

class Dropdown {
  constructor() {
    const dropdown = document.querySelectorAll('.dropdown');
    const toggle = document.querySelectorAll('.dropdown-toggle');

    this.toggleAttribute = (el) => {
      if (el.getAttribute('aria-expanded') == 'false') {
        return 'true';
      } else {
        return 'false';
      }
    }

    document.addEventListener('click', e => {
      if (e.target.classList.contains('dropdown-toggle')) {
        e.target.parentNode.classList.toggle('show');
        e.target.setAttribute('aria-expanded', this.toggleAttribute(e.target));

      } else {
        dropdown.forEach(el => {
          if (el.classList.contains('show')) {
            const toggle = el.querySelector('.dropdown-toggle');

            el.classList.remove('show');
            toggle.setAttribute('aria-expanded', this.toggleAttribute(toggle));
          }
        });
      }
    });
  }
}

export { Dropdown };
