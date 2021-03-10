import { withAccessors } from '../../helpers/with-accessors.js'


class DropdownItem extends HTMLElement {
  static get observedAttributes() {
    return ['href', 'index', 'selected', 'disabled']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
      .innerHTML = `<a part="a" href="${this.href}" tabindex="-1"><slot></slot></a>`

    this.a = this.shadowRoot.querySelector('a')

    this.addEventListener('mousemove', e => {
      this.dispatchEvent(new CustomEvent('dropdown.mousemove', {
        bubbles: true,
        detail: { index: this.index }
      }))
    })
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name == 'selected' && this.selected) this.a.focus()
    if (name == 'disabled' && this.disabled) this.disable()
  }

  disable() {
    this.href = null
    this.a.removeAttribute('href')
  }
}

DropdownItem = withAccessors(DropdownItem, {
  index: false,
  href: false,
  selected: true
})

export { DropdownItem }
