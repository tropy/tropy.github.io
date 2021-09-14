// test credentials
var stripe = Stripe("pk_test_51JT0o3IfQcuZiDTgYUM3KIDT69YA5BL6kZMNDBrwLCLuVkGhFspqbynjnRgPqJgNy7A3bPd3or0AZIy9E0VkIChK00FGZh4e83");
const paymentEndpoint = 'https://dpq4275s2h.execute-api.us-east-1.amazonaws.com/Prod/';
// const paymentEndpoint = 'http://127.0.0.1:3000/';

// live credentials
// var stripe = Stripe("pk_live_51JT0o3IfQcuZiDTgkKraHa2dBIaSF3BXW0WJPrOgA2PlvssbadO8rUCwOW6QzC1DrME6cPtwjkEE99PFuFx3KWJ700l2687cir");
// const paymentEndpoint = 'https://cakatr39t1.execute-api.us-east-1.amazonaws.com/Prod/';

const startPaymentAddress = paymentEndpoint + 'start-payment';

const getPurchaseObject = function() {
  let period = false;
  let amtStr = "";
  let amount = false;
  if(document.getElementById('one-time').checked) {
    period = 'one-time';
    amtStr = document.querySelector('div.amount.one-time input:checked').value;
  } else if (document.getElementById('monthly').checked) {
    period = 'monthly';
    amtStr = document.querySelector('div.amount.monthly input:checked').value;
  } else {
    throw new Error("No period set");
  }

  amount = parseFloat(amtStr, 10) * 100; //stripe charge amounts are integer cents
  var paymentName = document.querySelector("#payment-name").value;
  var paymentEmail = document.querySelector("#payment-email").value;
  var purchaseObj = {
    period,
    amount,
    paymentName,
    paymentEmail
  };

  return purchaseObj;
}

const startPayment = function(evt) {
  if (evt) {
    evt.preventDefault();
  }
  try {
    // Remove Stripe error
    removeStripeError();

    // Show modal
    document.querySelector("#payment-section").setAttribute("is-open", "");

    // Show payment form (if hidden)
    document.querySelector("#payment-form").classList.remove("hidden");

    // create purchase object from form values
    let purchaseObj = getPurchaseObject();

    //set the payment button text with the amount selected
    console.log(purchaseObj);
    setPayButtonText("Pay " + formatCurrency(purchaseObj.amount) + " Now");

    // Disable the button until we have Stripe set up on the page
    // document.querySelector("button").disabled = true;
    loading(true);
    fetch(startPaymentAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(purchaseObj)
    })
    .then(function(result) {
      if (!result.ok) {
        throw new Error("Error from startPayment");
      }
      return result.json();
    })
    .then(function(data) {
      var elements = stripe.elements({
        locale: 'en' // Other languages cause usability issues on small phones
      });

      var style = {
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
      };

      var card = elements.create("card", { style: style });
      // Stripe injects an iframe into the DOM
      card.mount("#card-element");

      // Focus card element
      card.on('ready', function(event) {
        card.focus()
      });

      card.on("change", function (event) {
        // Disable the Pay button if there are no card details in the Element
        document.querySelector("button").disabled = event.empty;
        document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
      });

      var form = document.getElementById("payment-form");
      form.onsubmit = (event) => {
        event.preventDefault();
        // Complete payment when the submit button is clicked
        payWithCard(stripe, card, data.clientSecret, purchaseObj.paymentName, purchaseObj.paymentEmail);
      };

      loading(false);

      // Reset payment form when the modal is closed
      const modal = document.querySelector("#payment-section");

      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === "attributes") {
            if (mutation.attributeName == "is-open" && modal.getAttribute('is-open') == null) {
              card.unmount();
              document.querySelector("#card-error").textContent = "";
              document.querySelector(".result-message").classList.add("hidden");
            }
          }
        });
      });

      observer.observe(modal, {
        attributes: true
      });
    }).catch(function(err){
      //show error for promise rejection
      showStripeError("There was an error processing your payment. Please try again in a few minutes.");
      loading(false);
      document.querySelector("#payment-section").removeAttribute("is-open");
    });
  } catch(err) {
    //show error for unhandled exception
    showStripeError("There was an error processing your payment. Please try again in a few minutes.");
    loading(false);
    document.querySelector("#payment-section").removeAttribute("is-open");
  };
}


// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function(stripe, card, clientSecret, paymentName, paymentEmail) {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: paymentName,
          email: paymentEmail,
        },
      }
    })
    .then(function(result) {
      if (result.error) {
        // Show error to your customer
        showCardError(result.error.message);
      } else {
        // payment succeeded
        orderComplete();
      }
    });
};

/* ------- UI helpers ------- */

let formatCurrency = function(cents){
  let d = cents / 100;
  if(typeof(Intl) !== 'undefined') {
    return new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(d);
  } else {
    return `${d.toFixed(2)}`;
  }
};

// set the text on the payment button so it can show the amount that will be charged
var setPayButtonText = function(text) {
  document.querySelector("#payment-form button span").textContent = text;
}

// Shows a success message when the payment is complete
var orderComplete = function() {
  loading(false);
  document.querySelector(".result-message").classList.remove("hidden");
  document.querySelector("button#submit").disabled = true;
  document.querySelector("#payment-form").classList.add("hidden");
  document.querySelector("#payment-section .modal-header").classList.add("hidden");
};

// Show the customer the error from Stripe if their card fails to charge
var showCardError = function(errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function() {
    errorMsg.textContent = "";
  }, 10000);
};

// show error above payment form with general stripe error
var showStripeError = function(message) {
  //startContact();
  document.querySelector("#stripe-error").textContent = message;
  document.getElementById("stripe-error").classList.remove("hidden");
}
var removeStripeError = function() {
  document.querySelector("#stripe-error").textContent = "";
  document.getElementById("stripe-error").classList.add("hidden");
}

// Show a spinner on payment submission
var loading = function(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#payment-section #spinner").classList.remove("hidden");
    document.querySelector("#payment-section #button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#payment-section #spinner").classList.add("hidden");
    document.querySelector("#payment-section #button-text").classList.remove("hidden");
  }
};

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function(){
  // start stripe payment flow when donation form is submitted
  document.querySelector('tpy-donations #amount-form').addEventListener('submit', startPayment);
  //show testing flag if stripe is using a test key
  if (stripe._apiKey.startsWith('pk_test')) {
    document.getElementById('stripe-testkey-flag').classList.remove("hidden");
  }
});
