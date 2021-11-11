import { camelToLispCase } from '../helpers/camel-to-lisp-case.js'


export class CustomElement extends HTMLElement {
  constructor() {
    super()

    if (this.elementChangedCallback)
      new MutationObserver(this.elementChangedCallback.bind(this))
        .observe(this, { childList: true, attributes: true })

    this.doRender()
  }

  doRender(...args) {
    if (this.render) {
      let result = this.render(...args)

      if (result) {
        const template = document.createElement('template')

        template.innerHTML = result

        const children = this.childNodes
        const slot = template.content.querySelector('slot')

        if (children && slot)
          slot.replaceWith(...children)

        this.replaceChildren(template.content)
      }
    }
  }

  attributeChangedCallback() {
    // This makes sure that observedAttributes is called
  }

  static get observedAttributes() {
    return this.reflectedProps
  }

  static get reflectedProps() {
    const attributes = []

    for (const prop in this.propTypes) {
      const attr = camelToLispCase(prop)

      switch(this.propTypes[prop]) {
        case String:
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

        case Boolean:
          Object.defineProperty(this.prototype, prop, {
            get: function() {
              return this.hasAttribute(attr)
            },

            set: function(val) {
              val ? this.setAttribute(attr, '') : this.removeAttribute(attr)
            }
          })
      }

      attributes.push(attr)
    }

    return attributes
  }
}
