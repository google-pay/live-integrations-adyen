require('dotenv').config()
const express = require('express');
const { Client, CheckoutAPI } = require('@adyen/api-library');
const uuid = require('uuid');

const adyenClient = new Client({ apiKey: process.env.ADYEN_API_KEY, environment: "TEST" });
const adyenCheckoutApi = new CheckoutAPI(adyenClient);

const app = express();
app.use(express.json())

app.post('/payments/sessions', async (req, res) => {
  console.log('/payments/sessions called');  

  adyenCheckoutApi.PaymentsApi.sessions({
    merchantAccount: 'Google338ECOM',
    amount: {
      value: 1000,
      currency: 'EUR'
    },
    returnUrl: 'https://your-company.com/checkout?shopperOrder=12xy..',
    reference: uuid.v4()
  }, {
    idempotencyKey: uuid.v4()
  })
  .then(paymentSessionResponse => {
    return res.json({
      sessionData: paymentSessionResponse.sessionData,
      id: paymentSessionResponse.id,
      clientSecret: process.env.ADYEN_CLIENT_SECRET,
      shopperLocale: 'en-US',
      environment: 'Environment.TEST'
    });
  })
  .catch(error => {
    console.log(error)
    return res.status(500).send(`Unable to call Adyen's /session API`);
  });
});

app.post('/payments/webhook', async (req, res) => {
  console.log(req.body);    
  return res.status(200).send('[accepted]');
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});