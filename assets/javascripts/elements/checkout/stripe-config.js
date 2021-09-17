---
---

{% if jekyll.environment == "development" %}
  var stripe = Stripe("{{ site.stripe_dev }}");
  const paymentEndpoint = "{{ site.paymentEndpoint_dev }}/start-payment";
{% elsif jekyll.environment == "production" %}
  var stripe = Stripe("{{ site.stripe }}");
  const paymentEndpoint = "{{ site.paymentEndpoint }}/start-payment";
{% endif %}

const style = {
  base: {
    color: "#101012",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#77777c"
    }
  },
  invalid: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: "#e62e2e",
    iconColor: "#e62e2e"
  }
}
