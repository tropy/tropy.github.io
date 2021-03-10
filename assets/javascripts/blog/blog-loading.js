if (window.location.hash) {
  if (
    performance.navigation.type != performance.navigation.TYPE_RELOAD &&
    performance.navigation.type != performance.navigation.TYPE_BACK_FORWARD
  ) {
    const html = document.querySelector('html');

    html.classList.add('fragment-loading');
  }
}
