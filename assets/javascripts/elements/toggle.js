import { createElement } from '../helpers/create-element.js'


export const Toggle = createElement(
  'tpy-toggle',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['trigger']
    }

    connectedCallback() {
      this.template = `<slot></slot>`

      const slotted = this.innerHTML
      this.innerHTML = this.template
      this.querySelector('slot').parentElement.innerHTML = slotted
      const buttons = document.querySelectorAll(this.trigger)

      buttons.forEach(button => {
        button.addEventListener('click', e => {
          this.isOpen = !this.isOpen
        })
      })
    }
  }, {
    trigger: false,
    isOpen: true
  }
)
