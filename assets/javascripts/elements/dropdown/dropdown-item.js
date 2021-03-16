import { createElement } from '../../helpers/create-element.js'


export const DropdownItem = createElement(
  'tpy-dropdown-item',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['href', 'index', 'selected', 'disabled']
    }

    constructor() {
      super()
      this.classList.add('dropdown-item')
      this.template = `<a href="${this.href}" tabindex="-1"><slot></slot></a>`
      const slotted = this.innerHTML
      this.innerHTML = this.template
      this.querySelector('slot').parentElement.innerHTML = slotted
      this.a = this.querySelector('a')

      this.classList.add('dropdown-item')

      this.addEventListener('mousemove', e => {
        this.dispatchEvent(new CustomEvent('dropdown.mousemove', {
          bubbles: true,
          detail: { index: this.index }
        }))
      })
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (name == 'selected' && this.selected) this.a.focus()
    }
  }, {
    index: false,
    href: false,
    selected: true
  }
)
