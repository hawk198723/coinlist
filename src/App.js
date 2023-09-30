import React, { useState, useEffect } from "react";
// import sunburstService from "./services/API";
import CMCAPI from "./services/CMCAPI";
import Watchlist from "./components/WatchList";

const App = ({ watchlist, setWatchlist }) => {
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await CMCAPI.getCoinData();
        if (data && data.data) {
          console.log(data);
          setCoinData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch coin data:", error);
      }
    };

    fetchData();
  }, []);

  // const addToWatchlist = (coin) => {
  //   if (!watchlist.some((item) => item.id === coin.id)) {
  //     setWatchlist([...watchlist, coin]);
  //   }
  // };

  // const onDeleteCoin = (id) => {
  //   setWatchlist(watchlist.filter((coin) => coin.id !== id));
  // };
  const addToWatchlist = async (coin) => {
    if (!watchlist.some((item) => item.id === coin.id)) {
      try {
        await fetch("http://localhost:3000/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(coin),
        });

        setWatchlist([...watchlist, coin]);
      } catch (error) {
        console.error("Error adding coin to watchlist", error);
      }
    }
  };

  // const onDeleteCoin = async (id) => {
  //   try {
  //     await fetch(`http://localhost:3000/watchlist/${id}`, {
  //       method: "DELETE",
  //     });

  //     setWatchlist(watchlist.filter((coin) => coin.id !== id));
  //   } catch (error) {
  //     console.error("Error deleting coin from watchlist", error);
  //   }
  // };

  return (
    <div className="App">
      {coinData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        coinData.map((coin) => (
          <div key={coin.id}>
            <h2>
              {coin.cmc_rank}: {coin.name} ({coin.symbol})
            </h2>
            <p> Price:${coin.quote.USD.price}</p>
            <p> Current Supply:{coin.circulating_supply}</p>
            <p> Matket Cap:${coin.quote.USD.market_cap}</p>
            <p>1h change:{coin.quote.USD.percent_change_1h}%</p>
            <p>1day change:{coin.quote.USD.percent_change_24h}%</p>
            <p>30day change:{coin.quote.USD.percent_change_30d}%</p>
            <p>90day change:{coin.quote.USD.percent_change_90d}%</p>
            <button onClick={() => addToWatchlist(coin)}>
              Add to Watchlist
            </button>
          </div>
        ))
      )}
    </div>
  );
};
export default App;
