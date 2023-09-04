const express = require('express');

const app = express();
app.use(express.json())

app.post('/payments/sessions', (req, res) => {
  res.send({
    test_key: process.env.ADYEN_API_KEY
  });
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});