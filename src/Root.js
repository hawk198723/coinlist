import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import WatchList from "./components/WatchList";
import AlertManager from "./components/AlertManager";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PriceAlertProvider } from "./contexts/PriceAlertContext";

const Root = () => {
  const [watchlist, setWatchlist] = useState([]);

  const onDeleteCoin = (id) => {
    setWatchlist(watchlist.filter((coin) => coin.id !== id));
  };
  
  return (
    <ThemeProvider>
      <PriceAlertProvider>
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <App
                  watchlist={watchlist}
                  setWatchlist={setWatchlist}
                  onDeleteCoin={onDeleteCoin}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <WatchList
                  watchlist={watchlist}
                  setWatchlist={setWatchlist}
                  onDeleteCoin={onDeleteCoin}
                />
              }
            />
            <Route
              path="/alerts"
              element={<AlertManager />}
            />
          </Routes>
        </Router>
      </PriceAlertProvider>
    </ThemeProvider>
  );
};

export default Root;
