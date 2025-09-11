import React from "react";
import { toast } from "react-toastify";
import "../CSS/Styles.css";
import CoinIcon from "./CoinIcon";
import PriceAlertModal from "./PriceAlertModal";
import { usePriceAlert } from "../contexts/PriceAlertContext";

function WatchList({ watchlist, setWatchlist }) {
  const [alertModalOpen, setAlertModalOpen] = React.useState(false);
  const [selectedCoin, setSelectedCoin] = React.useState(null);
  const { getAlertsForCoin } = usePriceAlert();

  const onDeleteCoin = (id) => {
    if (window.confirm("Are you sure to delete this coin?")) {
      setWatchlist(watchlist.filter((coin) => coin.id !== id));
      showToast("Successfully deleted!");
    }
  };

  const showToast = (message) => {
    toast.success(message);
  };

  const openAlertModal = (coin) => {
    setSelectedCoin(coin);
    setAlertModalOpen(true);
  };

  const closeAlertModal = () => {
    setAlertModalOpen(false);
    setSelectedCoin(null);
  };

  return (
    <div className="App">
      <h1>My Watch List</h1>
      {watchlist.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Cryptocurrency</th>
              <th>Price</th>
              <th>Current Supply</th>
              <th>Market Cap</th>
              <th>1h Change</th>
              <th>1d Change</th>
              <th>7d Change</th>
              <th>Action</th>
              <th>Alert</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.cmc_rank}</td>
                <td>
                  <div className="coin-name-cell">
                    <CoinIcon 
                      coinId={coin.id} 
                      symbol={coin.symbol} 
                      size={28}
                      imageUrl={coin.image}
                    />
                    <div className="coin-info">
                      <div className="coin-name-text">{coin.name}</div>
                      <div className="coin-symbol">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td>${coin.quote.USD.price.toFixed(2)}</td>
                <td>{coin.circulating_supply.toLocaleString()}</td>
                <td>${coin.quote.USD.market_cap.toLocaleString()}</td>
                <td
                  className={
                    (coin.quote.USD.percent_change_1h || 0) >= 0 ? "price-positive" : "price-negative"
                  }
                >
                  {(coin.quote.USD.percent_change_1h || 0).toFixed(2)}%
                  {(coin.quote.USD.percent_change_1h || 0) >= 0 ? (
                    <i className="fas fa-arrow-up" style={{ marginLeft: "5px" }}></i>
                  ) : (
                    <i className="fas fa-arrow-down" style={{ marginLeft: "5px" }}></i>
                  )}
                </td>
                <td
                  className={
                    (coin.quote.USD.percent_change_24h || 0) >= 0 ? "price-positive" : "price-negative"
                  }
                >
                  {(coin.quote.USD.percent_change_24h || 0).toFixed(2)}%
                  {(coin.quote.USD.percent_change_24h || 0) >= 0 ? (
                    <i className="fas fa-arrow-up" style={{ marginLeft: "5px" }}></i>
                  ) : (
                    <i className="fas fa-arrow-down" style={{ marginLeft: "5px" }}></i>
                  )}
                </td>
                <td
                  className={
                    (coin.quote.USD.percent_change_7d || 0) >= 0 ? "price-positive" : "price-negative"
                  }
                >
                  {(coin.quote.USD.percent_change_7d || 0).toFixed(2)}%
                  {(coin.quote.USD.percent_change_7d || 0) >= 0 ? (
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
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                    <button
                      className="btn-alert"
                      onClick={() => openAlertModal(coin)}
                      title="Set Price Alert"
                    >
                      <i className="fas fa-bell"></i>
                      Set Alert
                    </button>
                    {getAlertsForCoin(coin.id).length > 0 && (
                      <div className="alert-indicator">
                        <i className="fas fa-bell"></i>
                        <span className="alert-count">{getAlertsForCoin(coin.id).length}</span>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No coins in your watch list yet...</p>
      )}
      
      <PriceAlertModal
        isOpen={alertModalOpen}
        onClose={closeAlertModal}
        coin={selectedCoin}
      />
    </div>
  );
}

export default WatchList;
