import { createElement } from '../../helpers/create-element.js'


export const DropdownMenu = createElement(
  'tpy-dropdown-menu',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['is-open', 'aria-labelledby']
    }

    constructor() {
      super()
      this.role = 'listbox'
      this.classList.add('dropdown-menu')
    }
  }, {
    isOpen: true,
    ariaLabelledby: false
  }
)
