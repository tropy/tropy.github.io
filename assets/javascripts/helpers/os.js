export let platform
export let arch

const uaPlatform = (navigator.userAgentData || navigator).platform

const uaBrand = navigator.userAgentData ?
  navigator.userAgentData.brands.map(b => b.brand).join(' ') :
  navigator.userAgent

const uaHints = navigator.userAgentData ?
  navigator.userAgentData.getHighEntropyValues(['architecture']) :
  Promise.resolve({})


export const guess = () => {
  try {
    if (hasTouchScreen()) {
      if (WindowsLike())
        platform = 'win32'
      else if (!(iOSLike() || AndroidLike()))
        platform = 'linux'

    } else {
      if (MacLike())
        platform = 'darwin'
      else if (WindowsLike())
        platform = 'win32'
      else
        platform = 'linux'
    }

    switch (platform) {
      case 'linux':
        arch = 'x64'
        break
      case 'darwin':
        if (isAppleSilicon())
          arch = 'arm64'
        else
          arch = 'x64'
        break
      case 'win32':
        if (ia32Like())
          arch = 'ia32'
        else if (arm64Like())
          arch = 'arm64'
        else
          arch = 'x64'
        break
      default:
        // Ignore unsupported platforms
    }
  } catch (e) {
    console.warn(`Platform guess failed: ${e.message}`)
  }
}

export const iOSLike = () =>
  (/^iP(hone|ad|od)/).test(uaPlatform) ||
    (/^mac/i).test(uaPlatform) && navigator.maxTouchPoints > 4

export const AndroidLike = () =>
  (/^Android/).test(uaPlatform) ||
    (/\bandroid\b/i).test(uaBrand)

export const WindowsLike = () =>
  (/^Win(dows|16|32|CE)/i).test(uaPlatform)

export const MacLike = () =>
  (/^mac/i).test(uaPlatform)

export const hasTouchScreen = () =>
  navigator.maxTouchPoints > 0 ||
    matchMedia('(pointer:coarse)').matches

export const ia32Like = () =>
  (/(ia32|i[346])[;)]/i).test(uaBrand)

export const arm64Like = () =>
  (/\b(aarch64|arm(v?8e?l?|_?64))\b/i).test(uaBrand)

export const isAppleSilicon = () => {
  if ((/OS X 10_([789]|1[01234])/).test(uaBrand))
    return false

  if ((/^Apple M/).test(glRenderer()))
    return true

  // Assume x64 but override later if we get arch hints!
  uaHints.then(hints => {
    if (hints.architecture === 'arm')
      arch = 'arm64'
  })

  return false
}


const glRenderer = () => {
  try {
    let gl = document.createElement('canvas').getContext('webgl')
    return gl.getParameter(gl.RENDERER)

  } catch (_) {
    return ''
  }
}
