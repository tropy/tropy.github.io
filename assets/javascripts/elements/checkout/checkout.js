import { createElement } from '../../helpers/create-element.js'
import { stripe, paymentEndpoint, style } from './stripe-config.js'


export const Checkout = createElement(
  'tpy-checkout',

  class extends HTMLElement {
    static get observedAttributes() {
      return ['state', 'loading', 'error-message', 'card-error-message', 'test']
    }

    connectedCallback() {
      this.modal = this.querySelector('.modal.payment')
      this.donationElement = this.querySelector('tpy-donations')
      this.donationForm = this.querySelector('#donation-form')
      this.paymentForm = this.querySelector('#payment-form')
      this.submitButton = this.querySelector('#submit')
      this.submitButtonText = this.querySelector('#submit .button-text')
      this.returnButton = this.querySelector('.btn.return')
      this.alert = this.querySelector('.alert')
      this.errorMessage
      this.card
      this.cardError = this.querySelector('#card-error')
      this.test = stripe._apiKey.startsWith('pk_test') ? true : false
      this.state = 'default'

      this.donationForm.addEventListener('submit', e => {
        e.preventDefault()
        this.state = 'setup'
      })

      this.addEventListener('modal.close', e => {
        this.closing()
      })
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (name == 'state') {
        switch (this.state) {
          case 'default':
            // Default state
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
      }

      if (name == 'error-message') this.state = 'error'

      if (name == 'loading') {
        this.submitButton.disabled = this.loading ? true : false
      }

      if (name == 'card-error-message') {
        this.cardError.textContent = this.cardErrorMessage
      }
    }

    setup() {
      try {
        this.loading = true
        this.modal.isOpen = true
        this.purchaseObj = this.getPurchaseObject()

        if (this.test) console.log(this.purchaseObj)

        this.setSubmitButtonText(this.purchaseObj.amount)

        this.state = 'pay'

      } catch(error) {
        console.error(error)
        this.errorMessage = 'There has been a setup error.'
      }
    }

    pay() {
      try {
        fetch(paymentEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.purchaseObj)
        })

        .then(result => {
          if (!result.ok) throw new Error("Error from pay method.")

          return result.json()
        })

        .then(data => {
          let elements = stripe.elements({
            locale: 'en' // Other locales cause usability issues on small phones
          })
          this.card = elements.create("card", { style: style })

          this.card.mount("#card-element")

          this.card.on('ready', e => {
            this.card.focus()
            this.loading = false
            this.submitButton.disabled = true

            this.card.on("change", e => {
              this.submitButton.disabled = e.complete ? false : true
              this.cardErrorMessage = e.error ? e.error.message : null
            })
          })

          this.paymentForm.addEventListener('submit', e => {
            event.preventDefault()
            this.payWithCard(
              stripe,
              this.card,
              data.clientSecret,
              this.purchaseObj.paymentName,
              this.purchaseObj.paymentEmail
            )
          })
        }).catch((error) => {
          console.error(error)
          this.errorMessage = `There was an error processing your payment.
                               Please try again in a few minutes.`
        })

      } catch(error) {
        console.error(error)
        this.errorMessage = `There was an error processing your payment.
                             Please try again in a few minutes.`
      }
    }

    success() {
      this.loading = false
      this.submitButton.disabled = true
      this.modal.focus()

      this.returnButton.addEventListener('click', e => {
        this.modal.isOpen = false
      }, { once: true })
    }

    error() {
      this.alert.textContent = this.errorMessage
      this.modal.isOpen = false
    }

    closing() {
      this.loading = false
      if (this.card.unmount) this.card.unmount()
      this.cardErrorMessage = null
      if (this.state == 'success') this.donationElement.reset = true
      if (this.state != 'error') this.state = 'default'
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
      if(typeof(Intl) !== 'undefined') {
        return new Intl.NumberFormat('en-US', {
          style:'currency',
          currency:'USD'
        }).format(d)
      } else {
        return `${d.toFixed(2)}`
      }
    }

    payWithCard(stripe, card, clientSecret, paymentName, paymentEmail) {
      this.loading = true
      stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: paymentName,
              email: paymentEmail,
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
  }, {
    state: false,
    loading: true,
    errorMessage: false,
    cardErrorMessage: false,
    test: true
  }
)
