import { createElement } from '../../helpers/create-element.js'

export var DropdownItem = createElement(
  'tpy-dropdown-item',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['href', 'index', 'selected', 'disabled']
    }

    constructor() {
      super()

      this.a = document.createElement('a')
      this.a.tabIndex = -1
      this.a.href = this.href

      this.a.replaceChildren(...this.childNodes)

      this.addEventListener('mousemove', () => {
        this.dispatchEvent(new CustomEvent('dropdown.mousemove', {
          bubbles: true,
          detail: { index: this.index }
        }))
      })
    }

    connectedCallback() {
      this.classList.add('dropdown-item')
      this.replaceChildren(this.a)
    }

    attributeChangedCallback(name) {
      if (name == 'selected' && this.selected) this.a.focus()

      if (name == 'href') this.a.href = this.href
    }
  }, {
    index: false,
    href: false,
    selected: true
  }
)
