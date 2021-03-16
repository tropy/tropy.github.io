import { os } from '../helpers/os.js'
import { DropdownItem } from './dropdown/index.js'
import { createElement } from '../helpers/create-element.js'


export const DownloadOption = createElement(
  'tpy-download-option',

  class extends DropdownItem {
    static get observedAttributes() {
      return ['href', 'index', 'selected', 'disabled', 'mac', 'win', 'linux']
    }

    connectedCallback() {
      if (os(this.os)) this.disabled = true
    }

    get os() {
      for (const val of ['mac', 'win', 'linux']) {
        return this.hasAttribute(val) && val
      }
    }
  }, {
    disabled: true
  }
)
