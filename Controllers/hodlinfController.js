const axios = require('axios');
const CryptoPrice = require('../Model/hodlinfoModel');

const fetchAndStoreCryptoData = async () => {
  console.log('Fetching data from WazirX API...');
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const cryptoData = response.data;

    if (typeof cryptoData === 'object') {
      const cryptoPairs = Object.entries(cryptoData);
      cryptoPairs.sort((a, b) => b[1].volume - a[1].volume);

      const top10CryptoPairs = cryptoPairs.slice(0, 10);

      await Promise.all(
        top10CryptoPairs.map(async ([pair, item]) => {
          if (
            item &&
            typeof item.last === 'string' &&
            typeof item.buy === 'string' &&
            typeof item.sell === 'string' &&
            typeof item.volume === 'string' &&
            typeof item.base_unit === 'string'
          ) {
            await CryptoPrice.findOrCreate({
              where: { symbol: pair },
              defaults: {
                last: parseFloat(item.last),
                buy: parseFloat(item.buy),
                sell: parseFloat(item.sell),
                volume: parseFloat(item.volume),
                base_unit: item.base_unit,
              },
            });
          } else {
            console.error(`Skipping pair '${pair}' due to missing or invalid data.`);
          }
        })
      );

      console.log('Top 10 data fetched and stored successfully.');
    } else {
      console.error('API response is not in the expected format.');
    }
  } catch (error) {
    console.error('Error fetching and storing data:', error);
    throw error;
  }
};


const fetchAndSendCryptoData = async (req, res) => {
  try {
    const cryptoPrices = await CryptoPrice.findAll();
    res.json(cryptoPrices); 
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

fetchAndStoreCryptoData();

module.exports = {
  fetchAndStoreCryptoData,
  fetchAndSendCryptoData
};
