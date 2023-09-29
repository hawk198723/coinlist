import React from "react";

function WatchList({ watchlist, onDeleteCoin }) { // 从props中接受watchlist和onDeleteCoin
  return (
    <div>
      <h1>My Watch List</h1>
      {watchlist && watchlist.length > 0 ? (
        <ul>
          {watchlist.map((coin) => (
            <li key={coin.id}>
              {coin.name} ({coin.symbol})
              <button onClick={() => onDeleteCoin(coin.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No coins in the watch list or loading...</p>
      )}
    </div>
  );
}

export default WatchList;
