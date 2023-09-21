# live-integrations-adyen

Backend source for the livestream on 2023-09-20

## Running the server
1. `npm i`
2. `mv .env.example .env`
3. Add your Adyen API key and secret to the `.env` file
4. `npm start` to run the server

## Testing
Running `curl -X POST http://localhost:8080/payments/sessions` should return you an object with the `sessionData` and the `id`.
