import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import Coin from "./components/Coin";
import { api } from "./api/api";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(api)
      .then((response) => {
        setCoins(response.data);
        console.log(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>

      <div className="coin-heading">
        <p className="coin-name">COIN</p>
        <p>PRICE</p>
        <p>VOLUME</p>
        <p className="hide-mobile">24H CHANGE</p>
        <p className="hide-mobile">Mkt Cap</p>
      </div>

      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            price={coin.current_price}
            volume={coin.total_volume}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
