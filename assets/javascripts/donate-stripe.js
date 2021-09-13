var stripe = Stripe("pk_test_51JT0o3IfQcuZiDTgYUM3KIDT69YA5BL6kZMNDBrwLCLuVkGhFspqbynjnRgPqJgNy7A3bPd3or0AZIy9E0VkIChK00FGZh4e83");
const paymentEndpoint = 'https://cakatr39t1.execute-api.us-east-1.amazonaws.com/Prod/';
// const paymentEndpoint = 'http://127.0.0.1:3000/';
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
  var paymentName = document.querySelector("#contact-form #payment-name").value;
  var paymentEmail = document.querySelector("#contact-form #payment-email").value;
  var purchaseObj = {
    period,
    amount,
    paymentName,
    paymentEmail
  };

  return purchaseObj;
}

const startContact = function(evt) {
  if (evt) {
    evt.preventDefault();
  }
  // hide payment form if we went back to contact
  document.getElementById("payment-form").classList.add("hidden");
  // show the payment form
  document.getElementById("contact-form").classList.remove("hidden");
  document.getElementById("payment-name").focus();
}

const startPayment = function(evt) {
  if (evt) {
    evt.preventDefault();
  }
  try {
    // hide contact form
    document.getElementById("contact-form").classList.add("hidden");

    // show the payment form
    document.getElementById("payment-form").classList.remove("hidden");
    document.getElementById("card-element").focus();

    // create purchase object from form values
    let purchaseObj = getPurchaseObject();

    //set the payment button text with the amount selected
    console.log(purchaseObj);
    setPayButtonText("Pay US " + formatCurrency(purchaseObj.amount) + " now");

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
      var elements = stripe.elements();

      var style = {
        base: {
          color: "#32325d",
          fontFamily: 'Arial, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d"
          }
        },
        invalid: {
          fontFamily: 'Arial, sans-serif',
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      };

      var card = elements.create("card", { style: style });
      // Stripe injects an iframe into the DOM
      card.mount("#card-element");

      card.on("change", function (event) {
        // Disable the Pay button if there are no card details in the Element
        document.querySelector("button").disabled = event.empty;
        document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
      });

      var form = document.getElementById("payment-form");
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        // Complete payment when the submit button is clicked
        var paymentName = document.querySelector("#contact-form #payment-name").value;
        var paymentEmail = document.querySelector("#contact-form #payment-email").value;

        payWithCard(stripe, card, data.clientSecret, paymentName, paymentEmail);
      });

      loading(false);
    }).catch(function(err){
      //show error for promise rejection
      showStripeError("There was an error processing your payment. Please try again in a few minutes.");
      loading(false);
    });
  } catch(err) {
    //show error for unhandled exception
    showStripeError("There was an error processing your payment. Please try again in a few minutes.");
    loading(false);
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
  document.querySelector("button").disabled = true;
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
  startContact();
  document.querySelector("#stripe-error p").textContent = message;
  document.getElementById("stripe-error").classList.remove("hidden");
}
var removeStripeError = function() {
  document.querySelector("#stripe-error p").textContent = "";
  document.getElementById("stripe-error").classList.add("hidden");
}

// Show a spinner on payment submission
var loading = function(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#payment-section button").disabled = true;
    document.querySelector("#payment-section #spinner").classList.remove("hidden");
    document.querySelector("#payment-section #button-text").classList.add("hidden");
  } else {
    document.querySelector("#payment-section button").disabled = false;
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
  document.querySelector('tpy-donations #amount-form').addEventListener('submit', startContact);
  document.querySelector('#contact-form').addEventListener('submit', startPayment);
  //show testing flag if stripe is using a test key
  if (stripe._apiKey.startsWith('pk_test')) {
    document.getElementById('stripe-testkey-flag').classList.remove("hidden");
  }
});
