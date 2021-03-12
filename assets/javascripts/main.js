import { DownloadButton } from './elements/download-button.js'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from './elements/dropdown/index.js'
import { DownloadOption } from './elements/download-option.js'
import { Modal, ModalHeader, ModalBody } from './elements/modal/index.js'
import { focusVisible } from './focus-visible.js'
import { License } from './license.js'

customElements.define('tpy-download-button', DownloadButton)
customElements.define('tpy-dropdown', Dropdown)
customElements.define('tpy-dropdown-toggle', DropdownToggle)
customElements.define('tpy-dropdown-menu', DropdownMenu)
customElements.define('tpy-download-option', DownloadOption)
customElements.define('tpy-modal', Modal)
customElements.define('tpy-modal-header', ModalHeader)
customElements.define('tpy-modal-body', ModalBody)

focusVisible()
const license = new License()
