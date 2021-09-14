import { createElement } from '../../helpers/create-element.js'


export const ModalHeader = createElement(
  'tpy-modal-header',

  class ModalHeader extends HTMLElement {
    connectedCallback() {
      this.classList.add('modal-header')
      this.template = `
        <h3 class="modal-title"><slot></slot></h3>
        <button class="btn-close"></button>`

      const slotted = this.innerHTML
      this.innerHTML = this.template
      this.querySelector('slot').parentElement.innerHTML = slotted
    }
  }
)
