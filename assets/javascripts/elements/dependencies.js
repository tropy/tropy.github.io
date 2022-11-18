import { CustomElement } from './custom-element.js'


export class Dependencies extends CustomElement {
  constructor() {
    super()
    this.module
    this.modal = document.querySelector('tpy-modal')

    this.addEventListener('click', e => {
      if (e.target.classList.contains('module')) {
        this.module = e.target

        e.preventDefault()
        Object.assign(this.modal, {
          content: this.getLicense(),
          isOpen: true
        })
      }
    })
  }

  getTitle() {
    return this.module.innerText
  }

  getLicense() {
    const license = this.module.nextElementSibling.querySelector('pre')

    return license.outerHTML
  }
}

customElements.define('tpy-dependencies', Dependencies)
