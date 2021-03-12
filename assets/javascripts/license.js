export class License {
  constructor() {
    this.module
    this.modal = document.querySelector('tpy-modal')

    document.addEventListener('click', e => {
      if (e.target.classList.contains('module')) {
        this.module = e.target

        e.preventDefault()
        Object.assign(this.modal, {
          modalTitle: this.getTitle(),
          content: this.getLicense(),
          trigger: this.module,
          isOpen: true
        })
      }
    })
  }

  getTitle() {
    return this.module.innerText
  }

  getLicense() {
    const license = this.module.nextElementSibling.querySelector('pre');

    return license.outerHTML;
  }
}
