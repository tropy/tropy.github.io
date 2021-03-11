import { DownloadButton } from './elements/download-button.js'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from './elements/dropdown/index.js'
import { DownloadOption } from './elements/download-option.js'
import { focusVisible } from './focus-visible.js'
import { License } from './license.js'


customElements.define('tpy-download-button', DownloadButton)
customElements.define('tpy-dropdown', Dropdown)
customElements.define('tpy-dropdown-toggle', DropdownToggle)
customElements.define('tpy-dropdown-menu', DropdownMenu)
customElements.define('tpy-download-option', DownloadOption)

focusVisible()
const license = new License()
