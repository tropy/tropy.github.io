import { createElement } from '../helpers/create-element.js'


export const Menu = createElement(
  'tpy-menu',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['toggle', 'is-open']
    }

    connectedCallback() {
      this.template = `<slot></slot>`

      const slotted = this.innerHTML
      this.innerHTML = this.template
      this.querySelector('slot').parentElement.innerHTML = slotted
      this.toggleButton = document.querySelector(this.toggle)
      this.closeButton = this.querySelector('.btn-close')

      this.toggleButton.setAttribute('aria-expanded', false)

      this.toggleButton.addEventListener('click', e => {
        this.isOpen = !this.isOpen
      })

      this.closeButton.addEventListener('click', e => {
        this.isOpen = false
      })
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (name == 'is-open') {
        if (this.isOpen) {
          this.toggleButton.setAttribute('aria-expanded', true)
        } else {
          this.toggleButton.setAttribute('aria-expanded', false)
        }
      }
    }
  }, {
    toggle: false,
    isOpen: true
  }
)
