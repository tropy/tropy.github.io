<script>
  if (window.location.hash) {
    if (performance.navigation.type != performance.navigation.TYPE_RELOAD) {
      const html = document.querySelector('html');

      html.classList.add('fragment-loading');
    }
  }
</script>
