import { CustomElement } from '../custom-element.js'


export class ModalHeader extends CustomElement {
  connectedCallback() {
    this.classList.add('modal-header')
  }

  render() {
    return `
      <h3 class="modal-title">${this.children}</h3>
      <button class="btn-close"></button>`
  }
}

customElements.define('tpy-modal-header', ModalHeader)
