---
---
import { CustomElement } from '../custom-element.js'


export class DropdownToggle extends CustomElement {
  constructor() {
    super()
    this.button = this.querySelector('.btn')
    this.button.ariaExpanded = false

    this.button.addEventListener('click', () => {
      this.dispatchEvent(new Event('dropdown.toggle', { bubbles: true }))
    })
  }

  connectedCallback() {
    this.classList.add('dropdown-toggle')
  }

  attributeChangedCallback(name) {
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

  render() {
    return `
      <button class="btn" aria-haspopup="listbox">
        <span class="icon icon-caret-down">
          {%- include chevron-down.svg -%}
        </span>
      </button>`
  }
}

DropdownToggle.propTypes({
  buttonId: 'string',
  label: 'string',
  isOpen: 'bool'
})

customElements.define('tpy-dropdown-toggle', DropdownToggle)
