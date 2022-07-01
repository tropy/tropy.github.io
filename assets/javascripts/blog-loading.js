if (
  window.location.hash &&
  performance.navigation.type != performance.navigation.TYPE_RELOAD &&
  performance.navigation.type != performance.navigation.TYPE_BACK_FORWARD
) {
  const html = document.querySelector('html')

  html.classList.add('fragment-loading')

  window.addEventListener('scroll', () => {
    html.classList.remove('fragment-loading')
  }, { once: true })
}
