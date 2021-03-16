import { createElement } from '../../helpers/create-element.js'


export const DropdownMenu = createElement(
  'tpy-dropdown-menu',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['is-open', 'aria-labelledby']
    }

    constructor() {
      super()
      this.classList.add('dropdown-menu')
      this.role = 'listbox'
    }
  }, {
    isOpen: true,
    ariaLabelledby: false
  }
)
