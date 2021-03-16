import { camelToLispCase } from './camel-to-lisp-case.js'


export const createElement = (el, Obj, props=null) => {
  if (props) {
    for (const prop in props) {
      const isBoolean = props[prop]
      const attr = camelToLispCase(prop)

      if (isBoolean) {
        Object.defineProperty(Obj.prototype, prop, {
          get: function() {
            return this.hasAttribute(attr)
          },
          set: function(val) {
            val ? this.setAttribute(attr, '') : this.removeAttribute(attr)
          }
        })
      } else {
        Object.defineProperty(Obj.prototype, prop, {
          get: function() {
            return this.getAttribute(attr)
          },
          set: function(val) {
            if (val || val === 0) this.setAttribute(attr, val)
            else if (val === false) this.setAttribute(attr, val)
            else if (val === null) this.removeAttribute(attr)
          }
        })
      }
    }
  }

  customElements.define(el, Obj)

  return Obj
}
