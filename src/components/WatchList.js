import React, { useEffect, useState } from "react";

function WatchList() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/watchlist");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onDeleteCoin = async (id) => {
    try {
      await fetch(`http://localhost:3000/watchlist/${id}`, {
        method: "DELETE",
      });
      setWatchlist(watchlist.filter((coin) => coin._id !== id)); 
    } catch (error) {
      console.error("Error deleting coin from watchlist", error);
    }
  };

  return (
    <div>
      <h1>My Watch List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : watchlist.length > 0 ? (
        <ul>
          {watchlist.map((coin) => (
            <li key={coin._id}>
              {coin.name}
              <button onClick={() => onDeleteCoin(coin._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No coins in your watch list yet...</p>
      )}
    </div>
  );
}

export default WatchList;
