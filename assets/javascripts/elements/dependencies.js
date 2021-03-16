import { createElement } from '../helpers/create-element.js'


export const Dependencies = createElement(
  'tpy-dependencies',

  class extends HTMLElement {
    constructor() {
      super()
      this.module
      this.modal = document.querySelector('tpy-modal')

      this.addEventListener('click', e => {
        if (e.target.classList.contains('module')) {
          this.module = e.target

          e.preventDefault()
          Object.assign(this.modal, {
            modalTitle: this.getTitle(),
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
)
