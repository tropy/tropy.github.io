import { createElement } from '../helpers/create-element.js'


export const ScrollNav = createElement(
  'tpy-scroll-nav',

  class extends HTMLElement {
    connectedCallback() {
      this.role = 'nav'

      if (this.scrollWidth > this.clientWidth) {
        const list = this.querySelector('ul');
        const selected = list.querySelector('.selected')
        const offset = (selected.offsetLeft + selected.offsetWidth / 2)
          - this.offsetWidth / 2

        this.scrollTo(offset, 0)
      }
    }
  }
)
