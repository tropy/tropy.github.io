import { os } from '../helpers/os.js'
import { DropdownItem } from './dropdown/index.js'
import { withAccessors } from '../helpers/with-accessors.js'


export class DownloadOption extends DropdownItem {
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
}

const DownloadOptionWithAccessors = withAccessors(DownloadOption, {
  disabled: true
})
