import { createElement } from '../../helpers/create-element.js'


export const ModalBody = createElement(
  'tpy-modal-body',

  class extends HTMLElement {
    connectedCallback() {
      this.classList.add('modal-body')
    }
  }
)
