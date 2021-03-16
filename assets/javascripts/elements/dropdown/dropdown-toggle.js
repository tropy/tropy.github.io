import { createElement } from '../../helpers/create-element.js'


export const DropdownToggle = createElement(
  'tpy-dropdown-toggle',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['button-id', 'is-open', 'label']
    }

    constructor() {
      super()
      this.classList.add('dropdown-toggle')
      this.template =`
        <button class="btn" aria-haspopup="listbox">
          <slot></slot>
        </button>`

      const slotted = this.innerHTML
      this.innerHTML = this.template
      this.querySelector('slot').parentElement.innerHTML = slotted

      this.button = this.querySelector('.btn')

      this.button.ariaExpanded = false

      this.button.addEventListener('click', (e) => {
        this.dispatchEvent(new Event('dropdown.toggle', { bubbles: true }))
      })
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name == 'is-open') {
        this.isOpen ?
        this.button.ariaExpanded = true :
        this.button.ariaExpanded = false
      }

      if (name == 'label') {
        this.button.ariaLabel = this.label
      }

      if (name == 'button-id') {
        this.button.id = this.buttonId
      }
    }
  }, {
    buttonId: false,
    label: false,
    isOpen: true
  }
)
