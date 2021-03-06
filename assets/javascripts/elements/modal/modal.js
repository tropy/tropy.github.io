import { createElement } from '../../helpers/create-element.js'


export const Modal = createElement(
  'tpy-modal',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['is-open', 'modal-title', 'centered']
    }

    connectedCallback() {
      this.classList.add('modal')
      this.tabIndex = '-1'
      this.handleClick = this.handleClick.bind(this)
      this.handleKey = this.handleKey.bind(this)
      this.template = `
        <div class="modal-dialog">
          <div class="modal-content">
            <slot></slot>
          </div>
        </div>`

      new MutationObserver(this.elementChangedCallback)
        .observe(this, { childList: true })

      const slotted = this.innerHTML
      this.innerHTML = this.template
      this.querySelector('slot').parentElement.innerHTML = slotted
    }

    elementChangedCallback = (mutationsList, observer) => {
      this.modalHeaderTitle = this.querySelector('.modal-title')
      this.btnClose = this.querySelector('.btn-close')
      this.modalBody = this.querySelector('.modal-body')
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (name == 'is-open') {
        this.isOpen ? this.open() : this.close()
      }
    }

    open() {
      this.trigger = document.activeElement
      this.focus()
      this.addBackdrop()
      if (this.modalTitle) this.modalHeaderTitle.innerText = this.modalTitle
      if (this.content) this.modalBody.innerHTML = this.content

      document.body.classList.add('modal-open')
      document.addEventListener('click', this.handleClick)
      document.addEventListener('keydown', this.handleKey)
    }

    close() {
      this.removeBackdrop()
      document.body.classList.remove('modal-open')
      document.removeEventListener('click', this.handleClick)
      document.removeEventListener('keydown', this.handleKey)
      this.trigger.focus()
    }

    handleClick(e) {
      if (
        e.target != this.trigger &&
        e.target == this ||
        e.target == this.btnClose
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
  }, {
    isOpen: true,
    modalTitle: false,
    centered: true
  }
)
