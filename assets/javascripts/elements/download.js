import { createElement } from '../helpers/create-element.js'
import { platform, arch } from '../helpers/os.js'

const SUPPORTED_PLATFORMS = ['darwin', 'win32', 'linux']
const APPLE_ARCH = { x64: 'Intel', arm64: 'Silicon' }


export class Download extends HTMLElement {
  constructor(release) {
    super()
    this.release = release
  }

  set release(release) {
    this.replaceChildren()
    if (!release?.assets.length) return

    let assets = [...release.assets].sort(byPlatform)

    if (SUPPORTED_PLATFORMS.includes(platform)) {
      if (assets.length > 1)
        this.append(comboButton(assets))
      else
        this.append(primaryButton(assets[0]))

    } else {
      this.append(eMailButton(release.assets))
    }

    if (release.version) {
      this.append(releaseNotesLink(release))
    }
  }
}

createElement('tpy-download', Download)

const DropdownTemplate = document.createElement('template')

DropdownTemplate.innerHTML = `
  <tpy-dropdown class="btn-group">
    <tpy-dropdown-toggle class="dropdown-toggle-split" label="More Platforms"></tpy-dropdown-toggle>
    <tpy-dropdown-menu>
    </tpy-dropdown-menu>
  </tpy-dropdown>`

const comboButton = (assets) => {
  let [head, ...tail] = assets

  let combo = create('div', null, { className: 'btn-group download' })
  let dropdown = DropdownTemplate.content.cloneNode(true)

  let menu = dropdown.querySelector('tpy-dropdown-menu')
  for (let asset of tail)
    menu.append(create('tpy-dropdown-item', tag(asset), {
      href: asset.url
    }))

  combo.append(primaryButton(head))
  combo.append(dropdown)

  return combo
}

const primaryButton = (asset) =>
  create('a', `Download Tropy for <strong part="strong">${tag(asset)}</strong>`, {
    className: 'btn',
    href: asset.url
  })

const releaseNotesLink = ({ version }) =>
  create('a', `What’s new in version ${version.replace(/\.0$/, '')}`, {
    className: 'release-notes',
    href: `https://github.com/tropy/tropy/releases/tag/${version}`
  })

const eMailButton = (assets) =>
  create('a', 'Send Download Links', {
    className: 'btn',
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
