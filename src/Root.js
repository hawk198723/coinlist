import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import WatchList from "./components/WatchList";
import Header from "./components/Header";

const Root = () => {
  const [watchlist, setWatchlist] = useState([]);

  const onDeleteCoin = (id) => {
    setWatchlist(watchlist.filter((coin) => coin.id !== id));
  };
  return (
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
      </Routes>
    </Router>
  );
};

export default Root;
