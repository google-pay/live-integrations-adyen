const express = require('express');

const app = express();
app.use(express.json())

app.post('/payments/sessions', (req, res) => {
  console.log('/payments/sessions called');
  // process.env.ADYEN_API_KEY
  return res.json({    
    hello: 'adyen'    
  });
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});