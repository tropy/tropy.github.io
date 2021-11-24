import { CustomElement } from './custom-element.js'


export class Menu extends CustomElement {
  connectedCallback() {
    this.toggleButton = document.querySelector(this.toggle)
    this.closeButton = this.querySelector('.btn-close')

    this.toggleButton.setAttribute('aria-expanded', false)

    this.toggleButton.addEventListener('click', e => {
      this.isOpen = !this.isOpen
    })

    this.closeButton.addEventListener('click', e => {
      this.isOpen = false
    })
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name == 'is-open')
      this.toggleButton.ariaExpanded = this.isOpen
  }

  render() {
    return `<slot></slot>`
  }
}

Menu.propTypes = {
  toggle: String,
  isOpen: Boolean
}

customElements.define('tpy-menu', Menu)
