export class Modal {
  constructor() {
    this.modal = document.querySelector('.modal');
    this.modalTitle = document.querySelector('.modal-title');
    this.modalBody = document.querySelector('.modal-body');
    this.handleKey = this.handleKey.bind(this);
    this.trigger;
    this.backdrop;

    document.addEventListener('click', e => {
      if (e.target.classList.contains('modal')) {
        this.hide();
      };
    });
  }

  show(params) {
    const { trigger, title, body } = params;
    this.trigger = trigger;

    this.modal.classList.add('show');
    this.modal.focus();
    this.modalTitle.innerText = title;
    this.modalBody.appendChild(body);
    this.addBackdrop();
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', this.handleKey);
  }

  hide() {
    this.modal.classList.remove('show');
    this.modalTitle.innerText = '';
    this.modalBody.innerHTML = '';
    document.body.classList.remove('modal-open');
    this.removeBackdrop();
    document.removeEventListener('keydown', this.handleKey);
    this.trigger.focus();
  }

  addBackdrop() {
    const el = document.createElement('div');

    el.className = 'modal-backdrop';
    this.backdrop = document.body.appendChild(el);
  }

  removeBackdrop() {
    this.backdrop.remove();
  }

  handleKey(e) {
    switch (e.key) {
      case 'Escape':
        this.hide();
        break;
      case 'Tab':
        e.preventDefault();
    }
  }
}
