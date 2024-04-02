const radioButtons = document.querySelectorAll('input[type="radio"]');

const paymentButton = document.querySelector('.payment-button');

const totalDueElement = document.querySelector('total-amount');



// Add event listener to radio buttons

radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('click', function() {
        // Show payment button when a radio button is clicked
        paymentButton.style.display = 'block';

    });
});



document.addEventListener("DOMContentLoaded", function() {
const radioButton1= document.getElementById('styled-checkbox1');
const radioButton2 = document.getElementById('styled-checkbox2');
const radioButton3 = document.getElementById('styled-checkbox3');

radioButton1.addEventListener('change', function() {
    if (this.checked) {
        paymentButton.textContent= 'Pay on Delivery';
        paymentButton.setAttribute("onclick", "window.location.href='Cash Payment/order-book.html';");
    }
  });

  radioButton2.addEventListener('change', function() {
    if (this.checked) {
        paymentButton.textContent= 'Proceed to Interswitch';
        paymentButton.setAttribute("onclick", "window.location.href='Card Pay/card.html';");
    }
  });

  radioButton3.addEventListener('change', function() {
    if (this.checked) {
        paymentButton.textContent= 'Pay with Bank Transfer';
        paymentButton.setAttribute("onclick", "window.location.href='Bank Transfer/Transfer.html';");
    }
  })
});



const checkboxContainers = document.querySelectorAll('.checkbox-container');
checkboxContainers.forEach(function(container) {
    const checkbox = container.querySelector('input[type="radio"]');
    checkbox.addEventListener('change', function() {
        // Remove red border from all checkboxes
        checkboxContainers.forEach(function(container) {
            container.style.borderColor = 'transparent';

        });

        // Add red border to the clicked checkbox container
        if (checkbox.checked) {
            container.style.borderColor = 'red';
        }
    });
});


if (checkbox.checked) {
    container.style.borderColor = 'red';
    totalDue.style.display = 'block';
}

//MAKING CLIPBOARD FUNCTIONAL
function copyTextToClipboard() {
  const textToCopy = document.getElementById("accountNumber").textContent;
  navigator.clipboard.writeText(textToCopy)
      .then(() => {
          document.getElementById("copyNotification").style.display = "block"; // Show notification
          setTimeout(() => {
              document.getElementById("copyNotification").style.display = "none"; // Hide notification after 2 seconds
          }, 1000);
      })
      .catch(error => console.error('Unable to copy account number: ', error));
}


function copyClipboard(){
    const textCopied = document.getElementById("amunt").textContent;
    navigator.clipboard.writeText(textCopied)
        .then(() => {
            document.getElementById("notificationCopy").style.display = "block"; // Show notification
            setTimeout(() => {
                document.getElementById("notificationCopy").style.display = "none"; // Hide notification after 2 seconds
            }, 1000);
        })
        .catch(error => console.error('Unable to copy account amount: ', error));
  }


  //PAYMENT DETAILS FETCH
  document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect payment details from the form
    const amount = document.getElementById('amount').value;
    const senderName = document.getElementById('senderName').value;
    const senderAccountNumber = document.getElementById('senderAccountNumber').value;
    const transactionReference = document.getElementById('transactionReference').value;

    // Send payment details to backend for verification
    fetch('/verify-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, senderName, senderAccountNumber, transactionReference })
    })
    .then(response => {
        if (response.ok) {
            // Payment verified
            alert('Payment confirmed!');
        } else {
            // Payment verification failed
            alert('Payment verification failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error verifying payment:', error);
        alert('An error occurred while verifying payment. Please try again later.');
    });
});



//ORDER SUMMARY

document.addEventListener('DOMContentLoaded', function() {
  const orderItems = document.querySelectorAll('.orderItem');
  const totalAmountElement = document.getElementById('totalAmount');
  const taxesElement = document.getElementById('taxes');
  const deliveryFeeElement = document.getElementById('deliveryFee');
  const totalDueElement = document.getElementById('totalDue');

  

  // Function to calculate order summary
  function calculateOrderSummary() {
      let totalAmount = 0;

      orderItems.forEach(item => {
          if (item.checked) {
              totalAmount += parseFloat(item.dataset.price);
          }
      });

      const taxes = totalAmount * 0.1; // Assuming taxes are 10%
      const deliveryFee = 5; // Assuming delivery fee is #5

      const totalDue = totalAmount + taxes + deliveryFee;

      totalAmountElement.textContent = totalAmount.toFixed(2);
      taxesElement.textContent = taxes.toFixed(2);
      deliveryFeeElement.textContent = deliveryFee.toFixed(2);
      totalDueElement.textContent = totalDue.toFixed(2);
  }

  

  // Calculate order summary initially
  calculateOrderSummary();

  // Add event listener to order items to recalculate summary on change
  orderItems.forEach(item => {
      item.addEventListener('change', calculateOrderSummary);
  });
});


// Payment countdown timer
const countdownElement = document.getElementById('countdown');

function startCountdown() {
    let timeLeft = 30; // 30 seconds countdown

    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        countdownElement.textContent = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            // Timer has expired, you can add your logic here
            countdownElement.textContent = '00:00'; // Optionally, update the display to show 00:00
            // Redirect or perform other actions here
            return;
        }

        timeLeft--;
    }

    updateCountdown(); // Initial call to display countdown immediately

    const countdownInterval = setTimeout(updateCountdown, 1000);
}

// Start the countdown when the page loads
document.addEventListener('DOMContentLoaded', startCountdown);




