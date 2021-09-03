import { createElement } from '../helpers/create-element.js'


export const Donations = createElement(
  'tpy-donations',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['is-monthly']
    }

    connectedCallback() {
      this.template = `<slot></slot>`

      const slotted = this.innerHTML
      this.innerHTML = this.template
      this.querySelector('slot').parentElement.innerHTML = slotted
      const frequency = this.querySelectorAll('.frequency input')

      frequency.forEach(radio => {
        radio.addEventListener('change', this.handleFrequencyChange)
      })
    }

    handleFrequencyChange = (e) => {
      if (e.target.value == "monthly") {
        this.isMonthly = true
      } else {
        this.isMonthly = false
      }
    }

  }, {
    isMonthly: true
  }
)
