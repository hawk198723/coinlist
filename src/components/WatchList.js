import { toast } from "react-toastify";
import "../CSS/Styles.css";

function WatchList({ watchlist, setWatchlist }) {
  const onDeleteCoin = (id) => {
    if (window.confirm("Are you sure to delete this coin?")) {
      setWatchlist(watchlist.filter((coin) => coin.id !== id));
      showToast("Successfully deleted!");
    }
  };

  const showToast = (message) => {
    toast.success(message);
  };

  return (
    <div className="App">
      <h1>My Watch List</h1>
      {watchlist.length > 0 ? (
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
            {watchlist.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.cmc_rank}</td>
                <td>{coin.symbol}</td>
                <td>{coin.name}</td>
                <td>${coin.quote.USD.price.toFixed(2)}</td>
                <td>{coin.circulating_supply.toLocaleString()}</td>
                <td>${coin.quote.USD.market_cap.toLocaleString()}</td>
                <td
                  className={
                    coin.quote.USD.percent_change_1h >= 0 ? "price-positive" : "price-negative"
                  }
                >
                  {coin.quote.USD.percent_change_1h.toFixed(2)}%
                  {coin.quote.USD.percent_change_1h >= 0 ? (
                    <i className="fas fa-arrow-up" style={{ marginLeft: "5px" }}></i>
                  ) : (
                    <i className="fas fa-arrow-down" style={{ marginLeft: "5px" }}></i>
                  )}
                </td>
                <td
                  className={
                    coin.quote.USD.percent_change_24h >= 0 ? "price-positive" : "price-negative"
                  }
                >
                  {coin.quote.USD.percent_change_24h.toFixed(2)}%
                  {coin.quote.USD.percent_change_24h >= 0 ? (
                    <i className="fas fa-arrow-up" style={{ marginLeft: "5px" }}></i>
                  ) : (
                    <i className="fas fa-arrow-down" style={{ marginLeft: "5px" }}></i>
                  )}
                </td>
                <td
                  className={
                    coin.quote.USD.percent_change_30d >= 0 ? "price-positive" : "price-negative"
                  }
                >
                  {coin.quote.USD.percent_change_30d.toFixed(2)}%
                  {coin.quote.USD.percent_change_30d >= 0 ? (
                    <i className="fas fa-arrow-up" style={{ marginLeft: "5px" }}></i>
                  ) : (
                    <i className="fas fa-arrow-down" style={{ marginLeft: "5px" }}></i>
                  )}
                </td>
                <td
                  className={
                    coin.quote.USD.percent_change_90d >= 0 ? "price-positive" : "price-negative"
                  }
                >
                  {coin.quote.USD.percent_change_90d.toFixed(2)}%
                  {coin.quote.USD.percent_change_90d >= 0 ? (
                    <i className="fas fa-arrow-up" style={{ marginLeft: "5px" }}></i>
                  ) : (
                    <i className="fas fa-arrow-down" style={{ marginLeft: "5px" }}></i>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      onDeleteCoin(coin.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No coins in your watch list yet...</p>
      )}
    </div>
  );
}

export default WatchList;
