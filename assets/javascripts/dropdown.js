export class Dropdown {
  constructor() {
    this.dropdown = document.querySelectorAll('.dropdown');
    this.show = false;

    document.addEventListener('click', e => {
      if (this.show == false) {
        if (e.target.classList.contains('dropdown-toggle')) {
          this.open(e.target);
        }
      } else {
        this.close();
      }
    });

    document.addEventListener('keydown', e => {
      if (this.show && e.key == 'Escape') {
        this.close();
      }
    });
  }

  open(el) {
    el.parentNode.classList.add('show');
    el.setAttribute('aria-expanded', 'true');

    this.show = true;
  }

  close() {
    this.dropdown.forEach(el => {
      if (el.classList.contains('show')) {
        const toggle = el.querySelector('.dropdown-toggle');

        el.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    this.show = false;
  }
}
