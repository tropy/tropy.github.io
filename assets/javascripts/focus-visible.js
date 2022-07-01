export const focusVisible = (() => {
  const html = document.querySelector('html')

  document.addEventListener("keydown", e => {
    if (e.key == 'Tab')
      html.classList.add('key')
  })

  document.addEventListener("mousedown", () => {
    html.classList.remove('key')
  })
})()
