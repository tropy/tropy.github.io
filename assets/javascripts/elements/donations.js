import { CustomElement } from './custom-element.js'


export class Donations extends CustomElement {
  connectedCallback() {
    this.form = this.querySelector('#donation-form')
    this.frequencyRadios = this.querySelectorAll('.frequency input')
    this.oneTime = this.querySelector('.one-time')
    this.monthly = this.querySelector('.monthly')

    this.o = this.oneTime.cloneNode(true)
    this.oneTime.replaceWith(this.o)
    this.monthly.remove()

    this.frequencyRadios.forEach(radio => {
      radio.addEventListener('change', this.handleFrequencyChange)
    })
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name == 'is-monthly') {
      if (this.isMonthly) {
        this.m = this.monthly.cloneNode(true)
        this.o.replaceWith(this.m)

      } else {
        this.o = this.oneTime.cloneNode(true)
        this.m.replaceWith(this.o)
      }
    }
  }

  handleFrequencyChange = (e) => {
    if (e.target.value == "monthly") {
      this.isMonthly = true
    } else {
      this.isMonthly = false
    }
  }

  render() {
    return `<slot></slot>`
  }
}

Donations.propTypes({
  isMonthly: 'bool'
})

customElements.define('tpy-donations', Donations)
