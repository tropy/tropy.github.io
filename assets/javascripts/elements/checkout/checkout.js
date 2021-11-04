import { CustomElement } from '../custom-element.js'


export class Checkout extends CustomElement {
  connectedCallback() {
    this.modal = this.querySelector('.modal.payment')
    this.donationElement = this.querySelector('tpy-donations')
    this.donationForm = this.querySelector('#donation-form')
    this.paymentForm = this.querySelector('#payment-form')
    this.submitButton = this.querySelector('#submit')
    this.submitButtonText = this.querySelector('#submit .button-text')
    this.returnButton = this.querySelector('.btn.return')
    this.alert = this.querySelector('.alert')
    this.cardError = this.querySelector('#card-error')
    this.test = key.startsWith('pk_test') ? true : false
    this.stripe
    this.errorMessage
    this.purchaseObj
    this.card
    this.clientSecret
    this.state = 'initial'

    this.donationForm.addEventListener('submit', e => {
      e.preventDefault()
      this.state = 'setup'
    })

    this.paymentForm.addEventListener('submit', this.payWithCard)

    this.addEventListener('modal.close', e => {
      if (this.state != 'error')
        this.state = 'dirty'
    })
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name == 'state')
      switch (this.state) {
        case 'initial':
          // Initial
          break
        case 'dirty':
          this.dirty()
          break
        case 'setup':
          this.setup()
          break
        case 'pay':
          this.pay()
          break
        case 'success':
          this.success()
          break
        case 'error':
          this.error()
      }

    if (name == 'is-open')
      this.modal.isOpen = this.isOpen ? true : false

    if (name == 'error-message')
      this.state = 'error'

    if (name == 'loading')
      this.submitButton.disabled = this.loading ? true : false

    if (name == 'card-error-message')
      this.cardError.textContent = this.cardErrorMessage
  }

  dirty() {
    this.loading = false

    if (this.card && this.card.destroy)
      this.card.destroy()

    this.cardErrorMessage = null
  }

  async setup() {
    if (typeof Stripe === 'undefined')
      await this.loadStripe()

    if (typeof Stripe === 'undefined')
      return

    try {
      this.isOpen = true
      this.loading = true
      this.purchaseObj = this.getPurchaseObject()
      this.stripe = Stripe(key)

      if (this.test)
        console.log(this.purchaseObj)

      this.setSubmitButtonText(this.purchaseObj.amount)
      this.state = 'pay'

    } catch(error) {
      console.error(error)
      this.errorMessage = 'There was a setup error.'
    }
  }

  pay() {
    fetch(paymentEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.purchaseObj)
    })

    .then(result => {
      if (!result.ok)
        throw new Error('Error from pay method.')

      return result.json()
    })

    .then(data => {
      this.clientSecret = data.clientSecret

      let elements = this.stripe.elements({
        locale: 'en' // Other locales cause usability issues on small phones
      })

      this.card = elements.create('card', { style: style })

      this.card.mount('#card-element')

      this.card.on('ready', e => {
        this.card.focus()
        this.loading = false
        this.submitButton.disabled = true

        this.card.on('change', e => {
          this.submitButton.disabled = e.complete ? false : true
          this.cardErrorMessage = e.error ? e.error.message : null
        })
      })

    }).catch((error) => {
      console.error(error)
      this.errorMessage = `There was an error processing your payment.
                           Please try again in a few minutes.`
    })
  }

  success() {
    this.loading = false
    this.submitButton.disabled = true
    this.modal.focus()

    this.returnButton.addEventListener('click', e => {
      location.reload()
    })
  }

  error() {
    console.log(this.errorMessage)
    this.alert.textContent = this.errorMessage
    this.isOpen = false
  }

  loadStripe() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')

      document.body.appendChild(script)

      script.addEventListener('load', resolve)
      script.addEventListener('error', reject)
      script.src = 'https://js.stripe.com/v3/'
    })

    .then(() => {
      return

    }).catch((error) => {
      console.error(error)
      this.errorMessage = 'There was an error loading Stripe.'
    })
  }

  getPurchaseObject() {
    const data = new FormData(this.donationForm)
    const keys = ['period', 'amount', 'paymentName', 'paymentEmail']
    let values = []
    let purchaseObj = {}

    for (let value of data.values()) {
       values.push(value)
    }

    keys.forEach((key, i) => purchaseObj[key] = values[i])
    purchaseObj.amount = parseFloat(purchaseObj.amount, 10) * 100

    return purchaseObj
  }

  setSubmitButtonText(amount) {
    this.submitButtonText.textContent = `
      Pay ${this.formatCurrency(amount)} Now`
  }

  formatCurrency(cents) {
    let d = cents / 100

    if(typeof(Intl) !== 'undefined')
      return new Intl.NumberFormat('en-US', {
        style:'currency',
        currency:'USD'
      }).format(d)

    else
      return `${d.toFixed(2)}`
  }

  payWithCard = e => {
    e.preventDefault()
    this.loading = true

    this.stripe
      .confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: this.paymentName,
            email: this.paymentEmail,
          },
        }
      })

      .then(result => {
        if (result.error) {
          this.loading = false
          this.cardErrorMessage = result.error.message
        } else {
          this.state = 'success'
        }
      })
  }
}

Checkout.propTypes({
  state: 'string',
  isOpen: 'bool',
  loading: 'bool',
  errorMessage: 'string',
  cardErrorMessage: 'string',
  test: 'bool'
})

customElements.define('tpy-checkout', Checkout)
