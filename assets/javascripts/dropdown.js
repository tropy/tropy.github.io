export class Dropdown {
  constructor() {
    this.dropdowns = document.querySelectorAll('.dropdown');
    this.dropdown = null;
    this.toggle = null;
    this.menu = null;
    this.items = null;
    this.active = null;
    this.show = false;
    this.hover = this.hover.bind(this);
    this.key = this.key.bind(this);

    document.addEventListener('click', e => {
      if (this.show == false) {
        if (e.target.classList.contains('dropdown-toggle')) {
          this.toggle = e.target;
          this.open();
        }
      } else {
        this.close();
      }
    });
  }

  open() {
    this.dropdown = this.toggle.parentNode;
    this.toggle = this.dropdown.querySelector('.dropdown-toggle');
    this.menu = this.dropdown.querySelector('.dropdown-menu');
    this.items = this.menu.querySelectorAll('.dropdown-item:not(.disabled)');
    this.show = true;
    this.dropdown.classList.add('show');
    this.toggle.setAttribute('aria-expanded', 'true');

    document.addEventListener('mousemove', this.hover);
    document.addEventListener('keydown', this.key);
  }

  close() {
    this.dropdown.classList.remove('show');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.toggle.focus();
    this.items.forEach(el => el.classList.remove('active'));
    this.active = null;
    this.show = false;

    document.removeEventListener('mousemove', this.hover);
    document.removeEventListener('keydown', this.key);
  }

  prev() {
    if (this.active == null) {
      this.active = this.items.length - 1;
      this.setActive();
    } else if (this.active > 0) {
      this.active--;
      this.setActive();
    }
  }

  next() {
    if (this.active == null) {
      this.active = 0;
      this.setActive();
    } else if (this.active < this.items.length - 1) {
      this.active++;
      this.setActive();
    }
  }

  setActive() {
    this.items.forEach(el => el.classList.remove('active'));
    this.items[this.active].focus();
  }

  hover(e) {
    if (
      e.target.classList.contains('dropdown-item') &&
      e.target != document.activeElement
    ) {
      const items = Array.prototype.slice.call(this.items);
      this.active = items.indexOf(e.target);
      this.setActive();
    }
  }

  key(e) {
    switch (e.key) {
      case 'Escape':
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.prev();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.next();
    }
  }
}
