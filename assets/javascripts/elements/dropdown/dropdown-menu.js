import { CustomElement } from '../custom-element.js'


export class DropdownMenu extends CustomElement {
  connectedCallback() {
    this.role = 'listbox'
    this.classList.add('dropdown-menu')
  }
}

DropdownMenu.propTypes = {
  isOpen: Boolean,
  ariaLabelledby: String
}

customElements.define('tpy-dropdown-menu', DropdownMenu)
