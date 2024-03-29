import { CustomElement } from '../custom-element.js'


export class Modal extends CustomElement {
  connectedCallback() {
    this.classList.add('modal')
  }

  childrenDefinedCallback() {
    this.dialog = this.querySelector('dialog')
    this.modalHeaderTitle = this.querySelector('.modal-title')
    this.btnClose = this.querySelector('.btn-close')
    this.modalBody = this.querySelector('.modal-body')

    this.dialog.addEventListener('close', () => this.isOpen = false)
  }

  attributeChangedCallback(name) {
    if (name == 'is-open')
      this.isOpen ? this.open() : this.close()
  }

  open() {
    if (this.modalTitle)
      this.modalHeaderTitle.innerText = this.modalTitle

    if (this.content)
      this.modalBody.innerHTML = this.content

    document.addEventListener('click', this.handleClick)
    this.dialog.showModal()
  }

  close() {
    document.removeEventListener('click', this.handleClick)
    this.dispatchEvent(new Event('modal.close', { bubbles: true }))

    if (this.dialog.hasAttribute('open'))
      this.dialog.close()
  }

  handleClick = e => {
    if (e.target == this.btnClose || !this.isStatic && e.target == this.dialog)
      this.isOpen = false
  }

  render() {
    return `
      <dialog>
        <div class="modal-dialog">
          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      </dialog>`
  }
}

Modal.propTypes = {
  isOpen: Boolean,
  modalTitle: String,
  centered: Boolean,
  isStatic: Boolean
}

customElements.define('tpy-modal', Modal)
