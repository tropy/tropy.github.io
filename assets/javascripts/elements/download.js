import { CustomElement } from './custom-element.js'
import { platform, arch } from '../helpers/os.js'
import { getLatestRelease } from '../helpers/release.js'

const SUPPORTED_PLATFORMS = ['darwin', 'win32', 'linux']
const APPLE_ARCH = { x64: 'Intel', arm64: 'Silicon' }


export class Download extends CustomElement {
  constructor() {
    super()
    this.getRelease()
  }

  async getRelease() {
    this.release = await getLatestRelease()
  }

  set release(release) {
    this.replaceChildren()
    if (!release?.assets.length) return

    let assets = [...release.assets].sort(byPlatform)

    if (SUPPORTED_PLATFORMS.includes(platform)) {
      this.append(comboButton(assets, release))

    } else {
      this.append(eMailButton(release.assets))
    }

    if (release.version) {
      this.append(releaseNotesLink(release))
    }
  }
}

customElements.define('tpy-download', Download)

const DropdownTemplate = document.createElement('template')

DropdownTemplate.innerHTML = `
  <tpy-dropdown class="btn-group">
    <tpy-dropdown-toggle class="dropdown-toggle-split" label="More Platforms"></tpy-dropdown-toggle>
    <tpy-dropdown-menu>
    </tpy-dropdown-menu>
  </tpy-dropdown>`

const comboButton = (assets, release) => {
  let [head, ...tail] = assets

  let combo = create('div', null, { className: 'btn-group download' })
  let dropdown = DropdownTemplate.content.cloneNode(true)

  let menu = dropdown.querySelector('tpy-dropdown-menu')
  for (let asset of tail)
    menu.append(create('tpy-dropdown-item', tag(asset), {
      href: asset.url
    }))

  if (release.url) {
    menu.append(create('tpy-dropdown-item', 'Other platforms', {
      href: release.url
    }))
  }

  combo.append(primaryButton(head))
  combo.append(dropdown)

  return combo
}

const primaryButton = (asset) =>
  create('a', `Download Tropy for <strong>${tag(asset)}</strong>`, {
    className: 'btn',
    href: asset.url
  })

const releaseNotesLink = ({ url, version }) =>
  create('a', `What’s new in version ${version}`, {
    className: 'release-notes',
    href: url
  })

const eMailButton = (assets) =>
  create('a', 'Send Download Links', {
    className: 'btn btn-email',
    href: `mailto:?subject=${eMailSubject()}&body=${eMailBody(assets)}`
  })

const eMailSubject = () =>
  encodeURIComponent('Download Tropy')

const eMailBody = (assets) =>
  encodeURIComponent(assets.map(asset =>
    `Download Tropy for ${tag(asset)}:\n${asset.url}\n`
  ).join('\n'))

const create = (nodeName, content, attrs = {}) => {
  let node = document.createElement(nodeName)

  for (let [name, value] of Object.entries(attrs))
    node[name] = value

  if (content)
    node.innerHTML = content

  return node
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
