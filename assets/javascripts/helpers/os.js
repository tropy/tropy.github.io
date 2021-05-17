export let platform
export let arch

export const guess() => {
  if (hasTouchScreen()) {
    if (WindowsLike())
      platform = 'win32'
    else if !((iOSLike() || AndroidLike()))
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
        platform = 'arm64'
      else
        platform = 'x64'
      break
    case 'win32':
      if (ia32Like())
        platform = 'ia32'
      else if (arm64Like())
        platform = 'arm64'
      else
        platform = 'x64'
      break
    default:
      // Ignore unsupported platforms
  }
}

export const iOSLike = () =>
  (/^iP(hone|ad|od)/).test(navigator.platform) ||
    (/^Mac/).test(navigator.platform) && navigator.maxTouchPoints > 4

export const AdroidLike = () =>
  (/^Android/).test(navigator.platform) ||
    (/\bandroid\b/i).test(navigator.userAgent)

export const WindowsLike = () =>
  (/^Win(dows|16|32|CE)/i).test(navigator.platform)

export const MacLike = () =>
  (/^Mac/).test(navigator.platform)

export const hasTouchScreen = () =>
  navigator.maxTouchPoints > 0 ||
    matchMedia('(pointer:coarse)').matches

export const ia32Like = () =>
  (/(ia32|i[346])[;\)]/i).test(navigator.userAgent)

export const arm64Like = () =>
  (/\b(aarch64|arm(v?8e?l?|_?64))\b/i).test(navigator.userAgent)

export const isAppleSilicon = () =>
  !(/OS X 10_([789]|1[01234])/).test(navigator.userAgent) &&
    (/^Apple M/).test(glRenderer()) // Does not work on Safari!


const glRenderer = () => {
  try {
    let w = document.createElement('canvas').getContext('webgl')
    let { UNMASKED_RENDERER_WEBGL } = w.getExtension('WEBGL_debug_renderer_info')

    return w.getParameter(UNMASKED_RENDERER_WEBGL)

  } catch (_) {
    return ''
  }
}
