import { CustomElement } from '../custom-element.js'


export class DropdownMenu extends CustomElement {
  constructor() {
    super()
    this.role = 'listbox'
    this.classList.add('dropdown-menu')
  }
}

DropdownMenu.propTypes = {
  isOpen: 'bool',
  ariaLabelledby: 'string'
}

customElements.define('tpy-dropdown-menu', DropdownMenu)
