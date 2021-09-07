import { createElement } from '../helpers/create-element.js'


export const EditableRadio = createElement(
  'tpy-editable-radio',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['is-pristine', 'is-active', 'label', 'type', 'min', 'inputmode',
        'step', 'aria-label']
    }

    connectedCallback() {
      this.editable = `
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

      this.radios = this.parentElement.querySelectorAll('input')
      this.radio = this.previousElementSibling
      this.input
      this.isPristine = true

      this.radio.setAttribute('aria-label', this.label)
      this.innerText = this.label

      this.radios.forEach(radio => {
        radio.addEventListener('change', this.handleChange)
      })

      this.addEventListener('click', this.activate)
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (name == 'is-active') {
        this.isActive ? this.activate() : this.deactivate()
      }
    }

    handleChange = (e) => {
      this.radio.checked ? this.isActive = true : this.isActive = false
    }

    activate = () => {
      if (this.isPristine) {
        this.radio.click()
        this.innerHTML = this.editable
        this.input = this.querySelector('input')
        this.isPristine = false
      }

      this.input.focus()

      this.input.addEventListener('input', this.update)
    }

    deactivate = () => {
      this.innerText = this.label
      this.isPristine = true
    }

    update = (e) => {
      this.radio.value = this.input.value
      this.querySelector('.content').innerText = this.input.value
    }
  }, {
    isPristine: true,
    isActive: true,
    label: false,
    type: false,
    min: false,
    inputmode: false,
    step: false,
    ariaLabel: false
  }
)
