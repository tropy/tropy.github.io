import { withAccessors } from '../../helpers/with-accessors.js'


class DropdownMenu extends HTMLElement {
  static get observedAttributes() {
    return ['is-open', 'aria-labelledby']
  }

  constructor() {
    super()
    this.classList.add('dropdown-menu')
    this.role = 'listbox'
  }
}

const DropdownMenuWithAccessors = withAccessors(DropdownMenu, {
  isOpen: true,
  ariaLabelledby: false
})

export { DropdownMenuWithAccessors as DropdownMenu }
