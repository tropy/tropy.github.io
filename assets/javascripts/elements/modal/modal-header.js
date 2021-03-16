import { createElement } from '../../helpers/create-element.js'


export const ModalHeader = createElement(
  'tpy-modal-header',

  class ModalHeader extends HTMLElement {
    connectedCallback() {
      this.classList.add('modal-header')
      this.template = `
        <h3 class="modal-title"><slot></slot></h3>
        <button class="btn-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path fill="currentColor" d="M8,2a6,6,0,1,0,6,6A6,6,0,0,0,8,2Zm2.707,7.293a1,1,0,1,1-1.414,1.414L8,9.414,6.707,10.707A1,1,0,0,1,5.293,9.293L6.586,8,5.293,6.707A1,1,0,0,1,6.707,5.293L8,6.586,9.293,5.293a1,1,0,1,1,1.414,1.414L9.414,8Z"/>
          </svg>
        </button>`

      const slotted = this.innerHTML
      this.innerHTML = this.template
      this.querySelector('slot').parentElement.innerHTML = slotted
    }
  }
)
