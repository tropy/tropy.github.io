import { CustomElement } from '../custom-element.js'


export class DropdownItem extends CustomElement {
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
    if (name == 'selected' && this.selected)
      this.a.focus()

    if (name == 'href')
      this.a.href = this.href
  }
}

CustomElement.propTypes = {
  index: 'string',
  href: 'string',
  selected: 'bool'
}

customElements.define('tpy-dropdown-item', DropdownItem)
