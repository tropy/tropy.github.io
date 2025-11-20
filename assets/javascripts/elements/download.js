import { CustomElement } from './custom-element.js'
import { guess, platform, arch } from '../helpers/os.js'
import { getLatestRelease } from '../helpers/release.js'
import { chevronDown } from '../helpers/includes.js'

const SUPPORTED_PLATFORMS = ['darwin', 'win32', 'linux']
const APPLE_ARCH = { x64: 'Intel', arm64: 'Silicon' }
const PACKAGES = {
  flatpak: {
    tag: 'Flatpak (arm64, x64)',
    command: 'flatpak install flathub org.tropy.Tropy'
  }
}


export class Download extends CustomElement {
  constructor() {
    super()
    guess()
    this.getRelease()

    if (platform == 'linux')
      this.package = PACKAGES.flatpak.command
  }

  connectedCallback() {
    this.addEventListener('dropdown.command', (e) => {
      this.package = e.detail.command
    })

    this.addEventListener('click', (e) => {
      if (e.target.matches('.btn.package'))
        this.copy()
    })
  }

  attributeChangedCallback(name) {
    if (name == 'package') {
      super.doRender()
    }
  }

  async getRelease() {
    const timer = () => new Promise((res, rej) => setTimeout(rej, 10000))

    try {
      this.release = await Promise.race([getLatestRelease(), timer()])
      this.release.assets = [...this.release.assets].sort(byPlatform)
      super.doRender()

    } catch {
      this.failed = true

      super.doRender()
    }
  }

  render() {
    if (this.release)
      return `
        ${this.buttonGroup()}
        ${this.releaseNotesLink()}`

    else if (this.failed)
      return `${this.fallbackButton()}`

    else
      return `<div class="spinner"></div>`
  }

  buttonGroup() {
    if (SUPPORTED_PLATFORMS.includes(platform)) {
      return `
        <div class="btn-group download">
          ${this.downloadButton()}
          <tpy-dropdown class="btn-group">
            <tpy-dropdown-toggle
              class="dropdown-toggle-split"
              label="More Platforms">
              <span class="icon icon-caret-down">${chevronDown}</span>
            </tpy-dropdown-toggle>
            <tpy-dropdown-menu>
              ${this.dropdownItems()}
            </tpy-dropdown-menu>
          </tpy-dropdown>
        </div>`

    } else {
      return `
        <a
          href="mailto:?subject=${eMailSubject()}&body=${eMailBody(this.release.assets)}"
          class="btn btn-email">
          Send Download Links
        </a>`
    }
  }

  downloadButton() {
    let [head] = this.release.assets

    if (this.package)
      return `
        <button class="btn package">
          <span class="content">${this.package}</span>
          <span class="feedback" aria-hidden="true"></span>
        </button>`

    else
      return `
        <a href="${head.url}" class="btn">
          Download Tropy for <strong>${tag(head)}</strong>
        </a>`
  }

  dropdownItems() {
    let assets
    let dropdownItems

    if (this.package) {
      assets = this.release.assets

    } else {
      assets = this.release.assets.slice(1)
    }

    dropdownItems = assets.map(asset => `
      <tpy-dropdown-item url="${asset.url}">
        ${tag(asset)}
      </tpy-dropdown-item>`
    ).join('')

    if (this.release.url) dropdownItems += `
      <tpy-dropdown-item url="${this.release.url}">
        Other platforms
      </tpy-dropdown-item>`

    dropdownItems += `
      <div class="separator" role="option" aria-disabled="true"></div>`

    dropdownItems += Object.values(PACKAGES).map(pkg => `
      <tpy-dropdown-item command="${pkg.command}">
        ${pkg.tag}
      </tpy-dropdown-item>`
    ).join('')

    return dropdownItems
  }

  releaseNotesLink() {
    if (this.release.version)
      return `
        <a href="${this.release.url}" class="release-notes">
          What’s new in version ${this.release.version}
        </a>`

    else
      return ''
  }

  fallbackButton() {
    return `
      <a
        href="https://github.com/tropy/tropy/releases/latest"
        class="btn btn-fallback">
        Download Tropy
      </a>`
  }

  async copy() {
    const btn = this.querySelector('.btn.package')
    const feedback = this.querySelector('.feedback')

    try {
      await navigator.clipboard.writeText(this.package)

      feedback.textContent = 'Copied!'
      btn.classList.add('success')
      setTimeout(() => btn.classList.remove('success'), 1000)

    } catch (error) {
      feedback.textContent = 'Copy failed!'
      btn.classList.add('failure')
      setTimeout(() => btn.classList.remove('failure'), 1000)
    }
  }
}

Download.propTypes = {
  package: String,
  release: Object,
  failed: Boolean
}

customElements.define('tpy-download', Download)


const eMailSubject = () =>
  encodeURIComponent('Install Tropy')

const eMailBody = (assets) => {
  let downloads = assets.map(asset =>
    `Download Tropy for ${tag(asset)}:\n${asset.url}\n`
  ).join('\n')

  let separator = '\n---\n\n'

  let packages = (Object.values(PACKAGES).map(pkg =>
    `${pkg.tag}:\n${pkg.command}\n`
  ).join('\n'))

  return encodeURIComponent(downloads + separator + packages)
}

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
