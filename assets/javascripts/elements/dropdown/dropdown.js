import { CustomElement } from '../custom-element.js'


export class Dropdown extends CustomElement {
  constructor() {
    super()

    this.addEventListener('dropdown.toggle', () => {
      this.isOpen = !this.isOpen
      this.dropdownToggleButton.focus() // FF
    })

    this.addEventListener('dropdown.mousemove', e => {
      this.selected = e.detail.index
    })

    this.addEventListener('keydown', e => {
      switch (e.key) {
        case 'Escape':
          this.isOpen = false
          this.dropdownToggleButton.focus()
          break
        case 'Tab':
          this.isOpen = false
          break
        case 'ArrowUp':
          e.preventDefault()
          this.prev()
          break
        case 'ArrowDown':
          e.preventDefault()
          this.next()
      }
    })
  }

  connectedCallback() {
    this.id = Dropdown.id()
    this.classList.add('dropdown')

    this.dropdownToggle = this.firstElementChild
    this.dropdownToggleButton = this.dropdownToggle.querySelector('.btn')
    this.dropdownMenu = this.lastElementChild
    this.dropdownItems = this.dropdownMenu.querySelectorAll('.dropdown-item:not([disabled])')
    this.length = this.dropdownItems.length

    this.dropdownToggle.buttonId = `${this.id}-toggle`
    this.dropdownMenu.ariaLabelledby = this.dropdownToggle.buttonId
    this.dropdownItems.forEach((item, index) => item.index = index)
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name == 'is-open') {
      this.isOpen ? this.open() : this.close()
      this.dropdownToggle.isOpen = this.isOpen
      this.dropdownMenu.isOpen = this.isOpen

    } else if (name == 'selected') {
      if (oldVal) this.dropdownItems[oldVal].selected = false
      if (newVal) this.dropdownItems[newVal].selected = true
    }
  }

  open() {
    window.addEventListener('blur', this.handleFocusOutside)
    document.addEventListener('click', this.handleFocusOutside)
  }

  close() {
    this.selected = null
    window.removeEventListener('blur', this.handleFocusOutside)
    document.removeEventListener('click', this.handleFocusOutside)
  }

  prev() {
    if (!this.selected)
      this.selected = this.length - 1

    else if (this.selected > 0)
      this.selected--
  }

  next() {
    if (!this.selected)
      this.selected = 0

    else if (this.selected < this.length - 1)
      this.selected++
  }

  handleFocusOutside = (e) => {
    if(e.target != this.dropdownToggleButton && e.target != this.dropdownMenu) {
      this.isOpen = false
    }
  }

  render() {
    return `<slot></slot>`
  }
}

// Safari does not support public field declarations yet
Dropdown.id = (() => {
  let id = 1
  return () => `dropdown-${id++}`
})()

Dropdown.propTypes = {
  isOpen: Boolean,
  selected: String
}

customElements.define('tpy-dropdown', Dropdown)
