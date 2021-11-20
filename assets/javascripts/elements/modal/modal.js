import { CustomElement } from '../custom-element.js'
import { FocusTrap } from '../../helpers/focus-trap.js'


export class Modal extends CustomElement {
  connectedCallback() {
    this.classList.add('modal')
    this.tabIndex = '-1'
    this.focusTrap = new FocusTrap(this)
  }

  elementChangedCallback(mutationsList, observer) {
    this.modalHeaderTitle = this.querySelector('.modal-title')
    this.btnClose = this.querySelector('.btn-close')
    this.modalBody = this.querySelector('.modal-body')
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name == 'is-open')
      this.isOpen ? this.open() : this.close()
  }

  open() {
    this.trigger = document.activeElement
    this.focus()
    this.addBackdrop()
    if (this.modalTitle)
      this.modalHeaderTitle.innerText = this.modalTitle
    if (this.content)
      this.modalBody.innerHTML = this.content

    document.body.classList.add('modal-open')
    document.addEventListener('click', this.handleClick)
    document.addEventListener('keydown', this.handleKey)
    this.focusTrap.activate()
  }

  close() {
    this.removeBackdrop()
    document.body.classList.remove('modal-open')
    document.removeEventListener('click', this.handleClick)
    document.removeEventListener('keydown', this.handleKey)
    this.trigger.focus()
    this.focusTrap.deactivate()
    this.dispatchEvent(new Event('modal.close', { bubbles: true }))
  }

  handleClick = e => {
    if (!this.isStatic ?
      e.target != this.trigger &&
      e.target == this ||
      e.target == this.btnClose :

      e.target != this.trigger &&
      e.target == this.btnClose
    ) {
      this.isOpen = false
    }
  }

  handleKey = e => {
    switch (e.key) {
      case 'Escape':
        if (!this.isStatic)
          this.isOpen = false
    }
  }

  addBackdrop() {
    const el = document.createElement('div')

    el.className = 'modal-backdrop'
    this.backdrop = document.body.appendChild(el)
  }

  removeBackdrop() {
    this.backdrop.remove()
  }

  render() {
    return `
      <div class="modal-dialog">
        <div class="modal-content">
          ${this.children}
        </div>
      </div>`
  }
}

Modal.propTypes = {
  isOpen: Boolean,
  modalTitle: String,
  centered: Boolean,
  isStatic: Boolean
}

customElements.define('tpy-modal', Modal)
