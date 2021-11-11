import { CustomElement } from '../custom-element.js'


export class DropdownItem extends CustomElement {
  constructor() {
    super()

    this.a = this.querySelector('a')

    this.addEventListener('mousemove', () => {
      this.dispatchEvent(new CustomEvent('dropdown.mousemove', {
        bubbles: true,
        detail: { index: this.index }
      }))
    })
  }

  connectedCallback() {
    this.classList.add('dropdown-item')
  }

  attributeChangedCallback(name) {
    if (name == 'selected' && this.selected)
      this.a.focus()

    if (name == 'href')
      this.a.href = this.href
  }

  render() {
    return `<a href="${this.href}" tabindex="-1"><slot></slot></a>`
  }
}

CustomElement.propTypes = {
  index: 'string',
  href: 'string',
  selected: 'bool'
}

customElements.define('tpy-dropdown-item', DropdownItem)
