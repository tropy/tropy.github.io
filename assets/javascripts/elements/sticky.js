import { createElement } from '../helpers/create-element.js'


export const Sticky = createElement(
  'tpy-sticky',

  class extends HTMLElement {
    connectedCallback() {
      this.handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
          if(entry.boundingClientRect.y == 0) {
            this.classList.add('stuck')
          } else {
            this.classList.remove('stuck')
          }
        })
      }

      this.observer = new IntersectionObserver(this.handleIntersect, {
        root: null,
        rootMargin: '-1px 0px 0px 0px',
        threshold: 1
      })

      this.observer.observe(this)
    }
  }
)
