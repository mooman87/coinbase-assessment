const axios = require('axios');

test('Coinbase API is accessible', async () => {
  const response = await axios.get('https://api.coinbase.com/');
  expect(response.status).toBe(200);
});
