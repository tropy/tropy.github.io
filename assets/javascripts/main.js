import './elements/dropdown/index.js'
import './elements/modal/index.js'
import './elements/dependencies.js'
import './focus-visible.js'
import { DownloadButton } from './elements/download-button.js'
import * as os from './helpers/os.js'
import { getLatestRelease } from './helpers/release.js'

os.guess()

document.addEventListener('DOMContentLoaded', async () => {
  let release = await getLatestRelease()
  let button = new DownloadButton(release)

  document
    .querySelector('.hero .container-fluid')
    .append(button)

}, { once: true })
