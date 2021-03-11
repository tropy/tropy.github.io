import { focusVisible } from './focus-visible.js'
import { Sticky } from './elements/sticky.js'
import { ScrollNav } from './elements/scroll-nav.js'


customElements.define('tpy-sticky', Sticky)
customElements.define('tpy-scroll-nav', ScrollNav)

focusVisible()
