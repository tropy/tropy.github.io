import { CustomElement } from './custom-element.js'


export class EditableRadio extends CustomElement {
  connectedCallback() {
    this.radios = this.parentElement.querySelectorAll('input')
    this.radio = this.previousElementSibling
    this.input
    this.isPristine = true

    this.radio.ariaLabel = this.label
    this.innerText = this.label

    this.radios.forEach(radio => {
      radio.addEventListener('change', this.handleChange)
    })

    this.addEventListener('click', this.activate)
  }

  attributeChangedCallback(name) {
    if (name == 'is-active') {
      this.isActive ? this.activate() : this.deactivate()
    }
  }

  handleChange = () => {
    this.radio.checked ? this.isActive = true : this.isActive = false
  }

  activate = () => {
    if (this.isPristine) {
      this.radio.click()
      super.doRender()
      this.input = this.querySelector('input')
      this.isPristine = false
    }

    this.input.focus()

    this.input.addEventListener('input', this.update)
  }

  deactivate = () => {
    super.doRender()
    this.isPristine = true
  }

  update = () => {
    this.radio.value = this.input.value
    this.querySelector('.content').innerText = this.input.value
  }

  render() {
    if (this.isActive)
      return `
        <div class="auto-resizer">
          <div class="currency">$</div>
          <div class="content"></div>
          <input
            type="${this.type}"
            ${this.min ? `min="${this.min}"` : null}
            ${this.inputmode ? `inputmode="${this.inputmode}"` : null}
            ${this.step ? `step="${this.step}"` : null}
            required
            aria-label="${this.ariaLabel}">
        </div>`

    else
      return `${this.label}`
  }
}

EditableRadio.propTypes = {
  isPristine: Boolean,
  isActive: Boolean,
  label: String,
  type: String,
  min: String,
  inputmode: String,
  step: String,
  ariaLabel: String
}

customElements.define('tpy-editable-radio', EditableRadio)


