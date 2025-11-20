import { CustomElement } from '../custom-element.js'


export class DropdownItem extends CustomElement {
  connectedCallback() {
    this.role = 'option'
    this.classList.add('dropdown-item')
    this.el = this.querySelector(':only-child')

    if (this.url) {
      this.el.href = this.url
    }

    this.addEventListener('mousemove', () => {
      this.dispatchEvent(new CustomEvent('dropdown.mousemove', {
        bubbles: true,
        detail: { index: this.index }
      }))
    })

    if (this.command)
      this.addEventListener('click', this.handleClick)
  }

  attributeChangedCallback(name) {
    if (name == 'selected' && this.selected)
      this.el.focus()
  }

  render() {
    if (this.command)
      return `<button tabindex="-1"><slot></slot></button>`

    else
      return `<a href="${this.url}" tabindex="-1"><slot></slot></a>`
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent('dropdown.command', {
      bubbles: true,
      detail: { command: this.command }
    }))
  }
}

CustomElement.propTypes = {
  index: String,
  command: String,
  url: String,
  selected: Boolean
}

customElements.define('tpy-dropdown-item', DropdownItem)
