import { os } from '../helpers/os.js'
import { withAccessors } from '../helpers/with-accessors.js'


class DownloadButton extends HTMLElement {
  static get observedAttributes() {
    return ['href', 'text']
  }

  connectedCallback() {
    this.innerHTML = `<a class="btn"></a>`
    this.a = this.querySelector('a')

    if (os('mac')) {
      this.href = '/download/mac'
      this.text = 'macOS'

    } else if (os('win')) {
      this.href = '/download/windows'
      this.text = 'Windows'

    } else if (os('linux')) {
      this.href = '/download/linux'
      this.text = 'linux'
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name == 'href') this.a.setAttribute('href', this.href)

    if (name == 'text') this.a.innerHTML = `
      Download Tropy for <strong part="strong">${this.text}</strong>`
  }
}

const DownloadButtonWithAccessors = withAccessors(DownloadButton, {
  href: false,
  text: false
})

export { DownloadButtonWithAccessors as DownloadButton }
