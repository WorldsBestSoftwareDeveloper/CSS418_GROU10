const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/payment', (req, res) => {
    const { name, cardNumber, expiryDate, cvv } = req.body;

    // Validate the payment data
    if (!name ||!cardNumber ||!expiryDate ||!cvv) {
        return res.status(400).send('Payment data is required');
    }

    // Check if the payment data is valid
    // If it is, save the payment data to the database
    // If it's not, return an error message

    // For the purpose of this example, we'll just return a success message
    res.send({ success: true, message: 'Payment successful' });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

