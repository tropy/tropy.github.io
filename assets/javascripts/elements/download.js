import { CustomElement } from './custom-element.js'
import { platform, arch } from '../helpers/os.js'
import { getLatestRelease } from '../helpers/release.js'
import { chevronDown } from '../helpers/includes.js'

const SUPPORTED_PLATFORMS = ['darwin', 'win32', 'linux']
const APPLE_ARCH = { x64: 'Intel', arm64: 'Silicon' }


export class Download extends CustomElement {
  constructor() {
    super()
    this.getRelease()
  }

  async getRelease() {
    try {
      const release = await getLatestRelease()
      release.assets = [...release.assets].sort(byPlatform)

      super.doRender(release, release.assets)

    } catch {
      this.failed = true
    }
  }

  render(release, assets) {
    if (release)
      return `
        ${this.downloadButton(release, assets)}
        ${this.releaseNotesLink(release)}`
  }

  downloadButton(release, assets) {
    if (SUPPORTED_PLATFORMS.includes(platform)) {
      let [head, ...tail] = assets

      let dropdownItems = tail.map(asset => `
        <tpy-dropdown-item href="${asset.url}">
          ${tag(asset)}
        </tpy-dropdown-item>`
      ).join('')

      if (release.url) dropdownItems += `
        <tpy-dropdown-item href="${release.url}">
          Other platforms
        </tpy-dropdown-item>`

      return `
        <div class="btn-group download">
          <a href="${head.url}" class="btn">
            Download Tropy for <strong>${tag(head)}</strong>
          </a>
          <tpy-dropdown class="btn-group">
            <tpy-dropdown-toggle
              class="dropdown-toggle-split"
              label="More Platforms">
              <span class="icon icon-caret-down">${chevronDown}</span>
            </tpy-dropdown-toggle>
            <tpy-dropdown-menu>
              ${dropdownItems}
            </tpy-dropdown-menu>
          </tpy-dropdown>
        </div>`

    } else {
      return `
        <a
          href="mailto:?subject=${eMailSubject()}&body=${eMailBody(assets)}"
          class="btn btn-email">
          Send Download Links
        </a>`
    }
  }

  releaseNotesLink({ url, version }) {
    if (version)
      return `
        <a href="${url}" class="release-notes">
          What’s new in version ${version}
        </a>`

    else
      return ''
  }
}

Download.propTypes = {
  failed: Boolean
}

customElements.define('tpy-download', Download)

const eMailSubject = () =>
  encodeURIComponent('Download Tropy')

const eMailBody = (assets) =>
  encodeURIComponent(assets.map(asset =>
    `Download Tropy for ${tag(asset)}:\n${asset.url}\n`
  ).join('\n'))

const tag = (asset) => {
  switch (asset.platform) {
    case 'darwin':
      return `macOS (${APPLE_ARCH[asset.arch]})`
    case 'win32':
      return `Windows (${asset.arch})`
    case 'linux':
      return `Linux (${asset.arch})`
  }
}


const byPlatform = (a, b) => {
  if (a.platform !== platform)
    return (b.platform === platform) ? 1 : 0

  if (b.platform !== platform)
    return -1

  if (a.arch !== arch)
    return (b.arch === arch) ? 1 : 0

  if (b.arch !== arch)
    return -1

  return 0
}
