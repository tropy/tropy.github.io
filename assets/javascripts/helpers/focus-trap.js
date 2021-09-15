import { isVisible } from './is-visible.js'


export class FocusTrap {
  constructor(container) {
    this.container = container
    this.elements
    this.result = []
    this.firstFocusableElement
    this.focusableElements
    this.lastFocusableElement
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

    this.update()

    document.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (
            document.activeElement === this.firstFocusableElement ||
            document.activeElement === container
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
    }, true)
  }

  update() {
    this.elements = this.container.querySelectorAll(this.selector)
    this.result = []

    this.elements.forEach((el) => {
      if (isVisible(el)) this.result.push(el)
    })

    this.firstFocusableElement = this.result[0]
    this.focusableElements = this.result
    this.lastFocusableElement = this.result[this.result.length - 1]
  }
}
