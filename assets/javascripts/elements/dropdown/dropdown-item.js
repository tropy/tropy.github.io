import { createElement } from '../../helpers/create-element.js'

export var DropdownItem = createElement(
  'tpy-dropdown-item',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['href', 'index', 'selected', 'disabled']
    }

    constructor() {
      super()
      this.classList.add('dropdown-item')

      this.a = document.createElement('a')
      this.a.tabIndex = -1
      this.a.href = this.href

      this.a.replaceChildren(...this.childNodes)
      this.append(this.a)

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
