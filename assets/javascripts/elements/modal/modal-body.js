import { CustomElement } from '../custom-element.js'


export class ModalBody extends CustomElement {
  connectedCallback() {
    this.classList.add('modal-body')
  }
}

customElements.define('tpy-modal-body', ModalBody)
