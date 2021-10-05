var stripe = Stripe(
  "pk_test_51Jgsq8EFMp2tqEnwSI5Lzr1Fs91Hf6D3iFGZnU9iSHCUJ2NkHZTWPOiQ1yQNG3J50Vk7ZoJJyBmD4tWbp1AEyPVo00aNz8pesC"
);

const purchaseButton = document.querySelector(".comprarButton");
purchaseButton.addEventListener("click", initPayment);

function initPayment() {
  const shoppingCart = localStorage.getItem("shoppingCart");
  fetch(`${serverUrl}create-payment-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: shoppingCart,
  })
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      var elements = stripe.elements();
      var style = {
        base: {
          color: "#32325d",
          fontFamily: "Arial, sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d",
          },
        },
        invalid: {
          fontFamily: "Arial, sans-serif",
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      };
      var card = elements.create("card", { style: style });
      // Stripe injects an iframe into the DOM
      card.mount("#card-element");
      //? SUBMIT BUTTON
      const submitButton = document.querySelector("#submit");
      submitButton.disabled = true;

      card.on("change", function (event) {
        // Disable the Pay button if there are no card details in the Element
        let errorMessage = document.querySelector("#card-error").textContent;
        if (event.error) {
          errorMessage = event.error.message;
          submitButton.disabled = true;
        } else {
          errorMessage = "";
          submitButton.disabled = false;
        }
      });
      submitButton.addEventListener("click", function () {
        payWithCard(stripe, card, data.clientSecret);
      });
    });
}

// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function (stripe, card, clientSecret) {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    })
    .then(function (result) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        // The payment succeeded!
        orderComplete(result.paymentIntent.id);
      }
    });
};

/* ------- UI helpers ------- */
// Shows a success message when the payment is complete
var orderComplete = function () {
  loading(false);

  document.querySelector(".result-message").classList.remove("hidden");
  document.querySelector("#submit").disabled = true;
  document.getElementById("comprarModalLabel").innerText =
    "Gracias por su compra";
};
// Show the customer the error from Stripe if their card fails to charge
var showError = function (errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function () {
    errorMsg.textContent = "";
  }, 4000);
};
// Show a spinner on payment submission
var loading = function (isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};