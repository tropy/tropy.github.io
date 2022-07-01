import { CustomElement } from './custom-element.js'


export class Sticky extends CustomElement {
  connectedCallback() {
    this.handleIntersect = (entries) => {
      entries.forEach(entry => {
        if(entry.boundingClientRect.y == 0)
          this.classList.add('stuck')

        else
          this.classList.remove('stuck')
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

customElements.define('tpy-sticky', Sticky)
