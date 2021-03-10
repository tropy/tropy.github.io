import { withAccessors } from '../../helpers/with-accessors.js'


class DropdownToggle extends HTMLElement {
  static get observedAttributes() {
    return ['id', 'is-open']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
      .innerHTML = `<button part="button"><slot></slot></button>`

    this.button = this.shadowRoot.querySelector('button')
    this.ariaExpanded = false

    this.addEventListener('click', (e) => {
      this.dispatchEvent(new Event('dropdown.toggle', {bubbles: true}))
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'is-open') {
      this.isOpen ? this.ariaExpanded = true : this.ariaExpanded = false
    }
  }
}

const DropdownToggleWithAccessors = withAccessors(DropdownToggle, {
  isOpen: true,
  ariaExpanded: false
})

export { DropdownToggleWithAccessors as DropdownToggle }
