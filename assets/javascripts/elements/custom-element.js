import { camelToLispCase } from '../helpers/camel-to-lisp-case.js'


export class CustomElement extends HTMLElement {
  constructor() {
    super()

    if (this.render)
      this.doRender()

    if (this.childrenDefinedCallback)
      this.childrenDefined()
  }

  doRender() {
    let result = this.render()

    if (result) {
      const template = document.createElement('template')

      template.innerHTML = result

      const children = this.childNodes // Avoid rerendering in children
      const slot = template.content.querySelector('slot')

      if (children && slot)
        slot.replaceWith(...children)

      this.replaceChildren(template.content)
    }
  }

  async childrenDefined() {
    await Promise.all(
      [...this.querySelectorAll(':not(:defined)')].map(
        (child) => customElements.whenDefined(child.localName)
      )
    )

    this.childrenDefinedCallback()
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
              if (val !== null)
                this.setAttribute(attr, val)

              else
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
