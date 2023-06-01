import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Coinbase(){
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetchCoinData();
  });

  const fetchCoinData = async () => {
    try {
      const response = await axios.get(`https://api.coinbase.com/v2/prices`);
      const coinData = response.data.data.coins.slice(0, 10).map((coin) => ({
        name: coin.name,
        currentPrice: coin.current_price,
        previousPrice: '',
      }));
      setCoins(coinData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get('https://api.coinbase.com/v2/prices');
      const updatedCoinData = coins.map((coin) => {
        const updatedCoin = response.data.data.coins.find((c) => c.name === coin.name);
        return {
          ...coin,
          previousPrice: coin.currentPrice,
          currentPrice: updatedCoin.current_price,
        };
      });
      setCoins(updatedCoinData);
    } catch (error) {
      console.error('Error updating coin data:', error);
    }
  };

  return (
    <div className="crypto-container">
      <h1 className="crypto-heading">Top 10 Cryptocurrencies</h1>
      <div className="crypto-table">
        {coins.map((coin) => (
          <div className="coin-row" key={coin.name}>
            <div className="coin-name">{coin.name}</div>
            <div className="coin-price">
              <div className="price-label">Current Price:</div>
              <div>{coin.currentPrice}</div>
            </div>
            <div className="coin-price">
              <div className="price-label">Previous Price:</div>
              <div>{coin.previousPrice}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="update-button" onClick={handleUpdate}>Update Prices</button>
    </div>
  );
}
