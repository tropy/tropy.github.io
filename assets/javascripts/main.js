import './elements/dropdown/index.js'
import './elements/modal/index.js'
import './elements/dependencies.js'
import './elements/download.js'
import './focus-visible.js'
import * as os from './helpers/os.js'
import { getLatestRelease } from './helpers/release.js'

os.guess()

document.addEventListener('DOMContentLoaded', async () => {
  let button = document.querySelector('tpy-download')
  button.release = await getLatestRelease()

}, { once: true })
