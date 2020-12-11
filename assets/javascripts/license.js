import { Modal } from './modal.js';

export class License {
  constructor() {
    this.module;
    this.modal = new Modal();

    document.addEventListener('click', e => {
      if (e.target.classList.contains('module')) {
        this.module = e.target;

        e.preventDefault();
        this.modal.show({
          trigger: e.target,
          title: this.getTitle(),
          body: this.getLicense()
        });
      }
    })
  }

  getTitle() {
    return this.module.innerText;
  }

  getLicense() {
    const license = this.module.nextElementSibling.querySelector('pre');

    return license.cloneNode(true);
  }
}
