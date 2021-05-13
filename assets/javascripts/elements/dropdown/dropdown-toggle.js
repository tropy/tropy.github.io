---
---
import { createElement } from '../../helpers/create-element.js'

const DropdownToggleTemplate = document.createElement('template')

DropdownToggleTemplate.innerHTML = `
  <button class="btn" aria-haspopup="listbox">
    <span class="icon icon-caret-down">
      {%- include chevron-down.svg -%}
    </span>
  </button>`


export var DropdownToggle = createElement(
  'tpy-dropdown-toggle',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['button-id', 'is-open', 'label']
    }

    constructor() {
      super()
      this.classList.add('dropdown-toggle')

      this.replaceChildren(DropdownToggleTemplate.content.cloneNode(true))

      this.button = this.querySelector('.btn')
      this.button.ariaExpanded = false

      this.button.addEventListener('click', (e) => {
        this.dispatchEvent(new Event('dropdown.toggle', { bubbles: true }))
      })
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name == 'is-open') {
        this.button.ariaExpanded = this.isOpen
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
