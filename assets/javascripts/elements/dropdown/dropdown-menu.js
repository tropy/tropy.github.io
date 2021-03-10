import { withAccessors } from '../../helpers/with-accessors.js'


class DropdownMenu extends HTMLElement {
  static get observedAttributes() {
    return ['is-open', 'aria-labelledby']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
      .innerHTML = `<slot></slot>`
  }
}

const DropdownMenuWithAccessors = withAccessors(DropdownMenu, {
  isOpen: true,
  ariaLabelledby: false
})

export { DropdownMenuWithAccessors as DropdownMenu }
