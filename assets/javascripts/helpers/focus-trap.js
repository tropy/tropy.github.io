import { isVisible } from './is-visible.js'


export class FocusTrap {
  constructor(container) {
    this.container = container
    this.elements
    this.result = []
    this.firstFocusableElement
    this.lastFocusableElement
    this.handleKey = this.handleKey.bind(this)
    this.selector =`
      :is(
        a,
        button,
        input,
        textarea,
        select,
        details,
        [tabindex],
        [contenteditable="true"]
      ):not([tabindex^="-"]):not(:disabled)`
  }

  handleKey(e) {
    if (e.key === 'Tab') {
      this.elements = this.container.querySelectorAll(this.selector)
      this.result = []

      this.elements.forEach((el) => {
        if (isVisible(el)) this.result.push(el)
      })

      this.firstFocusableElement = this.result[0]
      this.lastFocusableElement = this.result[this.result.length - 1]

      if (e.shiftKey) {
        if (
          document.activeElement === this.firstFocusableElement ||
          document.activeElement === this.container
        ) {
          this.lastFocusableElement.focus()
          e.preventDefault()
        }

      } else {
        if (document.activeElement === this.lastFocusableElement) {
          this.firstFocusableElement.focus()
          e.preventDefault()
        }
      }
    }
  }

  activate() {
    document.addEventListener('keydown', this.handleKey)
  }

  deactivate() {
    document.removeEventListener('keydown', this.handleKey)
  }
}
