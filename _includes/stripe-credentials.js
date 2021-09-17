{% if jekyll.environment == "development" %}
  var stripe = Stripe("{{ site.stripe_dev }}");
  const paymentEndpoint = "{{ site.paymentEndpoint_dev }}";
{% elsif jekyll.environment == "production" %}
  var stripe = Stripe("{{ site.stripe }}");
  const paymentEndpoint = "{{ site.paymentEndpoint }}";
{% endif %}
