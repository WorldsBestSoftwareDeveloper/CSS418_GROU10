const form = document.getElementById('payment-form');
const nameInput = document.getElementById('name');
const cardNumberInput = document.getElementById('cardNumber');
const expiryDateInput = document.getElementById('expiryDate');
const cvvInput = document.getElementById('cvv');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const cardNumber = cardNumberInput.value;
    const expiryDate = expiryDateInput.value;
    const cvv = cvvInput.value;

    if (!name ||!cardNumber ||!expiryDate ||!cvv) {
        errorMsg.textContent = 'Please enter valid card details';
        return;
    }

    // Send the payment data to the server
    fetch('/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, cardNumber, expiryDate, cvv })
    })
   .then(res => res.json())
   .then(data => {
        if (data.success) {
            // Redirect to the success page
            window.location = 'course-reg.html';
        } else {
            // Display the error message
            errorMsg.textContent = data.message;
        }
    })
   .catch(err => {
        console.error(err);
        window.location= 'course-reg.html'
        errorMsg.textContent = 'An error occurred while processing the payment';
    });
});