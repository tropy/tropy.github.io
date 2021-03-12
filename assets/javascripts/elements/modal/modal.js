import { withAccessors } from '../../helpers/with-accessors.js'


class Modal extends HTMLElement {
  static get observedAttributes() {
    return ['is-open', 'modal-title', 'centered']
  }

  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleKey = this.handleKey.bind(this);
    const shadow = this.attachShadow({ mode: 'open' })
      .innerHTML = `
      <div part="modal-dialog">
        <div part="modal-content">
          <slot></slot>
        </div>
      </div>`
    const slot = this.shadowRoot.querySelector('slot')
    this.tabIndex = "-1"

    slot.addEventListener('slotchange', e => {
      this.modalHeader = this.querySelector('tpy-modal-header')
      this.modalHeaderTitle = this.modalHeader.shadowRoot.querySelector('h3')
      this.btnClose = this.modalHeader.shadowRoot.querySelector('button')
      this.modalBody = this.querySelector('tpy-modal-body')
    })
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name == 'is-open') {
      this.isOpen ? this.open() : this.close()
    }
  }

  open() {
    this.focus()
    this.modalHeaderTitle.innerText = this.modalTitle
    this.modalBody.innerHTML = this.content
    this.addBackdrop()
    document.body.classList.add('modal-open')
    document.addEventListener('click', this.handleClick)
    document.addEventListener('keydown', this.handleKey)
  }

  close() {
    this.removeBackdrop()
    document.body.classList.remove('modal-open')
    document.removeEventListener('click', this.handleClick)
    document.removeEventListener('keydown', this.handleKey);
    this.trigger.focus()
  }

  handleClick(e) {
    if (
      e.target != this.trigger &&
      e.target == this ||
      e.composedPath()[0] == this.btnClose
    ) {
      this.isOpen = false
    }
  }

  handleKey(e) {
    switch (e.key) {
      case 'Escape':
        this.isOpen = false
        break
      case 'Tab':
        e.preventDefault()
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
}

const ModalWithAccessors = withAccessors(Modal, {
  isOpen: true,
  modalTitle: false,
  centered: true
})

export { ModalWithAccessors as Modal }
