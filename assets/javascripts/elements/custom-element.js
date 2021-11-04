import { camelToLispCase } from '../helpers/camel-to-lisp-case.js'


export class CustomElement extends HTMLElement {
  constructor() {
    super()
    if (this.elementChangedCallback)
      new MutationObserver(this.elementChangedCallback.bind(this))
        .observe(this, { childList: true, attributes: true })

    this.doRender()
  }

  doRender() {
    if (this.render) {
      const children = this.innerHTML

      this.innerHTML = this.render()

      const slot = this.querySelector('slot')

      if (children && slot)
        slot.outerHTML = children
    }
  }

  static propTypes(props) {
    this.observedAttributes = []

    for (const prop in props) {
      const attr = camelToLispCase(prop)

      switch(props[prop]) {
        case 'string':
          this.observedAttributes.push(attr)

          Object.defineProperty(this.prototype, prop, {
            get: function() {
              return this.getAttribute(attr)
            },

            set: function(val) {
              if (val || val === 0)
                this.setAttribute(attr, val)

              else if (val === false)
                this.setAttribute(attr, val)

              else if (val === null)
                this.removeAttribute(attr)
            }
          })

          break

        case 'bool':
          this.observedAttributes.push(attr)

          Object.defineProperty(this.prototype, prop, {
            get: function() {
              return this.hasAttribute(attr)
            },

            set: function(val) {
              val ? this.setAttribute(attr, '') : this.removeAttribute(attr)
            }
          })
      }
    }
  }
}
