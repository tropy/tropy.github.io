import './elements/dropdown/index.js'
import './elements/modal/index.js'
import './elements/dependencies.js'
import './focus-visible.js'
import { Download } from './elements/download.js'
import * as os from './helpers/os.js'
import { getLatestRelease } from './helpers/release.js'

os.guess()

document.addEventListener('DOMContentLoaded', async () => {
  let release = await getLatestRelease()
  let button = new Download(release)

  document
    .querySelector('.hero .container-fluid')
    .append(button)

}, { once: true })
