export const os = (val => {
  var os

  try {
    const UA = navigator.userAgent

    if ((/Mac/).test(UA) && !(/iP(hone|ad)/).test(UA)) {
      os = 'mac'

    } else if ((/Windows/).test(UA)) {
      os = 'win'

    } else if ((/Linux/).test(UA) && !(/Android/).test(UA)) {
      os = 'linux'
    }

  } catch (error) {
    // ignore
  }

  return val => val == os ? true : false
})()
