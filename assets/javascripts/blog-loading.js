if (
  window.location.hash &&
  performance.navigation.type != performance.navigation.TYPE_RELOAD &&
  performance.navigation.type != performance.navigation.TYPE_BACK_FORWARD
) {
  const html = document.querySelector('html')

  const removeClasses = function(e) {
    html.classList.remove('fragment-loading')

    window.removeEventListener('scroll', removeClasses)
  }

  html.classList.add('fragment-loading')

  window.addEventListener('scroll', removeClasses)
}
