import React, { useState, useEffect, useCallback } from "react";
import CMCAPI from "./services/CMCAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./components/Pagination";
import CoinIcon from "./components/CoinIcon";
import PriceAlertModal from "./components/PriceAlertModal";
import { usePriceAlert } from "./contexts/PriceAlertContext";

const App = ({ watchlist, setWatchlist }) => {
  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [totalItems, setTotalItems] = useState(0);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const { checkPriceAlerts, getAlertsForCoin } = usePriceAlert();

  // CoinMarketCap has around 10,000+ cryptocurrencies
  const maxItems = 10000;
  const totalPages = Math.ceil(maxItems / itemsPerPage);

  const fetchData = useCallback(async (page = 1, limit = 100) => {
    setIsLoading(true);
    try {
      const start = (page - 1) * limit + 1;
      const data = await CMCAPI.getCoinData(start, limit);
      if (data && data.data) {
        console.log(data);
        setCoinData(data.data);
        // Use status info from API if available, otherwise estimate
        setTotalItems(data.status?.total_count || maxItems);
        
        // 检查价格报警
        checkPriceAlerts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch coin data:", error);
      toast.error("Failed to load cryptocurrency data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [checkPriceAlerts]);

  useEffect(() => {
    fetchData(currentPage, itemsPerPage);
  }, [fetchData, currentPage, itemsPerPage, checkPriceAlerts]);

  const addToWatchlist = (coin) => {
    if (!watchlist.some((item) => item.id === coin.id)) {
      setWatchlist([...watchlist, coin]);
    }
  };

  const showToast = () => {
    toast.success("Successfully added!");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const openAlertModal = (coin) => {
    setSelectedCoin(coin);
    setAlertModalOpen(true);
  };

  const closeAlertModal = () => {
    setAlertModalOpen(false);
    setSelectedCoin(null);
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
      {isLoading && coinData.length === 0 ? (
        <div className="loading">
          <i className="fas fa-spinner fa-spin" style={{ marginRight: "10px" }}></i>
          Loading cryptocurrency data...
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <h1>
              <i className="fas fa-chart-line" style={{ marginRight: "10px" }}></i>
              Cryptocurrency Market
            </h1>
            <p style={{ color: "var(--text-secondary)", marginTop: "5px" }}>
              Real-time cryptocurrency prices and market data
            </p>
          </div>
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
            {isLoading && (
              <tr>
                <td colSpan="10" style={{ textAlign: "center", padding: "40px" }}>
                  <i className="fas fa-spinner fa-spin" style={{ marginRight: "10px" }}></i>
                  Loading...
                </td>
              </tr>
            )}
            {!isLoading && coinData.map((coin) => (
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
                <td>${coin.quote.USD.price?.toFixed(2) || 'N/A'}</td>
                <td>{coin.circulating_supply ? coin.circulating_supply.toLocaleString() : 'N/A'}</td>
                <td>{coin.quote.USD.market_cap ? `$${coin.quote.USD.market_cap.toLocaleString()}` : 'N/A'}</td>
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
                      showToast();
                      addToWatchlist(coin);
                    }}
                  >
                    Add to Watchlist
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={totalItems}
          isLoading={isLoading}
        />
        </>
      )}
      
      <PriceAlertModal
        isOpen={alertModalOpen}
        onClose={closeAlertModal}
        coin={selectedCoin}
      />
    </div>
  );
};
export default App;
