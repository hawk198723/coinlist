import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import WatchList from "./components/WatchList";
import AlertManager from "./components/AlertManager";
import Login from "./components/Login";
import Register from "./components/Register";
import FirebaseSetup from "./components/FirebaseSetup";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PriceAlertProvider } from "./contexts/PriceAlertContext";
import { AuthProvider } from "./contexts/AuthContext";

const Root = () => {
  const [watchlist, setWatchlist] = useState([]);

  const onDeleteCoin = (id) => {
    setWatchlist(watchlist.filter((coin) => coin.id !== id));
  };
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <PriceAlertProvider>
          <Router basename="/coinlist">
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
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />
              <Route
                path="/firebase-setup"
                element={<FirebaseSetup />}
              />
            </Routes>
          </Router>
        </PriceAlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Root;
