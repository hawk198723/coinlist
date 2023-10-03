import React, { useState, useEffect } from "react";
import CMCAPI from "./services/CMCAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const addToWatchlist = (coin) => {
    if (!watchlist.some((item) => item.id === coin.id)) {
      setWatchlist([...watchlist, coin]);
    }
  };

  // const onDeleteCoin = (id) => {
  //   setWatchlist(watchlist.filter((coin) => coin.id !== id));
  // };
  const showToast = () => {
    toast.success("Successfully added!");
  };

  // const addToWatchlist = async (coin) => {
  //   if (!watchlist.some((item) => item.id === coin.id)) {
  //     try {
  //       await fetch("http://localhost:3000/watchlist", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(coin),
  //       });

  //       setWatchlist([...watchlist, coin]);
  //     } catch (error) {
  //       console.error("Error adding coin to watchlist", error);
  //     }
  //   }
  // };

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
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Current Supply</th>
              <th>Market Cap</th>
              <th>1h Change</th>
              <th>1d Change</th>
              <th>30d Change</th>
              <th>90d Change</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coinData.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.cmc_rank}</td>
                <td>{coin.symbol}</td>
                <td>{coin.name}</td>
                <td>${coin.quote.USD.price.toFixed(2)}</td>
                <td>{coin.circulating_supply.toLocaleString()}</td>
                <td>${coin.quote.USD.market_cap.toLocaleString()}</td>
                <td
                  style={{
                    color:
                      coin.quote.USD.percent_change_1h >= 0 ? "green" : "red",
                  }}
                >
                  {coin.quote.USD.percent_change_1h.toFixed(2)}%
                  {coin.quote.USD.percent_change_1h >= 0 ? (
                    <i className="fas fa-arrow-up"></i>
                  ) : (
                    <i className="fas fa-arrow-down"></i>
                  )}
                </td>
                <td
                  style={{
                    color:
                      coin.quote.USD.percent_change_24h >= 0 ? "green" : "red",
                  }}
                >
                  {coin.quote.USD.percent_change_24h.toFixed(2)}%
                  {coin.quote.USD.percent_change_24h >= 0 ? (
                    <i className="fas fa-arrow-up"></i>
                  ) : (
                    <i className="fas fa-arrow-down"></i>
                  )}
                </td>
                <td
                  style={{
                    color:
                      coin.quote.USD.percent_change_30d >= 0 ? "green" : "red",
                  }}
                >
                  {coin.quote.USD.percent_change_30d.toFixed(2)}%
                  {coin.quote.USD.percent_change_30d >= 0 ? (
                    <i className="fas fa-arrow-up"></i>
                  ) : (
                    <i className="fas fa-arrow-down"></i>
                  )}
                </td>
                <td
                  style={{
                    color:
                      coin.quote.USD.percent_change_90d >= 0 ? "green" : "red",
                  }}
                >
                  {coin.quote.USD.percent_change_90d.toFixed(2)}%
                  {coin.quote.USD.percent_change_90d >= 0 ? (
                    <i className="fas fa-arrow-up"></i>
                  ) : (
                    <i className="fas fa-arrow-down"></i>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      showToast();
                      addToWatchlist(coin);
                    }}
                  >
                    Add to Watchlist
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default App;
