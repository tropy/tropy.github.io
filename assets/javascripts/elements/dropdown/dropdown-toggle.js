import { withAccessors } from '../../helpers/with-accessors.js'


class DropdownToggle extends HTMLElement {
  static get observedAttributes() {
    return ['button-id', 'is-open', 'label']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' }).innerHTML = `
      <button part="button" aria-haspopup="listbox">
        <slot></slot>
      </button>`
    this.button = this.shadowRoot.querySelector('button')

    this.button.ariaExpanded = false

    this.button.addEventListener('click', (e) => {
      this.dispatchEvent(new Event('dropdown.toggle', {bubbles: true}))
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
}

const DropdownToggleWithAccessors = withAccessors(DropdownToggle, {
  buttonId: false,
  label: false,
  isOpen: true
})

export { DropdownToggleWithAccessors as DropdownToggle }
